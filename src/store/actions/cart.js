import * as Types from '../types';
import { config } from '../../services/config';

/*
export const addProductToCart = product => ({
  type: Types.ADD_PRODUCT_TO_CART,
  payload: product,
});

export const removeProductFromCart = product => ({
  type: Types.REMOVE_PRODUCT_FROM_CART,
  payload: product,
});
*/

export const addProductToCart = product => (dispatch, getState) => {
  const existing = getState().cartReducer.cartProducts.filter(
    p => p.product.id === product.id,
  ).length;
  let products = [...getState().cartReducer.cartProducts];
  if (existing === 0) {
    products = [{ product, quantity: 1 }, ...products];
  }
  if (existing === 1) {
    let _product = products.find(p => p.product.id === product.id);

    const filtered = getState().cartReducer.cartProducts.filter(
      p => p.product.id !== product.id,
    );
    _product.quantity++;
    products = [_product, ...filtered]; //at index mora
  }

  //FORA MORA DISPATCH A NE RETURN
  dispatch({
    type: Types.ADD_PRODUCT_TO_CART,
    payload: products,
  });
};

export const removeProductFromCart = product => (dispatch, getState) => {
  const existing = getState().cartReducer.cartProducts.find(
    p => p.product.id === product.id,
  );
  let products = [...getState().cartReducer.cartProducts];
  if (existing.quantity === 1) {
    products = products.filter(p => p.product.id !== product.id);
  }

  if (existing.quantity > 1) {
    let _product = products.find(p => p.product.id === product.id);
    _product.quantity--;
  }

  dispatch({
    type: Types.REMOVE_PRODUCT_FROM_CART,
    payload: products,
  });
};
