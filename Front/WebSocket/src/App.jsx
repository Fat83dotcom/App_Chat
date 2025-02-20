import { useState } from 'react'
import './App.css'
import { Col, Container, Row } from 'react-bootstrap'
import { WaitingRoom } from './Components/waitingRoom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
// import { ChatRoom } from './Components/chatRoom'


function App() {
  const [connection, setConnnection] = useState()
  // const [messages, setMessages] = useState()

  const joinChatRoom = async (userName, chatRoom) => {
    try {
      const conn = new HubConnectionBuilder()
        .withUrl(' http://localhost:5226/chat')
        .configureLogging(LogLevel.Information)
        .build()

        conn.on('ReceiveMessage', (userName, msg) => {
          console.log(`Msg: ${msg}`);
        })

        // conn.on('ReceiveSpecificMessage', (userName, msg) => {
        //   setMessages(messages => [...messages, {userName, msg}] )
        // })

        
        await conn.start()
        await conn.invoke('JoinSpecificChatRoom', {userName, chatRoom})
        
        setConnnection(conn)
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
            </Col>
          </Row>
          <WaitingRoom joinChatRoom={joinChatRoom}/>
          {/* {!connection
            ? 
            : <ChatRoom messages={messages}/>            
          } */}
        </Container>
      </main>
    </>
  )
}

export default App
