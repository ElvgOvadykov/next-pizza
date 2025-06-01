import { useEffect } from "react";
import { useCartStore } from "../store";
import { CartStateItem } from "../store/cart";
import { CreateCartItemRequest } from "../services/models";

type ReturnProps = {
  totalAmount: number;
  items: CartStateItem[];
  totalItemsCount: number;
  loading: boolean;
  updateCartItemQuantity: (id: number, quantity: number) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
  addCartItem: (values: CreateCartItemRequest) => Promise<void>;
};

export const useCart = (): ReturnProps => {
  const totalAmount = useCartStore((state) => state.totalAmount);
  const items = useCartStore((state) => state.items);
  const totalItemsCount = useCartStore((state) => state.totalItemsCount);
  const loading = useCartStore((state) => state.loading);

  const fetchCartItems = useCartStore((state) => state.fetchCartItems);
  const updateCartItemQuantity = useCartStore(
    (state) => state.updateItemQuantity
  );
  const removeCartItem = useCartStore((state) => state.removeCartItem);
  const addCartItem = useCartStore((state) => state.addCartItem);

  useEffect(() => {
    fetchCartItems();
  }, []);

  return {
    totalAmount,
    items,
    totalItemsCount,
    loading,
    updateCartItemQuantity,
    removeCartItem,
    addCartItem,
  };
};
