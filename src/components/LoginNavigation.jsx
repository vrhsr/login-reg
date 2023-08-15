import { useState } from "react";
import Login from "./Login";
import OTPInput from "./OTPInput";

import EmailInput from "./EmailInput";
import Reset from "./Reset";
import Home from "./Home";

function LoginNavigation() {
  const [page, setPage] = useState("login");
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState();
  const [token, setToken] = useState("");

  const navigate = {
    page,
    setEmail,
    email,
    otp,
    setOTP,
    setPage,
    token,
    setToken,
  };

  function NavigateComponents({ page }) {
    if (page === "login") return <Login {...navigate} />;
    else if (page === "otp") return <OTPInput {...navigate} />;
    else if (page === "reset") return <Reset {...navigate} />;
    else if (page === "emailInput") return <EmailInput {...navigate} />;
    return <Home />;
  }

  return <NavigateComponents page={page} />;
}

export default LoginNavigation;
