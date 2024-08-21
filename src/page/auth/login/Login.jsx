import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import {
  FaUser,
  FaEye,
  FaEyeSlash,
  FaCheckSquare,
  FaFacebook,
} from "react-icons/fa";
import { ImCheckboxUnchecked } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../../assets/SportHubLogoWhite.png";
import { useDispatch } from "react-redux";
import {
  fetchLogin,
  fetchUserProfile,
} from "../../../redux/feature/user/userSlice";
import toast, { Toaster } from "react-hot-toast";
import { getAccessToken } from "../../../lib/secureLocalStorage";
import registerImg from "../../../assets/SportHubLogo.png";
import LoginWithGoogle from "./LoginWithGoogle";

// REGEX for strong password
const strongPasswordregex =
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

// initialValues
const initialValues = {
  email: "",
  password: "",
};

// validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("អ៊ីម៉ែលមិនត្រឹមត្រូវ")
    .required("អ៊ីម៉ែលចាំបាច់ត្រូវបញ្ចូល"),
  password: Yup.string()
    .test("is-strong", function (value) {
      const { path, createError } = this;
      const errors = [];
      if (!/^(?=.*[A-Z])/.test(value)) errors.push("អក្សរធំមួយ");
      if (!/^(?=.*[a-z])/.test(value)) errors.push("អក្សរតូចមួយ");
      if (!/^(?=.*\d)/.test(value)) errors.push("លេខមួយ");
      if (!/^(?=.*[!@#$%^&*])/.test(value)) errors.push("សញ្ញាមួយ");
      if (value && value.length < 6)
        errors.push("យ៉ាងហោចណាស់ត្រូវមាន ៦ តួអក្សរ");

      return (
        errors.length === 0 ||
        createError({
          path,
          message: `ពាក្យសម្ងាត់ចាំបាច់ត្រូវមាន: ${errors.join(", ")}`,
        })
      );
    })
    .required("ពាក្យសម្ងាត់ចាំបាច់ត្រូវបញ្ចូល"),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [accessToken, setAccessToken] = useState(null);

  // handle navigation to home page
  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  // handle navigate to Register page
  const handleNavigateToRegister = () => {
    navigate("/register");
  };

  // handleLogin
  const handleLogin = async (values) => {
    try {
      // Attempt login
      await dispatch(fetchLogin(values)).then(() => {
        // Retrieve access token
        const token = getAccessToken();
        // Check if token is valid and navigate to home
        if (token) {
          setAccessToken(token);
          dispatch(fetchUserProfile());
        } else {
          // Handle case where login is successful but no token received
          toast.error("អ៊ីម៉ែល ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវ !");
        }
      });
    } catch (error) {
      // Handle login errors
      toast.error("Failed to log in. Please check your credentials.");
    }
  };

  /* login with google start*/
  const [googleLoginVisible, setGoogleLoginVisible] = useState(false);

  const handleGoogleLoginSuccess = (data) => {
    toast.success("Google login successful:", data);
    setAccessToken(data.accessToken);
  };

  const handleGoogleLoginFailure = () => {
    toast.error("Google login failed.");
  };
  /* login with google end*/

  return (
    <section className="h-screen flex justify-center items-center flex-col mx-auto px-4 sm:px-6 bg-[#222162]">
      <div className="flex flex-row justify-start items-center">
        <Link to="/">
          <img src={logo} alt="logo" className="h-7" />
        </Link>
        <Link to="/">
          <h3 className="text-xl text-white font-semibold my-5">
            <span className=" text-2xl text-red-800 px-2">|</span>
            ទំព័រដើម
          </h3>
        </Link>
      </div>
      <Toaster position="top-right" reverseOrder={true} />
      <section className="flex justify-center items-center flex-row gap-8 w-full max-w-md sm:max-w-lg lg:max-w-3xl bg-white p-8 rounded-lg">
        <section className="hidden lg:block w-[320px] h-full">
          <img
            src={registerImg}
            alt="image"
            className="w-full h-full object-cover rounded-lg"
          />
        </section>
        <section className="w-[350px] h-auto flex justify-center items-center flex-col mx-auto">
          <h2 className="text-center text-xl sm:text-2xl md:text-3xl text-[#222162] font-bold pb-2">
            ចូលគណនី
          </h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              handleLogin(values);
              resetForm();
            }}
          >
            <Form>
              <section className="w-[280px] lg:w-[320px] h-full flex items-center flex-col">
                <div className="relative-label mt-5">
                  <div className="relative w-[280px] lg:w-[320px] h-[50px] flex items-center">
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className="w-full h-full text-sm font-medium bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-white focus:border-[#222162] focus:ring-2 block pr-10 p-2.5 peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor="email"
                      className="absolute top-0 left-0 text-gray-500 text-sm transition-transform duration-300 ease-in-out"
                    >
                      អ៊ីម៉ែល
                    </label>
                    <FaUser className="absolute right-3 text-[#222162]" />
                  </div>
                  <ErrorMessage
                    component="div"
                    name="email"
                    className="text-red-700 text-xs"
                  />
                </div>

                <div className="relative-label mt-4 flex flex-col justify-center w-full">
                  <div className="relative w-[280px] lg:w-[320px] h-[50px] flex items-center">
                    <Field
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      className="w-full h-full text-sm font-medium bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-white focus:border-[#222162] focus:ring-2 block pr-10 p-2.5 peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor="password"
                      className="absolute top-0 left-0 text-gray-500 text-sm transition-transform duration-300 ease-in-out"
                    >
                      ពាក្យសម្ងាត់
                    </label>
                    {showPassword ? (
                      <FaEye
                        className="absolute right-3 text-[#222162] cursor-pointer"
                        onClick={() => setShowPassword(false)}
                      />
                    ) : (
                      <FaEyeSlash
                        className="absolute right-3 text-[#222162] cursor-pointer"
                        onClick={() => setShowPassword(true)}
                      />
                    )}
                  </div>
                  <ErrorMessage
                    component="div"
                    name="password"
                    className="text-red-700 text-sm"
                  />
                </div>

                <div className="w-full flex items-center justify-between mt-2">
                  <div className="flex items-center">
                    {rememberMe ? (
                      <FaCheckSquare
                        className="w-3 h-3 text-blue-700 cursor-pointer"
                        onClick={() => setRememberMe(false)}
                      />
                    ) : (
                      <ImCheckboxUnchecked
                        className="w-3 h-3 text-blue-700 cursor-pointer"
                        onClick={() => setRememberMe(true)}
                      />
                    )}
                    <span className="ml-1 text-sm text-gray-700">
                      ចង់ចាំលេខសម្ងាត់
                    </span>
                  </div>
                </div>

                <div className="flex justify-center items-center flex-col">
                  <button
                    type="submit"
                    className="w-[280px] lg:w-[320px] h-[50px] text-white bg-[#222162] font-semibold text-lg rounded-lg px-5 py-2.5 mt-5 focus:outline-none hover:bg-[#27268a]"
                  >
                    ចូលគណនី
                  </button>
                  <p className="text-base text-gray-800 font-semibold mt-5">
                    មិនមានគណនី?{" "}
                    <span
                      onClick={handleNavigateToRegister}
                      className="text-blue-700 cursor-pointer hover:underline"
                    >
                      ចូលបង្កើតគណនី
                    </span>
                  </p>
                </div>
              </section>
              {/* <div className="flex items-center mt-3">
                <hr className="w-full border-t-1 border-red-400" />
                <span className="mx-2 text-md text-gray-600 font-semibold">
                  ឬ
                </span>
                <hr className="w-full border-t-1 border-red-400" />
              </div> */}
            </Form>
          </Formik>
          {/* Login with Facebook and Google */}
          {/* <div className="flex flex-col space-y-4 mt-4">
            <button className="flex items-center justify-center w-full px-5 py-2.5 rounded-lg ring-2 ring-[#222162] ring-inset text-gray-500 bg-white text-lg font-semibold hover:bg-[#222162] hover:text-white group transition duration-300 ease-in-out">
              <FaFacebook className="mr-2 text-blue-700 group-hover:text-white transition duration-300 ease-in-out" />
              ចូលជាមួយ Facebook
            </button>
            <div className="relative">
              {!googleLoginVisible ? (
                <button
                  onClick={() => setGoogleLoginVisible(true)}
                  className="flex items-center justify-center w-full px-5 py-2.5 rounded-lg ring-2 ring-[#222162] ring-inset text-gray-500 bg-white text-lg font-semibold hover:bg-[#222162] hover:text-white transition duration-300 ease-in-out"
                >
                  <FcGoogle className="mr-2 transition duration-300 ease-in-out" />
                  ចូលជាមួយ Google
                </button>
              ) : (
                <LoginWithGoogle
                  onLoginSuccess={handleGoogleLoginSuccess}
                  onLoginFailure={handleGoogleLoginFailure}
                />
              )}
            </div>
          </div> */}
        </section>
      </section>
    </section>
  );
}
