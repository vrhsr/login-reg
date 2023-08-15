import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

export default function Reset(props) {
  const { setPage, token } = props;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const getInfo = async (data) => {
    console.log(data);
    console.log("Token in Reset " + token);
    try {
      await axios.patch(`api/v1/users/resetPassword/${token}`, data);
      toast.success("Password has been changed successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setPage("login");
    } catch (err) {
      console.log("Error " + err.message);
      // alert("Failed to store password try again");
      toast.error("Failed to store password try again", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setPage("login");
    }

    // try {
    //   await axios.post("/api/v1/users/login", data);
    //   setPage("recovered");
    // } catch (error) {
    //   console.log(error.response.data);
    //   console.log(error.response.status);
    //   console.log(error.response.headers);
    //   alert("Incorrect Username or Password");
    // }
    // console.log(result);
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong card-registration">
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Reset Form</h3>
                <form onSubmit={handleSubmit(getInfo)}>
                  <div className="mb-4 position-relative">
                    <label className="form-label" htmlFor="password">
                      New Password
                    </label>
                    <input
                      placeholder="***********"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className="form-control form-control-lg"
                      required
                      {...register("password", { required: true })}
                    />
                    <button
                      type="button"
                      className="btn position-absolute  end-0 top-50 left-50 right-20 translate-middle-yz"
                      onClick={togglePasswordVisibility}
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                      />
                    </button>
                  </div>
                  <div className="mb-4 position-relative">
                    <label className="form-label" htmlFor="confirmPassword">
                      confirm Password
                    </label>
                    <input
                      placeholder="***********"
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      className="form-control form-control-lg"
                      required
                      {...register("confirmPassword", {
                        required: true,
                        validate: (val) => {
                          if (watch("password") != val) {
                            return "Your password does not match";
                          }
                        },
                      })}
                    />
                    {errors.confirmPassword?.type === "validate" && (
                      <span>Password do not match</span>
                    )}
                    <button
                      type="button"
                      className="btn position-absolute  end-0 top-50 left-50 right-20 translate-middle-yz"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      <FontAwesomeIcon
                        icon={showConfirmPassword ? faEyeSlash : faEye}
                      />
                    </button>
                  </div>
                  <div className="d-flex flex-column flex-md-row justify-content-between">
                    <div className="mb-3 mb-md-0">
                      <input
                        className="button btn btn-primary btn-lg"
                        type="submit"
                        value="Reset"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
