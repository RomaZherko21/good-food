import { useRef, useEffect } from 'react';
// стили
import { ListGroup } from 'react-bootstrap';
// компонент
import { MessageListItem } from './MessageListItem';

// пример встроенных стилей (inline styles)
const listStyles = {
  height: '80vh',
  border: '1px solid rgba(0,0,0,.4)',
  borderRadius: '4px',
  overflow: 'auto',
};

// функция принимает массив сообщений и функцию для удаления сообщений
// функция для удаления сообщений в виде пропа передается компоненту "MessageListItem"
export const MessageList = ({ messages, removeMessage }) => {
  // данный "якорь" нужен для выполнения прокрутки при добавлении в список нового сообщения
  const messagesEndRef = useRef(null);

  // плавная прокрутка, выполняемая при изменении массива сообщений
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages]);

  return (
    <>
      <ListGroup variant="flush" style={listStyles}>
        {messages.map((msg) => (
          <MessageListItem
            key={msg.messageId}
            msg={msg}
            removeMessage={removeMessage}
          />
        ))}
        <span ref={messagesEndRef}></span>
      </ListGroup>
    </>
  );
};
