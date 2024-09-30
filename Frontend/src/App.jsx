import React, { useState } from 'react'
import Style from "./App.module.css";
import axios from "axios";

function App() {

  const[name, setName] = useState("");
  const[mobile, setMobile] = useState("");
  const[message, setMessage] = useState("");

  async function sendMessage() {
    if (name && mobile && message) { // 'message' comes from the form data
        try {
            let response = await axios.post("http://localhost:5000/sendMessage", {
                name,
                mobile,
                message
            });
            if (response.status === 200) {
                alert(response.data.message);  // Show success message

                const apiUrl = "https://www.fast2sms.com/dev/bulkV2";
                const apiKey = "Enter your own api key here from fast2sms";
    
                // Rename the message for the SMS to avoid conflict
                const smsMessage = `Hello! ${name}\n${message}`;
    
                const cleanedContactNo = mobile.replace(/\D/g, ""); // Remove non-digit characters
                const numericContactNo = Number(cleanedContactNo); // Convert to a number
    
                const params = new URLSearchParams({
                  authorization: apiKey,
                  message: smsMessage, // Use smsMessage instead of message
                  language: "english",
                  route: "q",
                  numbers: numericContactNo,
                });
    
                const url = `${apiUrl}?${params.toString()}`;
    
                fetch(url, { method: "GET" })
                  .then((response) => response.json())
                  .then((data) => {
                    alert("Success! Your message has been delivered");
                  })
                  .catch((error) => {
                    alert("Error sending the message");
                  });
            } else {
                alert("Failed to send message");
            }
        } catch (error) {
            console.error(error); // Log the error for debugging
            alert("An error occurred while sending the message");
        }
    } else {
        alert("All fields are required");
    }
}



  return <>
    <div className={Style.mainDiv}>
      <div className={Style.formDiv}>
        <div className={Style.userInfoDiv}>
          <p>Name</p>
          <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
        </div>

        <div className={Style.userInfoDiv}>
          <p>Mobile No.</p>
          <input type="text" value={mobile} onChange={(e)=>setMobile(e.target.value)}/>
        </div>

        <div className={Style.userInfoDiv}>
          <p>Message</p>
          <textarea type="text" className={Style.textAreaMessage} value={message} onChange={(e)=>setMessage(e.target.value)}/>
        </div>

        <div className={Style.sendMessageBtnDiv}>
          <button onClick={sendMessage}>Send Message</button>
        </div>

      </div>
    </div>
  </>
}

export default App;