import yfinance as yf
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from flask import Flask

app = Flask(__name__)


@app.route("/load_models", methods=['GET'])
def load_models():
    return "<p>Hello, World!</p>"


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
