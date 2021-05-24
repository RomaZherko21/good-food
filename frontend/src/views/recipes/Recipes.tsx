import s from './Recipes.module.css';
import { useContext } from 'react';

import serverAPI from '../../api/serverAPI';
import { AppContext } from '../../state/context';
import { Types } from '../../state/reducers';
import RecipesList from '../../components/recipesList/RecipesList';

function Recipes() {
  const { state, dispatch } = useContext(AppContext);

  const productsFilters: string[] = ['popular', 'fruit', 'pasta', 'vegetables', 'all recipes'];

  const onShowMoreItems = () => {
    dispatch({
      type: Types.ProductsOffset,
    });
    serverAPI.get(
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
      <RecipesList products={state.products} />
      <button onClick={onShowMoreItems}>view more</button>
    </section>
  );
}

export default Recipes;
