"use client";

import { Button, Dialog, DialogContent } from "@/shared/components/ui";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { LoginForm } from "./forms/login-form";
import { RegisterForm } from "./forms/register-form";

interface Props {
  open: boolean;
  onClose?: () => void;
}

export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
  const [formType, setFormType] = useState<"login" | "register">("login");
  const toggleFormType = () => {
    setFormType((prevValue) => (prevValue === "login" ? "register" : "login"));
  };

  const onCloseHandler = () => {
    onClose?.();
  };

  return (
    <Dialog open={open} onOpenChange={onCloseHandler}>
      <DialogContent className="w-[450px] bg-white p-10">
        {formType === "login" ? (
          <LoginForm onClose={onClose} />
        ) : (
          <RegisterForm onClose={onClose} />
        )}
        <hr />
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => {
              signIn("github", {
                callbackUrl: "/",
                redirect: true,
              });
            }}
            type="button"
            className="gap-2 h-12 p-2 flex-1"
          >
            <img
              className="w-6 h-6"
              src="https://github.githubassets.com/favicons/favicon.svg"
            />
            GitHub
          </Button>

          <Button
            variant="secondary"
            onClick={() => {
              signIn("google", {
                callbackUrl: "/",
                redirect: true,
              });
            }}
            type="button"
            className="gap-2 h-12 p-2 flex-1"
          >
            <img
              className="w-6 h-6"
              src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
            />
            Google
          </Button>
        </div>
        <Button
          variant="outline"
          onClick={toggleFormType}
          type="button"
          className="h-12"
        >
          {formType === "login" ? "Регистрация" : "Войти"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
