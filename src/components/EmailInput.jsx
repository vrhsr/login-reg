import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
export default function EmailInput(props) {
  const { setPage, setOTP, setEmail, setToken } = props;
  const { register, handleSubmit, reset, watch } = useForm();

  const getInfo = async (data) => {
    console.log(data);
    if (watch("email")) {
      const OTP = Math.floor(Math.random() * 9000 + 1000);
      console.log(OTP);
      setOTP(OTP);
      setEmail(watch("email"));
      axios
        .post("/api/v1/users/forgotPassword", {
          OTP,
          email: watch("email"),
        })
        .then(({ data }) => {
          console.log(data);
          toast.success("An otp has been succesfully sent to your email", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setToken(data.resetToken);
          setPage("otp");
        })
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

      // setPage("otp");

      return;
    }
    // alert("Please enter your email");
    toast.error("Please enter your email", {
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
    return;
  };

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-6">
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
                      // required
                      // {...register("email", { required: true })}
                      {...register("email")}
                    />
                  </div>
                  <div className="mb-3 mb-md-0">
                    <input
                      className="button btn btn-primary btn-lg"
                      type="submit"
                      value="Submit"
                    />
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
