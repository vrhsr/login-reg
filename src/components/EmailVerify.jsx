import "./EmailVerify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Mobile from "../assets/mobile.png";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
const EmailVerify = (props) => {
  const { OTP, setOTP, data } = props;
  const { email } = data;
  const [timerCount, setTimer] = useState(60);
  const [disable, setDisable] = useState(true);
  const navigate = useNavigate();
  const [OTPinput, setOTPinput] = useState([0, 0, 0, 0]);
  function resendOTP() {
    if (disable) return;
    const otp = Math.floor(Math.random() * 9000 + 1000);
    // console.log(otp);
    setOTP(otp);
    axios
      .post("/api/v1/users/email", {
        OTP: otp,
        email,
      })
      .then(
        () =>
          toast.success("A new otp has been succesfully sent to your email", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
        // alert("A new OTP has succesfully been sent to your email.")
      )
      .then(() => setTimer(60))
      .catch(
        (err) =>
          toast.error(err.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
        // console.log("Error " + err.message)
      );
  }
  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000); //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval);
  }, [disable]);

  async function verfiyOTP() {
    if (parseInt(OTPinput.join("")) === OTP) {
      await axios.post("/api/v1/users/signup", data);
      // alert("Otp verified successfully");
      toast.success("Otp verified successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/login");
      return;
    }
    // alert(
    //   "The code you have entered is not correct, try again or re-send the link"
    // );
    toast.error(
      "The code you have entered is not correct, try again or re-send the link",
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
    return;
  }

  return (
    <div className="container d-flex justify-content-center align-items-center mt-4 pt-4">
      <div className="card text-center">
        <div className="card-header p-5">
          <img src={Mobile} />
          <h5 className="mb-2">OTP VERIFICATION</h5>
          <div>
            <small>
              code has been sent to {email}
            </small>
          </div>
        </div>
        <div className="input-container d-flex flex-row justify-content-center mt-2">
          <input
            type="text"
            className="m-1 text-center form-control rounded"
            maxLength="1"
            onChange={(e) =>
              setOTPinput([
                e.target.value,
                OTPinput[1],
                OTPinput[2],
                OTPinput[3],
              ])
            }
          />
          <input
            type="text"
            className="m-1 text-center form-control rounded"
            maxLength="1"
            onChange={(e) =>
              setOTPinput([
                OTPinput[0],
                e.target.value,
                OTPinput[2],
                OTPinput[3],
              ])
            }
          />
          <input
            type="text"
            className="m-1 text-center form-control rounded"
            maxLength="1"
            onChange={(e) =>
              setOTPinput([
                OTPinput[0],
                OTPinput[1],
                e.target.value,
                OTPinput[3],
              ])
            }
          />
          <input
            type="text"
            className="m-1 text-center form-control rounded"
            maxLength="1"
            onChange={(e) =>
              setOTPinput([
                OTPinput[0],
                OTPinput[1],
                OTPinput[2],
                e.target.value,
              ])
            }
          />
        </div>
        <div>
          <small>
            {"didn't get the otp?"}
            <a
              href="#"
              className="text-decoration-none"
              style={{
                color: disable ? "gray" : "blue",
                cursor: disable ? "none" : "pointer",
                textDecorationLine: disable ? "none" : "underline",
              }}
              onClick={() => resendOTP()}
            >
              {" "}
              {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
            </a>
          </small>
        </div>
        <div className="mt-3 mb-5">
          <button
            className="btn btn-success px-4 verify-btn"
            onClick={() => verfiyOTP()}
          >
            verify
          </button>
        </div>
      </div>
    </div>
  );
};
export default EmailVerify;
