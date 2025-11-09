import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = (allowedRoles = []) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!token || (allowedRoles.length && !allowedRoles.includes(role))) {
      navigate("/login");
    }
  }, [token, role, navigate, allowedRoles]);
};

export default useAuth;