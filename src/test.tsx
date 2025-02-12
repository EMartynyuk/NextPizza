"use client";

import { useSession } from "next-auth/react";
import { CSSProperties } from "react";

const style: CSSProperties = {
  position: "absolute",
  left: "15px",
  bottom: "15px",
  zIndex: "9999",
  width: "fit-content",
  backgroundColor: "black",
  color: "white",
  fontSize: "21px",
};

export const Test = () => {
  const { data: session } = useSession();
  return <div style={style}>{JSON.stringify(session)}</div>;
};
