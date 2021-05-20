import { useContext, useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

import { useBeforeUnload } from './useBeforeUnload';
import { AppContext } from '../state/context';

export const useChat = (roomId) => {
  const { state } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  const userId = state.user.id;
  const username = state.user.email;

  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(process.env.REACT_APP_SERVER_URL, {
      query: { roomId },
    });

    socketRef.current.emit('user:add', { username, userId });

    socketRef.current.on('users', (users) => {
      setUsers(users);
    });

    socketRef.current.emit('message:get');

    socketRef.current.on('messages', (messages) => {
      const newMessages = messages.map((msg) =>
        msg.userId === userId ? { ...msg, currentUser: true } : msg
      );
      setMessages(newMessages);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId, userId, username]);

  const sendMessage = ({ messageText, senderName }) => {
    socketRef.current.emit('message:add', {
      userId,
      messageText,
      senderName,
    });
  };

  const removeMessage = (id) => {
    socketRef.current.emit('message:remove', id);
  };

  useBeforeUnload(() => {
    socketRef.current.emit('user:leave', userId);
  });

  return { users, messages, sendMessage, removeMessage };
};
