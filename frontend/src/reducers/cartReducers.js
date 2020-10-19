import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants.js'

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const itemExists = state.cartItems.find(
        item => item.product === action.payload.product
      )

      if (!!itemExists) {
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.product === itemExists.product ? action.payload : item
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        }
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          item => item.product !== action.payload
        ),
      }

    default:
      return state
  }
}
