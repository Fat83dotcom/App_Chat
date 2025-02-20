import { Col, Row } from "react-bootstrap"
import P from 'prop-types'
import { MessageContainer } from "./MessageContainer"

export const ChatRoom = ({messages}) => {
    return (
        <>
        <Row className="px-5 py-5">
            <Col sm={10}>
            
            </Col>
            <Col>
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
    messages: P.string
}