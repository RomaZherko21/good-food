import s from './Chat.module.css';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Picker } from 'emoji-mart';
import { FiSend } from 'react-icons/fi';
import { GrEmoji } from 'react-icons/gr';

export const MessageForm = ({ username, sendMessage }) => {
  const [text, setText] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);

  const handleChangeText = (e) => {
    setText(e.target.value);
  };

  const handleEmojiShow = () => {
    setShowEmoji((v) => !v);
  };

  const handleEmojiSelect = (e) => {
    setText((text) => (text += e.native));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (trimmed) {
      sendMessage({ messageText: text, senderName: username });
      setText('');
    }
  };

  return (
    <>
      <div className={s.messageForm}>
        <button variant="primary" type="button" onClick={handleEmojiShow}>
          <i class="fas fa-smile"></i>
        </button>

        <input
          value={text}
          onChange={handleChangeText}
          type="text"
          placeholder="Message..."
        />
        <button onClick={handleSendMessage}>
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
      {/* эмодзи */}
      {showEmoji && <Picker onSelect={handleEmojiSelect} emojiSize={20} />}
    </>
  );
};
