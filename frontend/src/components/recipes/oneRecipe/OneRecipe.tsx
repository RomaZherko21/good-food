import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { AppContext } from '../../../state/context';
import { ProductType } from '../../../types';
import s from './OneRecipe.module.css';

function Recipes() {
  const { state } = useContext(AppContext);
  let [recipe, setRecipe] = useState<ProductType | any>('');
  let { id }: { id: string } = useParams();
  id = id.slice(1);

  let foundRecipe: ProductType | any = state.products.find(
    (item) => String(item.id) === id
  );
  useEffect(() => {
    foundRecipe &&
      setRecipe({
        ...foundRecipe,
        ingredients: JSON.parse(foundRecipe.ingredients),
        steps: JSON.parse(foundRecipe.steps),
        timers: JSON.parse(foundRecipe.timers),
      });
  }, [foundRecipe]);

  return (
    <section className={s.recipe}>
      {!recipe ? (
        <h1>nothing</h1>
      ) : (
        <ul>
          <h1>{recipe.name}</h1>
          <li>
            <img
              src={recipe.imageURL}
              onError={(e: any) => {
                e.target.onerror = null;
                e.target.src =
                  'https://thatssojenn.files.wordpress.com/2012/09/no-food.jpg';
              }}
              alt={recipe.name}
            />
          </li>
          <li className={s.ingredients}>
            <span> Ingredients:</span>
            {recipe.ingredients.map((item: any) => (
              <div key={item.name}>
                {item.name}, {item.quantity}
              </div>
            ))}
          </li>
          <li className={s.ingredients}>
            <span> Steps:</span>
            {recipe.steps.map((item: any, id: number) => (
              <div key={id}>
                {id + 1}. {item}
              </div>
            ))}
          </li>
        </ul>
      )}
    </section>
  );
}

export default Recipes;
