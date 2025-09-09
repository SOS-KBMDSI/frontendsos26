import { useContext } from "react";
import { AuthErrorContext } from "../context/AuthErrorContext";

export const useAuthError = () => {
  const context = useContext(AuthErrorContext);
  if (!context) {
    throw new Error("useAuthError must be used within AuthErrorProvider");
  }
  return context;
};
