import s from './Chat.module.css';
import { usersType } from './types';

const UserList = ({ users }: { users: usersType }) => {
  const usersArr = Object.entries(users);
  const activeUsers = Object.values(users).filter((u) => u.online).length;

  return (
    <div className={s.userList}>
      <span>Active users: {activeUsers}</span>
      <ul>
        {usersArr.map(([userId, obj]) => (
          <li key={userId}>{obj.username}</li>
        ))}
      </ul>
    </div>
  );
};
export default UserList;
