import React, { useEffect, useState } from "react"


function WeekFrame(props){
    const [week, setWeek] = useState(null)
    useEffect(() => {
        props.socket.on("success", (data) => {
            console.log(data.data)
        });
        props.socket.on("week_data", (weekData) => {
            setWeek(weekData.message);
        });
        setInterval(() => {
            props.socket.emit('week_data');
        }, 500);
    }, [null])

    return(
        <div className="mt-5">
            <div className="text-center mb-3 col-md-4 col-sm-10">
                <h2 className="display-20 display-md-18 display-lg-16">1-Week timeframe</h2>
            </div>
            <div className="row d-flex justify-content-around flex-wrap">
                <div className="model col-md-3 col-sm-6">
                    <div className="model-body">
                        <p className="model-title">RF</p>
                        {(week) ? (
                            <span>{week.rf.toFixed(4)}</span>  
                        ) : ("...")} 
                    </div>                    
                </div>
                <div className="model col-md-3  col-sm-6">
                    <div className="model-body">
                        <p className="model-title">LR</p>
                        {(week) ? (
                            <span>{week.lr.toFixed(4)}</span>  
                        ) : ("...")} 
                    </div>                    
                </div>
                <div className="model col-md-3  col-sm-6">
                    <div className="model-body">
                        <p className="model-title">GB</p>
                        {(week) ? (
                            <span>{week.gb.toFixed(4)}</span>  
                        ) : ("...")} 
                    </div>                    
                </div>
                <div className="model col-md-3 col-sm-6">
                    <div className="model-body">
                        <p className="model-title">MEAN</p>
                        {(week) ? (
                            <span>{week.mean.toFixed(4)}</span>  
                        ) : ("...")} 
                    </div>                    
                </div>
            </div>
        </div>
    )
}

export default WeekFrame
