import s from './OneRecipe.module.css';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { AppContext } from '../../state/context';
import { Types } from '../../state/reducers';
import { ProductType } from '../../types';
import onImgErr from '../../helpers/onImgErr';

function Recipes() {
  const { state, dispatch } = useContext(AppContext);
  let [recipe, setRecipe] = useState<ProductType | any>('');
  let { id }: { id: string } = useParams();
  id = id.slice(1);

  const foundRecipe: ProductType | any = state.products.find((item) => String(item.id) === id);

  useEffect(() => {
    setRecipe({
      ...foundRecipe,
      ingredients: JSON.parse(foundRecipe.ingredients),
      steps: JSON.parse(foundRecipe.steps),
      timers: JSON.parse(foundRecipe.timers),
    });
  }, [foundRecipe]);

  const onAddToCart = () => {
    dispatch({
      type: Types.AddToShoppingCart,
      payload: recipe,
    });
  };

  const onRemoveFromCart = () => {
    dispatch({
      type: Types.RemoveFromShoppingCart,
      payload: recipe,
    });
  };

  return (
    <section className={s.recipe}>
      {!recipe ? (
        <h1>nothing</h1>
      ) : (
        <>
          <ul>
            <h1>{recipe.name}</h1>
            <li>
              <img
                src={recipe.imageURL}
                onError={onImgErr.bind(null, recipe.originalURL)}
                alt={recipe.name}
              />
            </li>
            <li className={s.ingredients}>
              <span> Ingredients:</span>
              {recipe.ingredients.map((item: { name: string; quantity: string }) => (
                <div key={item.name}>
                  {item.name}, {item.quantity}
                </div>
              ))}
            </li>
            <li className={s.ingredients}>
              <span> Steps:</span>
              {recipe.steps.map((item: string, id: number) => (
                <div key={id}>
                  {id + 1}. {item}
                </div>
              ))}
            </li>
          </ul>
          {state.shoppingCart.products.filter((item) => item.id === recipe.id).length > 0 ? (
            <button onClick={onRemoveFromCart}>Remove from Shopping cart</button>
          ) : (
            <button onClick={onAddToCart}>Add to Shopping cart</button>
          )}
        </>
      )}
    </section>
  );
}

export default Recipes;
