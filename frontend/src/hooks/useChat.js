import { useContext, useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { nanoid } from 'nanoid';

import { useLocalStorage } from './useLocalstorage';
import { useBeforeUnload } from './useBeforeUnload';
import { AppContext } from '../state/context';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const useChat = (roomId) => {
  const { state } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  // создаем и записываем в локальное хранинище идентификатор пользователя
  const [userId] = useLocalStorage('userId', nanoid(8));
  // получаем из локального хранилища имя пользователя
  let username = state.user.email;
  // const [username] = useLocalStorage('username');

  const socketRef = useRef(null);

  useEffect(() => {
    // создаем экземпляр сокета, передаем ему адрес сервера
    // и записываем объект с названием комнаты в строку запроса "рукопожатия"
    // socket.handshake.query.roomId
    socketRef.current = io(SERVER_URL, {
      query: { roomId },
    });

    // отправляем событие добавления пользователя,
    // в качестве данных передаем объект с именем и id пользователя
    socketRef.current.emit('user:add', { username, userId });

    // обрабатываем получение списка пользователей
    socketRef.current.on('users', (users) => {
      // обновляем массив пользователей
      setUsers(users);
    });

    // отправляем запрос на получение сообщений
    socketRef.current.emit('message:get');

    // обрабатываем получение сообщений
    socketRef.current.on('messages', (messages) => {
      // определяем, какие сообщения были отправлены данным пользователем,
      // если значение свойства "userId" объекта сообщения совпадает с id пользователя,
      // то добавляем в объект сообщения свойство "currentUser" со значением "true",
      // иначе, просто возвращаем объект сообщения
      const newMessages = messages.map((msg) =>
        msg.userId === userId ? { ...msg, currentUser: true } : msg
      );
      // обновляем массив сообщений
      setMessages(newMessages);
    });

    return () => {
      // при размонтировании компонента выполняем отключение сокета
      socketRef.current.disconnect();
    };
  }, [roomId, userId, username]);

  // функция отправки сообщения
  // принимает объект с текстом сообщения и именем отправителя
  const sendMessage = ({ messageText, senderName }) => {
    // добавляем в объект id пользователя при отправке на сервер
    socketRef.current.emit('message:add', {
      userId,
      messageText,
      senderName,
    });
  };

  // функция удаления сообщения по id
  const removeMessage = (id) => {
    socketRef.current.emit('message:remove', id);
  };

  // отправляем на сервер событие "user:leave" перед перезагрузкой страницы
  useBeforeUnload(() => {
    socketRef.current.emit('user:leave', userId);
  });

  // хук возвращает пользователей, сообщения и функции для отправки удаления сообщений
  return { users, messages, sendMessage, removeMessage };
};
