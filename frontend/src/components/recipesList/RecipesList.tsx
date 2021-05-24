import s from './RecipesList.module.css';
import { useHistory } from 'react-router';

import { ProductType } from '../../types';

function RecipesList({ products }: { products: ProductType[] }) {
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
        {products.map((item: ProductType) => {
          return (
            <div key={item.id} id={String(item.id)} onClick={onSelectItem}>
              <img
                src={item.imageURL}
                onError={(e: any) => {
                  onImgErr(e, item);
                }}
                alt={item.name}
              />
              <div className={s.recipeTimer}>
                <i className="far fa-clock"></i>
                {typeof item.timers === 'string'
                  ? JSON.parse(item.timers).reduce((pre: number, val: number) => pre + val)
                  : item.timers.reduce((pre: number, val: number) => pre + val)}{' '}
                min.
              </div>
              <h4>{item.name}</h4>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default RecipesList;
