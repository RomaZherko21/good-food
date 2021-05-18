import s from './Chat.module.css';
import { useRef, useEffect } from 'react';

import { MessageListItem } from './MessageListItem';

export const MessageList = ({ messages, removeMessage }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages]);

  return (
    <div className={s.messageList}>
      {messages.map((msg) => (
        <MessageListItem
          key={msg.messageId}
          msg={msg}
          removeMessage={removeMessage}
        />
      ))}
      <span ref={messagesEndRef}></span>
    </div>
  );
};
