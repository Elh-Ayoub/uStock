import React, { useEffect, useState } from "react"
import io from "socket.io-client";

const endPoint = "http://localhost:5000";
const socket = io.connect(`${endPoint}`);

function Home(){
    const [message, setMessage] = useState(null)
    const [messages, setMessages] = useState([])
    const [hour, setHour] = useState(null)

    
    let content = <p>{"Wait..."}</p>
    useEffect(() => {
        socket.on("success", (data) => {
            console.log(data.data)
        });
   
        socket.on("message", (msg) => {
            let list = messages
            list.push(msg.data)
            setMessages(list)
            let c = messages.map((msg) =>
                <li key={msg}>{msg}</li>
            )
            console.log(msg);
        });

        socket.on("hour_data", (hourData) => {
            setHour(hourData.message);
        });
        // setInterval(() => {
        //     socket.emit('hour_data');
        // }, 300);
    }, [null])
    
    

    const sendMessage = () => {
        socket.emit("message", message)
        document.getElementById("input_msg").value = ""
    }

    content = 
    <div>
        <div>
            <input type="text" id="input_msg" onChange={(e) => {setMessage(e.target.value)}}/>
            <button id="send_btn" onClick={sendMessage}>send</button>
        </div>
        {(hour) ? (
            <div>
                <p>GB: {hour.gb}</p>
                <p>LR: {hour.lr}</p>
                <p>RF: {hour.rf}</p>
            </div>
        ) : ("Wait...")}
    </div>
    return content
}

export default Home
