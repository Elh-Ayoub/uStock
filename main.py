import yfinance as yf
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from flask import Flask, request
from Predictor import Predictor

app = Flask(__name__)
pred = Predictor()


@app.route("/models/load", methods=['POST'])
def load_models():
    timeframe = request.get_json(force=True)["timeframe"]
    res = pred.load(timeframe=timeframe)
    return res


@app.route("/models/recreate", methods=['POST'])
def recreate():
    timeframe = request.get_json(force=True)["timeframe"]
    res = pred.create_models(timeframe=timeframe)
    return res


@app.route("/predict/next_close", methods=['GET'])
def next_close():
    timeframe = request.get_json(force=True)["timeframe"]
    res = pred.next_close(timeframe)
    return res

@app.route("/predict/costume", methods=['GET'])
def predict():
    timeframe = request.get_json(force=True)["timeframe"]
    data = request.get_json(force=True)["data"]
    res = pred.predict(timeframe=timeframe, data=data)
    return res
# gold = yf.Ticker("AAPL")
# data = gold.history(period="max", interval="1mo")
# data.drop(["Dividends", "Stock Splits"], axis=1, inplace=True)
# data.drop(data.tail(1).index, inplace=True)
#
# # data.to_csv("C:\\Users\\Lenovo\\Desktop\\aapl.csv")
# X = data.drop("Close", axis=1)
# Y = data["Close"]
# # df2 = pd.DataFrame(data=[[144.345001, 147.289993, 144.100006, 18616112]], columns=['Open', 'High', 'Low', 'Volume'])
# print(data)
#
# # print(df2)
#
# # rf = RandomForestRegressor(random_state=42)

# run app
app.run(host='127.0.0.1', port=5000)
