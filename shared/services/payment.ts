import { v4 as uuidv4 } from "uuid";
import { PaymentData } from "@/@types/yookassa";
import axios from "axios";

type PaymentDetails = {
  description: string;
  orderId: number;
  amount: number;
};

export const createPayment = async (details: PaymentDetails) => {
  const { data } = await axios.post<PaymentData>(
    "https://api.yookassa.ru/v3/payments",
    {
      amount: {
        value: details.amount,
        currency: "RUB",
      },
      capture: true,
      description: details.description,
      metadata: {
        order_id: details.orderId,
      },
      confirmation: {
        type: "redirect",
        return_url: process.env.YOOKASSA_CALLBACK_URL,
      },
    },
    {
      auth: {
        username: process.env.YOOKASSA_STORE_ID as string,
        password: process.env.YOOKASSA_API_KEY as string,
      },
      headers: {
        "Idempotence-Key": uuidv4(),
      },
    }
  );

  return data;
};
