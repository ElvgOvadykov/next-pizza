"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  registerFormSchema,
  RegisterFormValues,
} from "./modal/auth-modal/forms/schemas";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import { Container } from "./container";
import { Title } from "./title";
import { FormInput } from "./form";
import { Button } from "../ui";

interface Props {
  user: User;
}

export const ProfileForm: React.FC<Props> = ({ user }) => {
  const form = useForm({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      fullName: user.fullName,
      email: user.email,
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmitHandler = async (data: RegisterFormValues) => {
    try {
      await updateUserInfo({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.success("Данные успешно обновлены");
    } catch (error) {
      return toast.error("Ошибка при обновлении данных");
    }
  };

  const onSignOutClick = () => {
    signOut({
      callbackUrl: "/",
    });
  };

  return (
    <Container className="my-10">
      <Title text="Личные данные" size="md" className="font-bold" />

      <FormProvider {...form}>
        <form
          className="flex flex-col gap-5 w-96 mt-10"
          onSubmit={form.handleSubmit(onSubmitHandler)}
        >
          <FormInput name="email" label="E-Mail" required />
          <FormInput name="fullName" label="Полное имя" required />

          <FormInput
            type="password"
            name="password"
            label="Новый пароль"
            required
          />
          <FormInput
            type="password"
            name="confirmPassword"
            label="Подтвердите пароль"
            required
          />

          <Button
            disabled={form.formState.isSubmitting}
            className="text-base mt-10"
            type="submit"
          >
            Сохранить
          </Button>

          <Button
            onClick={onSignOutClick}
            variant="secondary"
            disabled={form.formState.isSubmitting}
            className="text-base"
            type="button"
          >
            Выйти
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
};
