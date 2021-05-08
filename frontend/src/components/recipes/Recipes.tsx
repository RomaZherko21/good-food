import React, { useContext, useRef } from 'react';
import { useHistory } from 'react-router';
import { productAPI } from '../../api/serverAPI';
import { AppContext } from '../../state/context';
import { Types } from '../../state/reducers';
import s from './Recipes.module.css';

function Recipes() {
  const { state, dispatch } = useContext(AppContext);
  let history = useHistory();
  console.log(state.shoppingCart);
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
        {state.products.map((item) => {
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
                  e.target.src = item.originalURL;
                }}
                alt={item.name}
              />
              <h4>{item.name}</h4>
            </div>
          );
        })}
      </div>
      <button
        onClick={() => {
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
        }}
      >
        view more
      </button>
    </section>
  );
}

export default Recipes;
