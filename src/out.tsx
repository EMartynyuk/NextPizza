"use client";

import { signOut } from "next-auth/react";
import { CSSProperties } from "react";

const style: CSSProperties = {
  position: "absolute",
  left: "15px",
  top: "15px",
  zIndex: "9999",
  width: "fit-content",
  backgroundColor: "grey",
  color: "white",
  fontSize: "21px",
};

export const Out = () => {
  return (
    <button style={style} onClick={() => signOut({ redirect: true })}>
      Выйти
    </button>
  );
};
