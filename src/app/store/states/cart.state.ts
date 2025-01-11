import { ShoppingCart } from 'app/model/shopping-cart';

/**
 * Represents the values stored on the ShoppingCart Store
 * @interface ShoppingCartState
 */

export interface ShoppingCartState {

  /**
   * Stores the current shopping cart for the logged user.
   * @type {(ShoppingCart | null)}
   */
  shoppingCart: ShoppingCart | null;

  /**
   * Indicates if the shopping cart is in loading state. Some of the functionalities are blocked if the shopping cart is not ready.
   * @type {boolean}
   */
  isLoading: boolean;
}

/**
 * Specify initial state for ShoppingCartState
 */
export const initialCartState: ShoppingCartState = {
  shoppingCart: null,
  isLoading: true
};

