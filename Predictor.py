import yfinance as yf
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
import joblib
import os
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.linear_model import LinearRegression
from flask import jsonify


class Predictor:

    def __init__(self):
        self.rf = RandomForestRegressor(random_state=42)
        self.lr = LinearRegression()
        self.gb = GradientBoostingRegressor(random_state=42)

    def load(self, timeframe):
        rf_model = "Models/RF." + timeframe + ".pkl"
        lr_model = "Models/LR." + timeframe + ".pkl"
        gb_model = "Models/GB." + timeframe + ".pkl"
        rf_exists = os.path.exists(rf_model)
        lr_exists = os.path.exists(lr_model)
        gb_exists = os.path.exists(gb_model)

        if not rf_exists or not lr_exists or not gb_exists:
            self.create_models(timeframe=timeframe)
        else:
            self.rf = joblib.load(rf_model)
            self.lr = joblib.load(lr_model)
            self.gb = joblib.load(gb_model)
        response = {"status": "success", "message": "Models loaded successfully with timeframe of {}".format(timeframe)}
        return jsonify(response), 200

    def create_models(self, timeframe):
        x_train, x_test, y_train, y_test = self.get_data(timeframe)
        rf = RandomForestRegressor(random_state=42)
        lr = LinearRegression()
        gb = GradientBoostingRegressor(random_state=42)

        gb.fit(x_train, y_train)
        lr.fit(x_train, y_train)
        rf.fit(x_train, y_train)

        rf_pred = rf.predict(x_test)
        lr_pred = lr.predict(x_test)
        gb_pred = gb.predict(x_test)

        # Save MSE, RMSE and R2_score in some file (json) / if exist load and edit
        self.save_loss(timeframe=timeframe, model="RF", pred=rf_pred, y_test=y_test)
        self.save_loss(timeframe=timeframe, model="LR", pred=lr_pred, y_test=y_test)
        self.save_loss(timeframe=timeframe, model="GB", pred=gb_pred, y_test=y_test)

        if not os.path.exists("./Models"):
            os.makedirs("./Models")
        joblib.dump(rf, "Models/RF." + timeframe + ".pkl")
        joblib.dump(lr, "Models/LR." + timeframe + ".pkl")
        joblib.dump(gb, "Models/GB." + timeframe + ".pkl")
        self.rf = rf
        self.lr = lr
        self.gb = gb
        response = {"status": "success",
                    "message": "Models created successfully with timeframe of {}".format(timeframe)}
        return jsonify(response), 200

    def get_data(self, timeframe):
        apple = yf.Ticker("AAPL")
        period = "max"
        if timeframe == "1D":
            period = "5y"
        data = apple.history(period=period, interval=timeframe)
        try:
            data.drop(["Dividends", "Stock Splits"], axis=1, inplace=True)
        except:
            data.dropna(axis=1, inplace=True)
        data.drop(data.tail(1).index, inplace=True)
        data.dropna(axis=0, inplace=True)
        x = data.drop("Close", axis=1)
        y = data["Close"]

        test_size = 0.2
        if timeframe == "1wk":
            test_size = 0.3
        elif timeframe == "1mo":
            test_size = 0.4

        x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=test_size, random_state=42)
        return x_train, x_test, y_train, y_test

    def next_close(self, timeframe):
        # Get last row in data
        apple = yf.Ticker("AAPL")
        df = apple.history(period="1y", interval=timeframe)
        try:
            df.drop(["Dividends", "Stock Splits"], axis=1, inplace=True)
        except:
            df.dropna(axis=1, inplace=True)
        current = df.tail(1)
        current.drop("Close", axis=1, inplace=True)

        self.load(timeframe)
        rf_pred = self.rf.predict(current)
        lr_pred = self.lr.predict(current)
        gb_pred = self.gb.predict(current)
        mean = np.mean([rf_pred, lr_pred, gb_pred])
        response = {
                    "status": "success",
                    "message": {"rf": rf_pred[0], "lr": lr_pred[0], "gb": gb_pred[0], "mean": mean},
                    "timeframe": timeframe,
                    }
        return jsonify(response), 200

    def predict(self, timeframe, data):
        self.load(timeframe)
        _open = float(data['open'])
        high = float(data['high'])
        low = float(data['low'])
        volume = float(data['volume'])
        df = pd.DataFrame(data=[[_open, high, low, volume]], columns=['Open', 'High', 'Low', 'Volume'])

        rf_pred = self.rf.predict(df)
        lr_pred = self.lr.predict(df)
        gb_pred = self.gb.predict(df)
        mean = np.mean([rf_pred, lr_pred, gb_pred])
        response = {
            "status": "success",
            "message": {"rf": rf_pred[0], "lr": lr_pred[0], "gb": gb_pred[0], "mean": mean},
            "timeframe": timeframe,
        }
        return jsonify(response), 200

    def save_loss(self, timeframe, model, pred, y_test):
        mse = mean_squared_error(y_test, pred)
        rmse = np.sqrt(mse)
        r2_scors = r2_score(y_test, pred)
        data = [mse, rmse, r2_scors]
        if not os.path.exists("./Loss"):
            os.makedirs("./Loss")
        filename = "./Loss/{}_loss.json".format(model)
        if not os.path.exists(filename):
            df = pd.DataFrame(columns=['MSE', 'RMSE', 'R2_score'], index=['1D', '1wk', '1mo'])
        else:
            df = pd.read_json(filename)
        df.loc[timeframe] = data
        df.to_json(filename)

