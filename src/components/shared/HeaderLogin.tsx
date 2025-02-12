"use client";

import { CircleUser, User } from "lucide-react";
import { Button } from "../ui";
import { AuthModal } from "../shared";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/utils/utils";

export const HeaderLogin = () => {
  const [open, setOpen] = useState(false);
  const { data, status } = useSession();

  const handlerOpen = () => setOpen((prev) => !prev);

  return (
    <>
      {!data ? (
        <Button
          loading={status === "loading"}
          className={cn("flex items-center gap-1", {
            "w-[92px]": status === "loading",
          })}
          onClick={handlerOpen}
        >
          <User size={16} />
          Войти
        </Button>
      ) : (
        <Link href="/profile">
          <Button variant="secondary" className="flex items-center gap-2">
            <CircleUser size={18} />
            Профиль
          </Button>
        </Link>
      )}
      <AuthModal open={open} setOpen={handlerOpen} />
    </>
  );
};
