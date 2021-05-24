import { useContext } from 'react';

import { AppContext } from '../../state/context';
import RecipesList from '../../components/recipesList/RecipesList';

function UserRecipes() {
  const { state } = useContext(AppContext);

  return <RecipesList products={state.shoppingCart.products} />;
}

export default UserRecipes;
