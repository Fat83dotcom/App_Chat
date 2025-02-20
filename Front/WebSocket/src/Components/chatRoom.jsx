import { Col, Row} from "react-bootstrap"
import P from 'prop-types'
import { MessageContainer } from "./MessageContainer"
import { SendMessage } from "./SendMessage"


export const ChatRoom = ({messages, sendMessage }) => {

    return (
        <>
        <Row className="px-5 py-5">

            <Col sm={12}>
                <h2>Chat Room</h2>
            </Col>
            <Col>
                <SendMessage sendMessage={sendMessage}/>
            </Col>
           
        </Row>
        <Row className="px-5 py-5">
            <Col sm={12}>
                <MessageContainer messages={messages}/>
            </Col>
        </Row>
        </>
    )
}

ChatRoom.propTypes = {
    messages: P.array,
    sendMessage: P.func
}