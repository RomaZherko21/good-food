import { useContext, useState } from 'react';
import s from './Profile.module.css';
import { AppContext } from '../../state/context';
import { Types } from '../../state/reducers';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { state, dispatch } = useContext(AppContext);

  return (
    <section className={s.profile}>
      <div className={s.profileInfo}>
        <h3>{state.user.email}</h3>
        <span>ID: {state.user.id}</span>
        <Link to="/profile/settings">
          <i className="fas fa-cogs"></i>
        </Link>
      </div>
    </section>
  );
};

export default Profile;
