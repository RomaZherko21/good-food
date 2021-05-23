import s from './MyRecipies.module.css';
import { useContext } from 'react';
import { useHistory } from 'react-router';

import { AppContext } from '../../state/context';
import { ProductType } from '../../types';

function MyRecipies() {
  const { state } = useContext(AppContext);
  let history = useHistory();

  return (
    <section className={s.recipes}>
      <h1>My recipes...</h1>
      <div className={s.recipesList}>
        {state.shoppingCart.products.map((item: ProductType) => {
          return (
            <div
              key={item.id}
              id={String(item.id)}
              onClick={(event: any) => {
                history.push(`/recipies:${event.target.parentNode.id}`);
              }}
            >
              <img
                src={item.imageURL}
                onError={(event: any) => {
                  event.target.onerror = null;
                  event.target.src = item.originalURL;
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
