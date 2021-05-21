const users = {
  1: { username: 'Alice', online: false },
  2: { username: 'Bob', online: false },
};

module.exports = (io, socket) => {
  const getUsers = () => {
    io.in(socket.roomId).emit('users', users);
  };

  const addUser = ({ username, userId }) => {
    if (!users[userId]) {
      users[userId] = { username, online: true };
    } else {
      users[userId].online = true;
    }
    console.log(`${username} connected`);
    getUsers();
  };

  const removeUser = ({ userId, username }) => {
    users[userId].online = false;
    console.log(`${username} disconnected`);
    getUsers();
  };

  socket.on('user:get', getUsers);
  socket.on('user:add', addUser);
  socket.on('user:leave', removeUser);
};
