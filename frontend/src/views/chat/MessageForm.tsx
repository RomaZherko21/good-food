import s from './Chat.module.css';
import { useState } from 'react';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import { sendMessageType } from './chatTypes';

const MessageForm = ({
  username,
  sendMessage,
}: {
  username: string;
  sendMessage: sendMessageType;
}) => {
  const [text, setText] = useState<string>('');
  const [showEmoji, setShowEmoji] = useState<boolean>(false);

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleEmojiShow = () => {
    setShowEmoji((v) => !v);
  };

  const handleEmojiSelect = (e: any) => {
    setText((text) => (text += e.native));
  };

  const handleSendMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const trimmed: string = text.trim();
    if (trimmed) {
      sendMessage({ messageText: text, senderName: username });
      setText('');
    }
  };

  return (
    <>
      <div className={s.messageForm}>
        <button type="button" onClick={handleEmojiShow}>
          <i className="fas fa-smile"></i>
        </button>

        <input value={text} onChange={handleChangeText} type="text" placeholder="Message..." />
        <button onClick={handleSendMessage}>
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
      {showEmoji && <Picker onSelect={handleEmojiSelect} emojiSize={20} />}
    </>
  );
};

export default MessageForm;
