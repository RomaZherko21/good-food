import { useContext } from 'react';
import s from './Profile.module.css';
import { AppContext } from '../../state/context';
import { Link } from 'react-router-dom';

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
          userMetaData.map((item: any) => {
            return (
              <li key={item[1]}>
                {item[0]}:{' '}
                {Array.isArray(item[1]) ? (
                  item[1].map((e) => <span key={e}>{e}; </span>)
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
