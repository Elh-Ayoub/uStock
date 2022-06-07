import yfinance as yf
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
import joblib
from os.path import exists
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.linear_model import LinearRegression


class Predictor:

    def __init__(self):
        self.rf = None
        self.lr = None
        self.gb = None

    def load(self, timeframe):
        rf_model = "Models/RF." + timeframe + ".pkl"
        lr_model = "Models/LR." + timeframe + ".pkl"
        gb_model = "Models/GB." + timeframe + ".pkl"
        rf_exists = exists(rf_model)
        lr_exists = exists(lr_model)
        gb_exists = exists(gb_model)

        if not rf_exists or not lr_exists or not gb_exists:
            self.create_models(timeframe=timeframe)
        else:
            self.rf = joblib.load(rf_model)
            self.lr = joblib.load(lr_model)
            self.gb = joblib.load(gb_model)

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

        # Save MSE, RMSE and R2_score in some file

        joblib.dump(rf, "Models/RF." + timeframe + ".pkl")
        joblib.dump(lr, "Models/LR." + timeframe + ".pkl")
        joblib.dump(gb, "Models/GB." + timeframe + ".pkl")
        self.rf = rf
        self.lr = lr
        self.gb = gb

    def get_data(self, timeframe):
        apple = yf.Ticker("AAPL")
        period = "max"
        if timeframe == "1D":
            period = "5y"
        data = apple.history(period=period, interval=timeframe)
        data.drop(["Dividends", "Stock Splits"], axis=1, inplace=True)
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

