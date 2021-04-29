import s from './Recipes.module.css';
import { AppContext } from '../../state/context';
import { useContext } from 'react';
import { Types } from '../.././state/reducers';

function Recipes() {
  let { state, dispatch } = useContext(AppContext);
  return (
    <section className={s.recipes}>
      <h1>Recipes {state.shoppingCart}</h1>
      <button
        onClick={() => {
          dispatch({
            type: Types.Add,
          });
        }}
      >
        CLICK MEEEE
      </button>
      <h3>GET COOKING & SHARING</h3>
      <ul className={s.filters}>
        <span>FILTER BY:</span>
        <li>POPULAR</li>
        <li>CHICKEN</li>
        <li>FRUIT</li>
        <li>PASTA</li>
        <li>VEGETABLES</li>
        <li>ALL RECIPES</li>
      </ul>
      <div className={s.recipesList}>
        <div>
          <img
            src="https://img.jamieoliver.com/jamieoliver/recipe-database/oldImages/large/372_36_1440760950.jpg?tr=w-258,h-345"
            alt="dairy-free"
          />
          <h4>dairy-free</h4>
          <p>Paella</p>
        </div>
        <div>
          <img
            src="https://img.jamieoliver.com/jamieoliver/recipe-database/oldImages/large/372_36_1440760950.jpg?tr=w-258,h-345"
            alt="dairy-free"
          />
          <h4>dairy-free</h4>
          <p>Paella</p>
        </div>
        <div>
          <img
            src="https://img.jamieoliver.com/jamieoliver/recipe-database/oldImages/large/372_36_1440760950.jpg?tr=w-258,h-345"
            alt="dairy-free"
          />
          <h4>dairy-free</h4>
          <p>Paella</p>
        </div>
        <div>
          <img
            src="https://img.jamieoliver.com/jamieoliver/recipe-database/oldImages/large/372_36_1440760950.jpg?tr=w-258,h-345"
            alt="dairy-free"
          />
          <h4>dairy-free</h4>
          <p>Paella</p>
        </div>
        <div>
          <img
            src="https://img.jamieoliver.com/jamieoliver/recipe-database/oldImages/large/372_36_1440760950.jpg?tr=w-258,h-345"
            alt="dairy-free"
          />
          <h4>dairy-free</h4>
          <p>Paella</p>
        </div>
        <div>
          <img
            src="https://img.jamieoliver.com/jamieoliver/recipe-database/oldImages/large/372_36_1440760950.jpg?tr=w-258,h-345"
            alt="dairy-free"
          />
          <h4>dairy-free</h4>
          <p>Paella</p>
        </div>
        <div>
          <img
            src="https://img.jamieoliver.com/jamieoliver/recipe-database/oldImages/large/372_36_1440760950.jpg?tr=w-258,h-345"
            alt="dairy-free"
          />
          <h4>dairy-free</h4>
          <p>Paella</p>
        </div>
        <div>
          <img
            src="https://img.jamieoliver.com/jamieoliver/recipe-database/oldImages/large/372_36_1440760950.jpg?tr=w-258,h-345"
            alt="dairy-free"
          />
          <h4>dairy-free</h4>
          <p>Paella</p>
        </div>
      </div>
      <button>view more</button>
    </section>
  );
}

export default Recipes;
