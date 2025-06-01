"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/shared/lib/utils";
import { Container } from "./container";
import Image from "next/image";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { CartButton } from "./cart-button";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { ProfileButton } from "./profile-button";
import { AuthModal } from "./modal";

type HeaderProps = {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
};

export const Header: React.FC<HeaderProps> = ({
  className,
  hasSearch = true,
  hasCart = true,
}) => {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    let toastMessage = "";

    if (searchParams.has("paid")) {
      toastMessage = "Заказ успешно оплачен!";
    }

    if (searchParams.has("verified")) {
      toastMessage = "Ваша успешно почта подтверждена!";
    }

    if (toastMessage) {
      router.replace("/");
      toast.success(toastMessage);
    }
  }, [searchParams]);

  return (
    <header className={cn("border-b", className)}>
      <Container className={cn("flex items-center justify-between py-8")}>
        {/* Левая часть */}
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="Лого" width={35} height={35} />
            <div>
              <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">
                вкуснее уже некуда
              </p>
            </div>
          </div>
        </Link>

        {/* Поиск */}
        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        {/* Правая часть */}
        <div className="flex items-center gap-3">
          <AuthModal
            open={isAuthModalOpen}
            onClose={() => setAuthModalOpen(false)}
          />

          <ProfileButton onSignInClick={() => setAuthModalOpen(true)} />

          {hasCart && (
            <div>
              <CartButton />
            </div>
          )}
        </div>
      </Container>
    </header>
  );
};
