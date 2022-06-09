import React, { useEffect, useState } from "react"
import io from "socket.io-client";
import DayFrame from "../Components/DayFrameComponent";
import HourFrame from "../Components/HourFrameComponent";
import MonthFrame from "../Components/MonthFrameComponent";
import WeekFrame from "../Components/WeekFrameComponent";


const endPoint = "http://localhost:5000";
const socket = io.connect(`${endPoint}`);

function Home(){
    let content = null
    
    content = 
    <div className="wrapper">
        <div className="content-wrapper">
            <div className="content-header my-5">
                <div className="container-fluid">
                    <div className="row mb-2">
                    <div className="row ">
                        <h1 className="m-0 bold title">Apple stocks predictor</h1>
                    </div>
                    </div>
                </div>
            </div>
            <section className="content mt-3">
                <div className="container-fluid">
                    <HourFrame socket={socket}/>
                    <DayFrame socket={socket}/>
                    <WeekFrame socket={socket}/>
                    <MonthFrame socket={socket}/>
                </div>
            </section>
        </div>        
    </div>
    return content
}

export default Home
