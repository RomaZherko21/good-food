import { useContext } from 'react';
import { useHistory } from 'react-router';
import { AppContext } from '../../state/context';
import s from './MyRecipies.module.css';

function MyRecipies() {
  const { state } = useContext(AppContext);
  let history = useHistory();

  console.log(state.products);
  return (
    <section className={s.recipes}>
      <h1>My recipes...</h1>
      <div className={s.recipesList}>
        {state.shoppingCart.products.map((item: any) => {
          return (
            <div
              key={item.id}
              id={String(item.id)}
              onClick={(e: any) => {
                history.push(`/recipies:${e.target.parentNode.id}`);
              }}
            >
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
    </section>
  );
}

export default MyRecipies;
