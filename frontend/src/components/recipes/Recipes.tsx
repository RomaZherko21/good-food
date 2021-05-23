import s from './Recipes.module.css';
import { useContext } from 'react';
import { useHistory } from 'react-router';

import { productAPI } from '../../api/serverAPI';
import { AppContext } from '../../state/context';
import { Types } from '../../state/reducers';
import { ProductType } from '../../types';

function Recipes() {
  const { state, dispatch } = useContext(AppContext);
  let history = useHistory();

  const productsFilters: string[] = ['popular', 'fruit', 'pasta', 'vegetables', 'all recipes'];

  const onSelectItem = (e: any) => {
    history.push(`/recipies:${e.target.parentNode.id}`);
  };
  const onImgErr = (e: any, item: ProductType) => {
    e.target.onerror = null;
    e.target.src = item.originalURL;
  };
  const onShowMoreItems = () => {
    dispatch({
      type: Types.ProductsOffset,
    });
    productAPI(
      `/products/?limit=${state.common.products.limit}&offset=${
        state.common.products.offset + state.common.products.limit
      }`,
      (response) => {
        dispatch({
          type: Types.SaveProducts,
          payload: [...response.data.data],
        });
      },
      (message) => {
        console.log(message);
      }
    );
  };

  return (
    <section className={s.recipes}>
      <h1>
        Recipes <span className={s.recipeCount}>({state.products.length})</span>{' '}
      </h1>
      <h3>GET COOKING & SHARING</h3>
      <ul className={s.filters}>
        <span>FILTER BY:</span>
        {productsFilters.map((item: string) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className={s.recipesList}>
        {state.products.map((item: ProductType) => {
          return (
            <div className={s.recipe} key={item.id} id={String(item.id)} onClick={onSelectItem}>
              <img
                src={item.imageURL}
                onError={(e: any) => {
                  onImgErr(e, item);
                }}
                alt={item.name}
              />
              <div className={s.recipeTimer}>
                <i className="far fa-clock"></i>
                {typeof item.timers === 'string' &&
                  JSON.parse(item.timers).reduce((pre: number, val: number) => pre + val)}{' '}
                min.
              </div>
              <h4>{item.name}</h4>
            </div>
          );
        })}
      </div>
      <button onClick={onShowMoreItems}>view more</button>
    </section>
  );
}

export default Recipes;
