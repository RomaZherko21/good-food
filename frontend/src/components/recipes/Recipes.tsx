import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../state/context';
import s from './Recipes.module.css';
import { productAPI } from '../../api/serverAPI';
import { Types } from '../../state/reducers';

function Recipes() {
  const [err, setErr] = useState<string>('');
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    productAPI(
      '/products/?limit=10&offset=0',
      (response) => {
        dispatch({
          type: Types.SaveProducts,
          payload: [...response.data.data],
        });
      },
      (message) => {
        setErr(message);
      }
    );
  }, []);
  console.log(state.products);
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
      <div>{err}</div>
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

export default Recipes;
