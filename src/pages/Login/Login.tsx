import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { $auth } from "../../constants/firebase";
import { useDispatch } from "react-redux";
import { SET_USERINFO } from "../../store/reducers/auth";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { TrimErrorMessage } from "../../helper/error.message";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (data: any) => {
    try {
      const { user }: any = await signInWithEmailAndPassword(
        $auth,
        data.email,
        data.password
      );
      if (user) {
        dispatch(
          SET_USERINFO({
            user: {
              uid: user.uid,
              email: user.email,
              accessToken: user?.accessToken,
            },
          })
        );
        localStorage.setItem(
          "token",
          JSON.stringify({ token: user?.accessToken, uid: user.uid })
        );
        history.push("/");
      }
    } catch (e: any) {
      console.log(TrimErrorMessage(e.message));
      toast.error(TrimErrorMessage(e.message), {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="auth position-fixed w-100 d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-7 col-md-9">
            <div className="auth-form">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-12">
                    <input
                      className={`form-control d-block w-100 mb-md ${
                        errors.email && "is-invalid"
                      }`}
                      placeholder="Email"
                      {...register("email", {
                        required: true,
                        pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                      })}
                      aria-invalid={errors.email ? "true" : "false"}
                    />
                    {errors.email?.type === "required" && (
                      <p className="text-danger" role="alert">
                        Email is required
                      </p>
                    )}
                    {errors.email?.type === "pattern" && (
                      <p className="text-danger" role="alert">
                        Email is invalid (email@example.com)
                      </p>
                    )}
                  </div>
                  <div className="col-12">
                    <input
                      className={`form-control d-block w-100 mb-md ${
                        errors.password && "is-invalid"
                      }`}
                      placeholder="Password"
                      {...register("password", {
                        required: true,
                        minLength: 6,
                      })}
                      aria-invalid={errors.password ? "true" : "false"}
                    />
                    {errors.password?.type === "required" && (
                      <p className="text-danger" role="alert">
                        password is required
                      </p>
                    )}
                    {errors.password?.type === "minLength" && (
                      <p className="text-danger" role="alert">
                        password is must be greater than 6 characters.
                      </p>
                    )}
                  </div>
                  <div className="col-12">
                    <div className="row">
                      <div className="col-md-6 mb-3 mb-md-0">
                        <button className="d-block btn btn-primary w-100">
                          Sign In
                        </button>
                      </div>
                      <div className="col-md-6">
                        <Link
                          to="/register"
                          className="d-block btn btn-primary-o w-100"
                        >
                          Sign Up
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
