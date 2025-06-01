import { CartStateItem } from "../store/cart";
import { CartDTO } from "../services/dto/cart-dto";
import { calcCartItemAmount } from "./calc-cart-item-amount";

interface ReturnProps {
  items: CartStateItem[];
  totalAmount: number;
  totalItemsCount: number;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
  const items = data.cartItems.map<CartStateItem>((item) => ({
    id: item.id,
    quantity: item.quantity,
    name: item.productItem.product.name,
    imageUrl: item.productItem.product.imageUrl,
    amount: calcCartItemAmount(item),
    pizzaSize: item.productItem.size,
    pizzaType: item.productItem.pizzaType,
    ingredients: item.ingredients.map((ingredient) => ({
      name: ingredient.name,
      price: ingredient.price,
    })),
    disabled: false,
  }));

  return {
    totalAmount: data.totalAmount,
    items,
    totalItemsCount: items.reduce((acc, current) => acc + current.quantity, 0),
  };
};
