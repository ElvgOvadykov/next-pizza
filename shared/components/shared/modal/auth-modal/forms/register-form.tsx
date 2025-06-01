import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { registerFormSchema, RegisterFormValues } from "./schemas";
import { FormInput } from "../../../form";
import { Button } from "@/shared/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Title } from "../../../title";
import { registerUser } from "@/app/actions";

interface Props {
  onClose?: () => void;
}

export const RegisterForm: React.FC<Props> = ({ onClose }) => {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      fullName: "",
      confirmPassword: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await registerUser({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.success("Регистрация успешна. Подтвердите свою почту");

      onClose?.();
    } catch (error) {
      console.error("Error [REGISTER]: ", error);
      toast.error("Не удалось зарегистрироваться");
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title text="Регистрация" size="md" className="font-bold" />
            <p className="text-gray-400">
              Зарегистрируйтесь в нашем крутом сервисе!
            </p>
          </div>
          <img
            src="/assets/images/phone-icon.png"
            alt="phone-icon"
            width={60}
            height={60}
          />
        </div>

        <FormInput name="email" label="E-Mail" required />
        <FormInput name="fullName" label="Полное имя" required />
        <FormInput name="password" label="Пароль" type="password" required />
        <FormInput
          name="confirmPassword"
          label="Подтвердите пароль"
          type="password"
          required
        />

        <Button
          loading={form.formState.isSubmitting}
          className="h-12 text-base"
          type="submit"
        >
          Зарегистрироваться
        </Button>
      </form>
    </FormProvider>
  );
};
