import "./OTPInput.css";
import Mobile from "../assets/mobile.png";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
export default function OTPInput(props) {
  const { email, otp, setPage, setOTP, setToken } = props;
  const [timerCount, setTimer] = useState(60);
  const [OTPinput, setOTPinput] = useState([0, 0, 0, 0]);
  const [disable, setDisable] = useState(true);
  function resendOTP() {
    if (disable) return;
    const OTP = Math.floor(Math.random() * 9000 + 1000);
    console.log(OTP);
    setOTP(OTP);
    axios
      .post("/api/v1/users/forgotPassword", {
        OTP,
        email: email,
      })
      .then(({ data }) => {
        console.log(data);
        setToken(data.resetToken);
        setDisable(true);
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
      .catch((err) =>
        // console.log("Error " + err.message)
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
      );
  }

  function verfiyOTP() {
    if (parseInt(OTPinput.join("")) === otp) {
      toast.success("Otp has been verified successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setPage("reset");
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

  return (
    <div className="container d-flex justify-content-center align-items-center mt-4 pt-4">
      <div className="card text-center">
        <div className="card-header p-5">
          <img src={Mobile} />
          <h5 className="mb-2">OTP VERIFICATION</h5>
          <div>
            <small>
              code has been sent to {email.slice(0, 3)}******
              {email.slice(email.length - 12, email.length - 10)}@gmail.com
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
}
