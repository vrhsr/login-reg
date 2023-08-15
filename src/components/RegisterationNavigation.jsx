import { useState } from "react";
import EmailVerify from "./EmailVerify";
import Register from "./Register";
import Home from "./Home";
function RegisterationNavigation() {
  const [page, setPage] = useState("register");
  const [data, setData] = useState();
  const [OTP, setOTP] = useState();

  const navigate = {
    page,
    OTP,
    data,
    setPage,
    setData,
    setOTP,
  };

  function NavigateRegisterationComponents({ page }) {
    if (page === "register") return <Register {...navigate} />;
    else if (page === "emailVerify") return <EmailVerify {...navigate} />;
    return <Home />;
  }

  return <NavigateRegisterationComponents page={page} />;
}

export default RegisterationNavigation;
