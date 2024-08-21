import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  fetchVerifyEmail,
  fetchResendOTP, // Import the action for resending OTP
  selectVerifyEmail,
} from "../../../redux/feature/user/userSlice";
import toast, { Toaster } from "react-hot-toast";

export default function VerifyEmail() {
  const location = useLocation();
  const email = location?.state;
  const dispatch = useDispatch();
  const verifyResponse = useSelector(selectVerifyEmail);
  const navigate = useNavigate();

  const emptyOTP = ["", "", "", "", "", ""];
  const refs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];
  const [inputs, setInputs] = useState(emptyOTP);
  const [attemptedVerification, setAttemptedVerification] = useState(false);

  useEffect(() => {
    refs[0].current.focus();
  }, []);

  const validationSchema = Yup.object().shape({
    otp_code: Yup.string()
      .required("កូដ OTP ចាំបាច់ត្រូវបញ្ចូល")
      .length(6, "ត្រូវបញ្ចូលកូដ OTP ទាំង ៦ ខ្ទង់"),
  });

  const handleInputChange = (e, index, setFieldValue) => {
    const val = e.target.value;
    if (!/^[0-9]$/.test(val)) return; // Only allow numeric values
    if (index < inputs.length - 1) {
      refs[index + 1].current.focus();
    }
    const copyInputs = [...inputs];
    copyInputs[index] = val;
    setInputs(copyInputs);
    setFieldValue("otp_code", copyInputs.join(""));
  };

  const handleOnKeyDown = (e, index) => {
    if (e.keyCode === 8) {
      const copyInputs = [...inputs];
      copyInputs[index] = "";
      setInputs(copyInputs);
      if (index > 0) {
        refs[index - 1].current.focus();
      }
    }
  };

  const handleResendOTP = () => {
    dispatch(fetchResendOTP({ email }));
    toast.success("កូដ OTP ត្រូវបានផ្ញើរទៅកាន់អ៊ីម៉ែលរបស់អ្នក!");
  };

  useEffect(() => {
    if (
      attemptedVerification &&
      verifyResponse &&
      verifyResponse.status !== undefined
    ) {
      if (verifyResponse?.status === 200) {
        toast.success("អ៊ីមែលបានផ្ទៀងផ្ទាត់ដោយជោគជ័យ!");
        navigate("/login");
      } else {
        toast.error("កូដ OTP មិនត្រឹមត្រូវ, សូមព្យាយាមម្ដងទៀត!");
      }
      setAttemptedVerification(false); // Reset the flag after handling the response
    }
  }, [verifyResponse, attemptedVerification, navigate]);

  return (
    <section className="w-full flex justify-center items-center min-h-screen bg-[#222162]">
      <Toaster position="top-right" reverseOrder={true} />
      <div className="w-auto text-center p-4 sm:p-6 bg-zinc-200 rounded-md focus:outline-none">
        <h2 className="mt-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#222162] font-semibold">
          OTP Authentication
        </h2>
        <p className="mt-4 text-md sm:text-sm md:text-md lg:text-lg text-slate-800">
          បញ្ចូលលេខកូដ ៦ ខ្ទង់ដែលបានផ្ញើរទៅកាន់អុីម៉ែលរបស់អ្នក
        </p>
        <Formik
          initialValues={{ otp_code: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            setAttemptedVerification(true);
            dispatch(fetchVerifyEmail({ email, otp_code: values.otp_code }));
            resetForm();
          }}
        >
          {({ setFieldValue }) => (
            <Form>
              <div className="mt-6 flex justify-center space-x-1 sm:space-x-2">
                {emptyOTP.map((_, i) => (
                  <Field
                    key={i}
                    innerRef={refs[i]}
                    name="otp_code"
                    maxLength="1"
                    value={inputs[i]}
                    onChange={(e) => handleInputChange(e, i, setFieldValue)}
                    onKeyDown={(e) => handleOnKeyDown(e, i)}
                    className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 xl:w-16 xl:h-16  font-bold text-center rounded-md border-2 ${
                      inputs[i] === "" ? "border-red-500" : "border-gray-300"
                    } focus:border-blue-500 focus:outline-none`}
                  />
                ))}
              </div>
              <ErrorMessage
                name="otp_code"
                component="div"
                className="text-red-700 text-sm mt-2"
              />
              <button
                type="submit"
                className="text-base font-semibold mt-6 h-10 min-h-[40px] sm:min-h-[48px] md:min-h-[56px] xl:min-h-[72px] w-5/6 sm:w-5/6 md:w-5/6 lg:w-5/6 xl:w-5/6  bg-[#222162] text-white rounded focus:outline-none cursor-pointer"
              >
                ផ្ទៀងផ្ទាត់
              </button>
            </Form>
          )}
        </Formik>
        <h1 className="mt-6 mb-2 font-semibold text-md text-gray-800">
          មិនទទួលបាន OTP ?​{" "}
          <span
            onClick={handleResendOTP}
            className="underline text-[#2e2d89] cursor-pointer"
          >
            ផ្ញើរម្តងទៀត
          </span>
        </h1>
      </div>
    </section>
  );
}
