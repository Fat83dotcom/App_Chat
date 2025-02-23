import P from 'prop-types'
import './ScrollableBox.css';
import { useEffect, useRef } from 'react';

export const MessageContainer = ({ messages }) => {
    const lastMessageRef = useRef(null);

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.focus();
        }
    }, [messages]);

    return (
        <div className="scrollable-box">
            {messages.map((msg, index) => {
                const isLastMessage = index === messages.length - 1;
                return (
                    <div className='message-container' key={index}>
                        <p 
                            ref={isLastMessage ? lastMessageRef : null}
                            tabIndex={-1}
                        >
                            {msg.userName} -{'>'} {msg.msg}
                        </p>
                    </div>
                );
            })}
        </div>
    );
};

MessageContainer.propTypes = {
    messages: P.array
}