import s from './MyRecipies.module.css';
import { useContext } from 'react';
import { useHistory } from 'react-router';

import { AppContext } from '../../state/context';
import { ProductType } from '../../types';

function MyRecipies() {
  const { state } = useContext(AppContext);
  let history = useHistory();

  const onSelectItem = (e: any) => {
    history.push(`/recipies:${e.target.parentNode.id}`);
  };
  const onImgErr = (e: any, item: ProductType) => {
    e.target.onerror = null;
    e.target.src = item.originalURL;
  };

  return (
    <section className={s.recipes}>
      <h1>My recipes...</h1>
      <div className={s.recipesList}>
        {state.shoppingCart.products.map((item: ProductType) => {
          return (
            <div key={item.id} id={String(item.id)} onClick={onSelectItem}>
              <img
                src={item.imageURL}
                onError={(e: any) => {
                  onImgErr(e, item);
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
