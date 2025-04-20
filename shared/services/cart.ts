import { axiosInstance } from "./instance";
import { CartDTO } from "./dto/cart-dto";
import { CreateCartItemRequest } from "./models";

export const getCart = async (): Promise<CartDTO> =>
  (await axiosInstance.get<CartDTO>("/cart")).data;

export const updateItemQuantity = async (itemId: number, quantity: number) =>
  (await axiosInstance.patch<CartDTO>("/cart/" + itemId, { quantity })).data;

export const deleteItem = async (itemId: number) =>
  (await axiosInstance.delete<CartDTO>("/cart/" + itemId)).data;

export const addCartItem = async (values: CreateCartItemRequest) =>
  (await axiosInstance.post<CartDTO>("/cart", values)).data;
