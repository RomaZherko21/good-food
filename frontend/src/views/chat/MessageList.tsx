import s from './Chat.module.css';
import { useRef, useEffect } from 'react';

import { MessageListItem } from './MessageListItem';
import { MessageType, removeMessageType } from './types';

const MessageList = ({
  messages,
  removeMessage,
}: {
  messages: MessageType[];
  removeMessage: removeMessageType;
}) => {
  const messagesEndRef = useRef<HTMLSpanElement>(null);
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
export default MessageList;
