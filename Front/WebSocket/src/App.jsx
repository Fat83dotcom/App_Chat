import { useState } from "react";
import "./App.css";
import { Col, Container, Row } from "react-bootstrap";
import { WaitingRoom } from "./Components/waitingRoom";
import "bootstrap/dist/css/bootstrap.min.css";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { ChatRoom } from "./Components/chatRoom";

function App() {
  const [connection, setConnnection] = useState();
  const [messages, setMessages] = useState([]);
  const [joinedRoom, setJoinedRoom] = useState([])

  const joinChatRoom = async (userName, chatRoom) => {
    try {
      const conn = new HubConnectionBuilder()
        .withUrl("http://192.168.0.101:5000/chat")
        .configureLogging(LogLevel.Information)
        .build();

      conn.on("ReceiveMessage", (userName, msg) => {
        console.log(`Msg: ${msg}`);
        setJoinedRoom((joined) => [...joined, msg])
        
      })

      conn.on("ReceiveSpecificMessage", (userName, msg) => {
        setMessages((messages) => [...messages, { userName, msg }]);
      })
      
      await conn
      .start()
      .then(() => {
        console.log("SignalR connection established successfully.");
      })
      .catch((error) => {
        console.error("Error establishing SignalR connection:", error);
      });

      await conn.invoke("JoinSpecificChatRoom", { userName, chatRoom });
      
      setConnnection(conn);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async (msg) => {
    try {
      await connection.invoke("SendMessage", msg);
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <>
      <main>
        <Container>
          <Row>
            <Col>
              <h1>Bem vindo ao chat !</h1>
              {joinedRoom.map((joined, index) => <p key={index}>{joined}</p>)}
            </Col>
          </Row>

          {
            !connection
            ? <WaitingRoom joinChatRoom={joinChatRoom}/>
            : <ChatRoom messages={messages} sendMessage={sendMessage}/> 
          }
        </Container>
      </main>
    </>
  );
}

export default App;
