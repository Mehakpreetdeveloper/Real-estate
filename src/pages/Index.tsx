
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we already have a logged in user (for demo purposes)
    const hasLoggedIn = localStorage.getItem("hasLoggedIn");
    if (hasLoggedIn === "true") {
      navigate("/dashboard");
    }
  }, [navigate]);

  return <Login />;
};

export default Index;
