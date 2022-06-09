import React, { useEffect, useState } from "react"


function DayFrame(props){
    const [day, setDay] = useState(null)
    useEffect(() => {
        props.socket.on("success", (data) => {
            console.log(data.data)
        });
        props.socket.on("day_data", (dayData) => {
            setDay(dayData.message);
        });
        setInterval(() => {
            props.socket.emit('day_data');
        }, 300);
    }, [null])
    return(
        <div className="mt-5">
            <div className="text-center mb-3 col-md-4 col-sm-10">
                <h2 className="display-20 display-md-18 display-lg-16">1-Day timeframe</h2>
            </div>
            <div className="row d-flex justify-content-around flex-wrap">
                <div className="model col-md-3 col-sm-6">
                    <div className="model-body">
                        <p className="model-title">RF</p>
                        {(day) ? (
                            <span>{day.rf.toFixed(4)}</span>  
                        ) : ("...")} 
                    </div>                    
                </div>
                <div className="model col-md-3  col-sm-6">
                    <div className="model-body">
                        <p className="model-title">LR</p>
                        {(day) ? (
                            <span>{day.lr.toFixed(4)}</span>  
                        ) : ("...")} 
                    </div>                    
                </div>
                <div className="model col-md-3  col-sm-6">
                    <div className="model-body">
                        <p className="model-title">GB</p>
                        {(day) ? (
                            <span>{day.gb.toFixed(4)}</span>  
                        ) : ("...")}   
                    </div>                    
                </div>
                <div className="model col-md-3 col-sm-6">
                    <div className="model-body">
                        <p className="model-title">MEAN</p>
                        {(day) ? (
                            <span>{day.mean.toFixed(4)}</span>  
                        ) : ("...")}  
                    </div>                    
                </div>
            </div>
        </div>
    )
}

export default DayFrame
