import s from './Chat.module.css';
import TimeAgo from 'react-timeago';
import { MessageType, removeMessageType } from './chatTypes';

export const MessageListItem = ({
  msg,
  removeMessage,
}: {
  msg: MessageType;
  removeMessage: removeMessageType;
}) => {
  const handleRemoveMessage = (id: string) => {
    removeMessage(id);
  };

  const { messageId, messageText, senderName, createdAt, currentUser } = msg;
  return (
    <div className={s.message} style={{ backgroundColor: currentUser ? '' : '#62a5a1' }}>
      <div className={s.senderInfo}>
        <div className={s.senderName}> {senderName}</div>
        <div className={s.messageTime}>
          <TimeAgo date={createdAt} />
        </div>
      </div>

      <div className={s.messageText}>
        <p>{messageText}</p>
        {currentUser && (
          <i onClick={() => handleRemoveMessage(messageId)} className="fas fa-trash"></i>
        )}
      </div>
    </div>
  );
};
