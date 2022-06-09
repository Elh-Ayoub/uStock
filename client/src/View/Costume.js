import React, { useEffect, useState } from "react"
import io from "socket.io-client";

const endPoint = "http://localhost:5000";
const socket = io.connect(`${endPoint}`);

function Costume(){
    let content = null
    const [open, setOpen] = useState(null)
    const [high, setHigh] = useState(null)
    const [low, setLow] = useState(null)
    const [volume, setVolume] = useState(null)
    const [timeframe, setTimeframe] = useState(null)
    const [prediction, setPrediction] = useState(null)

    useEffect(() => {
        socket.on("success", (data) => {
            console.log(data.data)
        });
        socket.on("costume_prediction", (data) => {
            setPrediction(data);
        });
    }, [null])

    const predict = (e) => {
        e.preventDefault()
        if(!open || !high || !low || !volume || !timeframe){
            alert("All fields are required!")
        }else{
            let data = {timeframe: timeframe, data: {open: open, high: high, low: low, volume: volume}}
            socket.emit('costume_prediction', data);
        }
    }
    
    let p = null
    if(prediction){
        if (prediction.status == "success") {
            let msg = prediction.message
            p = <div className="row d-flex justify-content-around flex-wrap mt-3">
                <p>Prediction:</p>
                <div className="model col-md-3 col-sm-6">
                    <div className="model-body">
                        <p className="model-title">RF</p>
                            <span>{msg.rf.toFixed(4)}</span>  
                    </div>                    
                </div>
                <div className="model col-md-3  col-sm-6">
                    <div className="model-body">
                        <p className="model-title">LR</p>
                        <span>{msg.lr.toFixed(4)}</span> 
                    </div>                    
                </div>
                <div className="model col-md-3  col-sm-6">
                    <div className="model-body">
                        <p className="model-title">GB</p>
                        <span>{msg.gb.toFixed(4)}</span>  
                    </div>                    
                </div>
                <div className="model col-md-3 col-sm-6">
                    <div className="model-body">
                        <p className="model-title">MEAN</p>
                        <span>{msg.mean.toFixed(4)}</span>
                    </div>                    
                </div>
            </div>
        }        
    }
    content = 
    <div className="wrapper">
        <div className="content-wrapper">
            <div className="content-header my-5">
                <div className="container-fluid">
                    <div className="row mb-2">
                    <div className="row">
                        <h1 className="m-0 bold title">Predector with costume data</h1>
                    </div>
                    </div>
                </div>
            </div>
            <section className="content mt-3">
                <div className="container-fluid">
                    <form className="costume_form col-md-6" onSubmit={(e) => {predict(e)}}>                        
                        <div className="row d-flex justify-content-around align-items-center">
                            <input id="open" className="form-check col-md-5 costume_input" placeholder="Open" onChange={(e) => {setOpen(e.target.value)}}/>
                            <input id="high" className="form-check col-md-5 costume_input" placeholder="High" onChange={(e) => {setHigh(e.target.value)}}/>
                        </div>
                        <div className="row justify-content-around align-items-center">
                            <input id="low" className="form-check col-md-5 costume_input" placeholder="Low" onChange={(e) => {setLow(e.target.value)}}/>
                            <input id="volume" className="form-check col-md-5 costume_input" placeholder="Volume" onChange={(e) => {setVolume(e.target.value)}}/>
                        </div>
                        <div className="row justify-content-center">
                            <select className="form-check col-md-5 costume_input" onChange={(e) => {setTimeframe(e.target.value)}}>
                                <option selected disabled>Select timeframe of prediction</option>
                                <option value="1h">1 HOUR</option>
                                <option value="1D">1 DAY</option>
                                <option value="1wk">1 WEEK</option>
                                <option value="1mo">1 MONTH</option>
                            </select>
                        </div>
                        <button className="btn_predict col-md-3 mt-3">Predict</button>
                    </form>
                    {p}
                </div>
            </section>
        </div>        
    </div>
    return content
}

export default Costume
