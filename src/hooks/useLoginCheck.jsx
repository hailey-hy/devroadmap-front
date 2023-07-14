import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useLoginCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("user") && !localStorage.getItem("tester")) {
      console.log("없음");
      navigate("/signin");
    }
  });
};
