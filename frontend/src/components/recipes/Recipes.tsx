import s from './Recipes.module.css';
import { Link } from 'react-router-dom';

function Recipes() {
  console.log(s);
  return (
    <section className={s.recipes}>
      <h1>Recipes</h1>
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
    </section>
  );
}

export default Recipes;
