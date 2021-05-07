import { useContext } from 'react';
import { AppContext } from '../../state/context';
import s from './MyRecipies.module.css';

function MyRecipies() {
  const { state } = useContext(AppContext);

  console.log(state.products);
  return (
    <section className={s.recipes}>
      <h1>My recipes...</h1>
      <div className={s.recipesList}>
        {state.products.map((item) => {
          return (
            <div key={item.id}>
              <img
                src={item.imageURL}
                onError={(e: any) => {
                  e.target.onerror = null;
                  e.target.src =
                    'https://thatssojenn.files.wordpress.com/2012/09/no-food.jpg';
                }}
                alt={item.name}
              />
              <h4>{item.name}</h4>
            </div>
          );
        })}
      </div>
      <button>view more</button>
    </section>
  );
}

export default MyRecipies;
