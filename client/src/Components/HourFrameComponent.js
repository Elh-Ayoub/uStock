import React, { useEffect, useState } from "react"


function HourFrame(props){
    const [hour, setHour] = useState(null)
    useEffect(() => {
        props.socket.on("success", (data) => {
            console.log(data.data)
        });
        props.socket.on("hour_data", (hourData) => {
            setHour(hourData.message);
        });
        setInterval(() => {
            props.socket.emit('hour_data');
        }, 300);
    }, [null])

    return(
        <div className="mt-2">
            <div className="text-center mb-3 col-md-4 col-sm-10">
                <h2 className="display-20 display-md-18 display-lg-16">1-Hour timeframe</h2>
            </div>
            <div className="row d-flex justify-content-around flex-wrap">
                <div className="model col-md-3 col-sm-6">
                    <div className="model-body">
                        <p className="model-title">RF</p>
                        {(hour) ? (
                            <span>{hour.rf.toFixed(4)}</span>  
                        ) : ("...")}
                    </div>                    
                </div>
                <div className="model col-md-3 col-sm-6">
                    <div className="model-body">
                        <p className="model-title">LR</p>
                        {(hour) ? (
                            <span>{hour.lr.toFixed(4)}</span>  
                        ) : ("...")}
                    </div>                    
                </div>
                <div className="model col-md-3 col-sm-6">
                    <div className="model-body">
                        <p className="model-title">GB</p>
                        {(hour) ? (
                            <span>{hour.gb.toFixed(4)}</span>  
                        ) : ("...")} 
                    </div>                    
                </div>
                <div className="model col-md-3 col-sm-6">
                    <div className="model-body">
                        <p className="model-title">MEAN</p>
                        {(hour) ? (
                            <span>{hour.mean.toFixed(4)}</span>  
                        ) : ("...")} 
                    </div>                    
                </div>
            </div>
        </div>
    )
}

export default HourFrame
