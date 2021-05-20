import s from './Chat.module.css';

export const UserList = ({ users }) => {
  const usersArr = Object.entries(users);
  // [ ['1', { username: 'Alice', online: false }], ['2', {username: 'Bob', online: false}] ]

  const activeUsers = Object.values(users).filter((u) => u.online).length;

  return (
    <div className={s.userList}>
      <span>Active users: {activeUsers}</span>
      <ul>
        {usersArr.map(([userId, obj]) => (
          <li>{obj.username}</li>
        ))}
      </ul>
    </div>
  );
};
