import { useState } from "react";
import { useForm } from "react-hook-form";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const Login = (props) => {
  const { register, handleSubmit, reset } = useForm();
  const { setPage } = props;
  const navigate = useNavigate();
  const getInfo = async (data) => {
    console.log(data);
    try {
      await axios.post("/api/v1/users/login", data);
      toast.success("Welcome", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/home");
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      // alert("Incorrect Username or Password");
      toast.error("Incorrect username or password", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      reset();
    }
    // console.log(result);
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
          {/* <div className="col-12 col-md-8 col-lg-6 col-xl-5"> */}
          <div className="col-12 col-lg-9 col-xl-6">
            <div className="card shadow-2-strong card-registration">
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Login Form</h3>
                <form onSubmit={handleSubmit(getInfo)}>
                  <div className="mb-4">
                    <label className="form-label" htmlFor="emailAddress">
                      Email
                    </label>
                    <input
                      type="email"
                      id="emailAddress"
                      className="form-control form-control-lg"
                      placeholder="abc@gmail.com"
                      {...register("email", { required: true })}
                    />
                  </div>
                  <div className="mb-4 position-relative">
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                    <input
                      placeholder="***********"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className="form-control form-control-lg"
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
                  <div className="d-flex flex-column flex-md-row justify-content-between">
                    <div className="mb-3 mb-md-0">
                      <input
                        className="button btn btn-primary btn-lg"
                        type="submit"
                        value="Submit"
                      />
                    </div>
                    <div className="mt-3 mt-md-0">
                      <a
                        href="#"
                        onClick={() => {
                          setPage("emailInput");
                        }}
                        className="text-decoration-none"
                      >
                        Forgot Password?
                      </a>
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
};

export default Login;
