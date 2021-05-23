import s from './Profile.module.css';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AppContext } from '../../state/context';

const Profile = () => {
  const { state } = useContext(AppContext);

  let userMetaData;
  if (state.user.meta) {
    userMetaData = Object.entries(state.user.meta);
  }

  return (
    <section className={s.profile}>
      <div className={s.profileInfo}>
        <h3>{state.user.email}</h3>
        <span>ID: {state.user.id}</span>
        <Link to="/profile/customization">
          <i className="fas fa-cogs"></i>
        </Link>
      </div>
      <ul className={s.metaData}>
        <h1>About</h1>
        {userMetaData &&
          userMetaData.map((item: [string, string | string[] | undefined]) => {
            return (
              <li key={item[0]}>
                {item[0]}:
                {Array.isArray(item[1]) ? (
                  item[1].map((elem: string) => <span key={elem}>{elem}; </span>)
                ) : (
                  <span> {item[1]}</span>
                )}
              </li>
            );
          })}
      </ul>
    </section>
  );
};

export default Profile;
