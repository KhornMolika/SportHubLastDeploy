import { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import registerImg from "../../../assets/SportHubLogo.png";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCreateUser,
  selectUser,
} from "../../../redux/feature/user/userSlice";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import logo from "../../../assets/SportHubLogoWhite.png";

const strongPasswordregex =
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

const initialValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required("ឈ្មោះអ្នកប្រើប្រាស់ចាំបាច់ត្រូបញ្ចូល"),
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
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("password"), null],
      "ពាក្យសម្ងាត់សម្រាប់ផ្ទៀងផ្ទាត់ត្រូវដូចពាក្យសម្ងាត់ខាងលើ"
    )
    .required("ពាក្យសម្ងាត់សម្រាប់ផ្ទៀងផ្ទាត់ចាំបាច់ត្រូវបញ្ចូល"),
});

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const userResponse = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState();

  useEffect(() => {
    if (userResponse?.status === 201) {
      navigate("/verify-email", { state: email });
    } else if (userResponse?.status === 409) {
      toast.error(userResponse?.message);
    }
  }, [userResponse?.status, navigate]);

  const handleGetEmail = (e, setFieldValue) => {
    setEmail(e.target.value);
    setFieldValue("email", e.target.value);
  };

  const handleNavigateToLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <section className="w-full h-screen flex justify-center items-center flex-col mx-auto px-4 sm:px-6 bg-[#222162]">
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
            <h2 className="text-center text-xl sm:text-2xl md:text-4xl text-[#222162] font-bold">
              ចុះឈ្មោះ
            </h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(value, { resetForm }) => {
                dispatch(fetchCreateUser(value));
                resetForm();
              }}
            >
              {({ setFieldValue }) => {
                return (
                  <Form>
                    <section className="w-[280px] lg:w-[320px] h-full flex items-center flex-col">
                      <div className="relative-label mt-5">
                        <div className="relative w-[280px] lg:w-[320px] h-[50px] flex items-center">
                          <Field
                            type="text"
                            id="username"
                            name="username"
                            className="w-full h-full text-sm font-medium bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-white focus:border-[#222162] focus:ring-2 block pr-10 p-2.5 peer"
                            placeholder=" "
                          />
                          <label
                            htmlFor="username"
                            className="absolute top-0 left-0 text-gray-500 text-sm transition-transform duration-300 ease-in-out"
                          >
                            ឈ្មោះ​អ្នកប្រើប្រាស់
                          </label>
                          <FaUser className="absolute right-3 text-[#222162]" />
                        </div>
                        <ErrorMessage
                          component="div"
                          name="username"
                          className="text-red-700 text-xs"
                        />
                      </div>

                      <div className="relative-label mt-4">
                        <div className="relative w-[280px] lg:w-[320px] h-[50px] flex items-center">
                          <Field
                            type="email"
                            id="email"
                            name="email"
                            className="w-full h-full text-sm font-medium bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-white focus:border-[#222162] focus:ring-2 block pr-10 p-2.5 peer"
                            placeholder=" "
                            onChange={(e) => handleGetEmail(e, setFieldValue)}
                          />
                          <label
                            htmlFor="email"
                            className="absolute top-0 left-0 text-gray-500 text-sm transition-transform duration-300 ease-in-out"
                          >
                            អ៊ីមែល
                          </label>
                          <MdEmail className="absolute right-3 text-[#222162]" />
                        </div>
                        <ErrorMessage
                          component="div"
                          name="email"
                          className="text-red-700 text-sm"
                        />
                      </div>

                      <div className="relative-label mt-4 flex flex-col justify-center">
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

                      <div className="relative-label mt-4 flex flex-col justify-center">
                        <div className="relative w-[280px] lg:w-[320px] h-[50px] flex items-center">
                          <Field
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            className="w-full h-full text-sm font-medium bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-white focus:border-[#222162] focus:ring-2 block pr-10 p-2.5 peer"
                            placeholder=" "
                          />
                          <label
                            htmlFor="confirmPassword"
                            className="absolute top-0 left-0 text-gray-500 text-sm transition-transform duration-300 ease-in-out"
                          >
                            បញ្ជាក់ពាក្យសម្ងាត់
                          </label>
                          {showConfirmPassword ? (
                            <FaEye
                              className="absolute right-3 text-[#222162] cursor-pointer"
                              onClick={() => setShowConfirmPassword(false)}
                            />
                          ) : (
                            <FaEyeSlash
                              className="absolute right-3 text-[#222162] cursor-pointer"
                              onClick={() => setShowConfirmPassword(true)}
                            />
                          )}
                        </div>
                        <ErrorMessage
                          component="div"
                          name="confirmPassword"
                          className="text-red-700 text-sm"
                        />
                      </div>

                      <div className="flex flex-col p-0 justify-center items-center">
                        <button
                          type="submit"
                          className="w-[280px] lg:w-[320px] h-[50px] text-white bg-[#222162] font-semibold text-lg rounded-lg px-5 py-2.5 mt-5 focus:outline-none hover:bg-[#27268a] transition duration-300 ease-in-out flex justify-center items-center mx-auto"
                        >
                          ចុះឈ្មោះ
                        </button>
                        <p className="text-base text-gray-800 font-semibold mt-5">
                          មានគណនីរួចហើយ?{" "}
                          <span
                            onClick={handleNavigateToLogin}
                            className="text-blue-600 cursor-pointer hover:underline"
                          >
                            ចូលគណនី
                          </span>
                        </p>
                      </div>
                    </section>
                  </Form>
                );
              }}
            </Formik>
          </section>
        </section>
      </section>
    </>
  );
}
