import { useState } from "react";
import { Button, Col, Form, FormControl, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import P from "prop-types";

export const WaitingRoom = ({ joinChatRoom }) => {
  const [userName, setUserName] = useState();
  const [chatRoom, setChatRoom] = useState();

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        joinChatRoom(userName, chatRoom);
      }}
    >
      <Row className="px-5 py-5">
        <Col sm={12}>
          <Form.Group>
            <FormControl
              placeholder="Nome de usuario"
              onChange={(e) => setUserName(e.target.value)}
            />
            <FormControl
              placeholder="Chat"
              onChange={(e) => setChatRoom(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col sm={12}>
          <Button size="lg" type="submit">
            Entrar
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

WaitingRoom.propTypes = {
  joinChatRoom: P.func,
};
