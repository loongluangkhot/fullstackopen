import { useState } from "react";

export const useNotify = () => {
  const [error, seterror] = useState("");
  const notify = (message) => {
    seterror(message);
    setTimeout(() => {
      seterror(null);
    }, 10000);
  };
  return [error, seterror, notify];
};
