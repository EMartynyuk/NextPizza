"use client";

import { Button, Dialog, DialogContent } from "@/components/ui";
import { signIn } from "next-auth/react";
import { ReactNode, useState } from "react";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

interface IAuthModal {
  open: boolean;
  setOpen: () => void;
  children?: ReactNode;
}

export const AuthModal = ({ open, setOpen }: IAuthModal) => {
  const [type, setType] = useState<"login" | "register">("login");

  const handlerSwitch = () => {
    setType((prev) => (prev === "login" ? "register" : "login"));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[450px] bg-white p-10">
        {type === "login" ? (
          <LoginForm setOpen={setOpen} />
        ) : (
          <RegisterForm />
        )}

        <hr />
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() =>
              signIn("github", {
                redirect: false,
              })
            }
            type="button"
            className="gap-2 h-12 p-2 flex-1"
          >
            <img
              className="w-6 h-6"
              src="https://github.githubassets.com/favicons/favicon.svg"
              alt="GitHub"
            />
            GitHub
          </Button>
        </div>

        <Button
          variant="outline"
          onClick={handlerSwitch}
          type="button"
          className="h-12"
        >
          {type !== "login" ? "Войти" : "Регистрация"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
