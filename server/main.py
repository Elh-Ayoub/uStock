import yfinance as yf
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from flask import Flask, request, jsonify
from Predictor import Predictor
from flask_socketio import SocketIO, send, emit

app = Flask(__name__)
pred = Predictor()
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins='*', engineio_logger=True)


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
    return jsonify(res), 200


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
@socketio.on('connect')
def test_connect():
    print('CONNECT EVENT happened...')
    # send('Connected successfully!', broadcast=True)
    emit('success', {'data': 'Connected'})

@socketio.on('message')
def handel_message(msg):
    print("Message: {}".format(msg))
    emit('message', {'data': msg}, broadcast=True)


@socketio.on('day_data')
def handel_day_data():
    res = pred.next_close("1D")
    emit("day_data", {'data': res}, broadcast=True)


@socketio.on('hour_data')
def handel_day_data():
    res = pred.next_close("1h")
    emit("hour_data", res, broadcast=True)


@socketio.on('month_data')
def handel_day_data():
    res = pred.next_close("1mo")
    emit("month_data", res, broadcast=True)


# run app
# app.run(host='127.0.0.1', port=5000)
if __name__ == '__main__':
    socketio.run(app)
