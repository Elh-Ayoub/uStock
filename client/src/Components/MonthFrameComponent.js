import React, { useEffect, useState } from "react"

function MonthFrame(props){
    const [month, setMonth] = useState(null)
    useEffect(() => {
        props.socket.on("success", (data) => {
            console.log(data.data)
        });
        props.socket.on("month_data", (monthData) => {
            setMonth(monthData.message);
        });
        setInterval(() => {
            props.socket.emit('month_data');
        }, 700);
    }, [null])

    return(
        <div className="mt-5">
            <div className="text-center mb-3 col-md-4 col-sm-10">
                <h2 className="display-20 display-md-18 display-lg-16">1-Month timeframe</h2>
            </div>
            <div className="row d-flex justify-content-around flex-wrap">
                <div className="model col-md-3 col-sm-6">
                    <div className="model-body">
                        <p className="model-title">RF</p>
                        {(month) ? (
                            <span>{month.rf.toFixed(4)}</span>  
                        ) : ("...")}  
                    </div>                    
                </div>
                <div className="model col-md-3  col-sm-6">
                    <div className="model-body">
                        <p className="model-title">LR</p>
                        {(month) ? (
                            <span>{month.lr.toFixed(4)}</span>  
                        ) : ("...")}   
                    </div>                    
                </div>
                <div className="model col-md-3  col-sm-6">
                    <div className="model-body">
                        <p className="model-title">GB</p>
                        {(month) ? (
                            <span>{month.gb.toFixed(4)}</span>  
                        ) : ("...")}    
                    </div>                    
                </div>
                <div className="model col-md-3 col-sm-6">
                    <div className="model-body">
                        <p className="model-title">MEAN</p>
                        {(month) ? (
                            <span>{month.mean.toFixed(4)}</span>  
                        ) : ("...")}   
                    </div>                    
                </div>
            </div>
        </div>
    )
}

export default MonthFrame
