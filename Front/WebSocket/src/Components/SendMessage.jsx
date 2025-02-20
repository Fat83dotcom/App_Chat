import { useState } from "react";
import P from "prop-types";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";

export const SendMessage = ({ sendMessage }) => {
  const [msg, setMsg] = useState();

  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault()
          sendMessage(msg)
          setMsg('')
        }}
      >
        <InputGroup className="mb-3">
        
            <InputGroup.Text>Chat</InputGroup.Text>
            <FormControl onChange={e => setMsg(e.target.value)} value={msg} placeholder="Digite sua mensagem aqui."/>
            <Button variant="primary" type="submit" disabled={!msg}>Enviar</Button>

        </InputGroup>
       
      </Form>
    </>
  );
};

SendMessage.propTypes= {
    sendMessage: P.func
} 