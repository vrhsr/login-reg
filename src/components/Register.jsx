import { NavLink } from "react-router-dom";
import "./Register.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import axios from "axios";

const Register = (props) => {
  const { setData, setOTP, setPage } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevShowPassword) => !prevShowPassword);
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const getInfo = async (data) => {
    console.log(data);
    try {
      const otp = Math.floor(Math.random() * 9000 + 1000);
      console.log(otp);
      setData(data);
      setOTP(otp);
      await axios.post("/api/v1/users/email", {
        OTP: otp,
        email: watch("email"),
      });
      // alert("An otp has been sent to your email");
      toast.success("An otp has been sent to your email", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setPage("emailVerify");
    } catch (error) {
      // alert("Invalid Credentials");
      toast.error("Invalid Credentials or user with this email already exists", {
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
  return (
    <section className="gradient-custom">
      <div className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-9 col-xl-9">
            <div
              className="card shadow-2-strong card-registration"
              style={{ borderRadius: "15px" }}
            >
              <div className="card-body p-4 p-md-5 ">
                <div className="row">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 text-center">
                    Registration Form
                  </h3>
                  <div />

                  <div className="mt-4 pt-2 d-flex flex-row-reverse ">
                    <NavLink to="/login" className="p-2">
                      Already a user?Login
                    </NavLink>
                  </div>
                </div>
                <form
                  className="row"
                  id="form"
                  onSubmit={handleSubmit(getInfo)}
                >
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="firstName">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          className="form-control form-control-lg"
                          placeholder="firstName"
                          required
                          {...register("firstName")}
                        />
                        <div className="valid-feedback">Looks good!</div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="lastName">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          className="form-control form-control-lg"
                          placeholder="lastName"
                          required
                          {...register("lastName")}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4 d-flex align-items-center">
                      <div className="form-outline datepicker w-100">
                        <label htmlFor="birthdayDate" className="form-label">
                          Date Of Birth
                        </label>
                        <input
                          type="date"
                          className="form-control form-control-lg"
                          id="birthdayDate"
                          placeholder="01/01/2001"
                          required
                          {...register("birthday")}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 mb-4  mt-2">
                      <h6 className="mb-2 pb-1 text-dark fw-bold">Gender: </h6>
                      <div className="d-flex">
                        <div className="form-check form-check-inline mb-2 pb-1">
                          <label
                            className="form-check-label"
                            htmlFor="maleGender"
                          >
                            <input
                              className="form-check-input"
                              type="radio"
                              name="inlineRadioOptions"
                              id="maleGender"
                              value="male"
                              {...register("gender")}
                            />
                            Male
                          </label>
                        </div>

                        <div className="form-check form-check-inline mb-2 pb-1">
                          <label
                            className="form-check-label"
                            htmlFor="femaleGender"
                          >
                            <input
                              className="form-check-input"
                              type="radio"
                              name="inlineRadioOptions"
                              id="femaleGender"
                              value="female"
                              {...register("gender")}
                            />
                            Female
                          </label>
                        </div>

                        <div className="form-check form-check-inline mb-2 pb-1">
                          <label
                            className="form-check-label"
                            htmlFor="otherGender"
                          >
                            <input
                              className="form-check-input"
                              type="radio"
                              name="inlineRadioOptions"
                              id="otherGender"
                              value="other"
                              checked
                              {...register("gender")}
                            />
                            Other
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4 pb-2">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="emailAddress">
                          Email
                        </label>
                        <input
                          type="email"
                          id="emailAddress"
                          className="form-control form-control-lg"
                          placeholder="abc@gmail.com"
                          required
                          {...register("email")}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 mb-4 pb-2">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="phoneNumber">
                          Phone Number (+91)
                        </label>

                        <input
                          type="tel"
                          id="phoneNumber"
                          placeholder="Must be of 10 numbers"
                          className="form-control form-control-lg"
                          required
                          // {...register("phoneNumber")}
                          {...register("phoneNumber", {
                            required: true,
                          })}
                          minLength={10}
                          maxLength={10}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4 mb-4 pb-2">
                      <label className="form-label select-label">
                        Choose Nationality
                      </label>
                      <select
                        className="select form-control-lg"
                        required
                        {...register("nationality")}
                      >
                        <option value="1" disabled>
                          Select Nationality
                        </option>
                        <option value="indian">Indian</option>
                        <option value="australian">Australian</option>
                        <option value="american">American</option>
                        <option value="british">British</option>
                      </select>
                    </div>
                   

                    <div className="col-md-4 mb-4 pb-2 ">
                      <label className="form-label select-label">
                      Accompanying
                      </label>
                      <select
                        className="select form-control-lg"
                        required
                        {...register("accompanying")}
                      >
                        <option value="1" disabled>
                          Select career stage
                        </option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </select>
                    </div>
                    
                    <div className="col-md-4 mb-4 pb-2 ">
                      <label className="form-label select-label">
                        Choose career stage
                      </label>
                      <select
                        className="select form-control-lg"
                        required
                        {...register("career")}
                      >
                        <option value="1" disabled>
                          Select career stage
                        </option>
                        <option value="student">Student</option>
                        <option value="professional">Professional</option>
                        <option value="expert">Expert</option>
                      </select>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="companyName">
                          Company Name
                        </label>
                        <input
                          type="text"
                          id="companyName"
                          required
                          className="form-control form-control-lg"
                          placeholder="Company Name"
                          {...register("companyName")}
                        />
                      </div>
                    </div>
                    {/* place city */}
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="city">
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          required
                          className="form-control form-control-lg"
                          placeholder="City Name"
                          {...register("city")}
                        />
                      </div>
                    </div>
                    {/* <div className="col-md-6 mb-4 ">
                      <label className="form-label select-label">
                        Choose City
                      </label>
                      <br />
                      <select
                        className="select form-control-lg"
                        required
                        style={{ width: "100%" }}
                        {...register("city")}
                      >
                        <option value="1" disabled>
                          Select a City
                        </option>
                        <option value="lucknow">Lucknow</option>
                        <option value="chennai">Chennai</option>
                        <option value="kochi">kochi</option>
                        <option value="bengaluru">Bengalur</option>
                      </select>
                    </div> */}
                  </div>

                  <div className="mb-3 mt-4">
                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className="form-label"
                    >
                      Contact Address
                    </label>
                    <textarea
                      key={"1"}
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      required
                      {...register("contactAddress")}
                    ></textarea>
                  </div>

                  <div className="mb-3 mt-4">
                    <label
                      htmlFor="exampleFormControlTextarea2"
                      className="form-label"
                    >
                      Institutional Address
                    </label>
                    <textarea
                      key={"2"}
                      className="form-control"
                      id="exampleFormControlTextarea2"
                      rows="3"
                      required
                      {...register("institutionalAddress")}
                    ></textarea>
                  </div>

                  <div className="mb-3 mt-4">
                    <label
                      htmlFor="exampleFormControlTextarea3"
                      className="form-label"
                    >
                      More about you
                    </label>
                    <textarea
                      key={"3"}
                      className="form-control"
                      id="exampleFormControlTextarea3"
                      rows="5"
                      required
                      {...register("aboutInfo")}
                    ></textarea>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4 pb-2">
                      <div className="form-outline position-relative">
                        <label className="form-label" htmlFor="password">
                          Password
                        </label>
                        <input
                          // type="password"
                          // id="password"
                          // placeholder="**********"
                          // className="form-control form-control-lg"
                          // required
                          // {...register("password")}
                          placeholder="***********"
                          type={showPassword ? "text" : "password"}
                          id="password"
                          className="form-control  form-control-lg"
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
                    </div>
                    <div className="col-md-6 mb-4 pb-2">
                      <div className="form-outline position-relative">
                        <label className="form-label" htmlFor="confirmPassword">
                          ConfirmPassword
                        </label>
                        <input
                          id="confirmPassword"
                          placeholder="************"
                          type={showConfirmPassword ? "text" : "password"}
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
                    </div>
                  </div>

                  <div className="mt-4 pt-2 ">
                    <div className="input-group centered">
                      <input
                        className="btn btn-primary btn-lg button"
                        type="submit"
                        value="Submit"
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
};

export default Register;
