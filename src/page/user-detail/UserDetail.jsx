import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { getAccessToken } from "../../lib/secureLocalStorage";
import { updateUserProfile } from "../../redux/feature/user/userSlice";
import toast, { Toaster } from "react-hot-toast";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";

const validationSchema = Yup.object({
  first_name: Yup.string(),
  last_name: Yup.string(),
  username: Yup.string(),
  email: Yup.string().email("Invalid email"),
  gender: Yup.string().oneOf(["M", "F"], "Invalid gender"),
  web: Yup.string().url("Invalid URL"),
  biography: Yup.string(),
  phone_number: Yup.string().matches(/^\d+$/, "Phone number is not valid"),
  contact_info: Yup.string(),
  location: Yup.string(),
  social: Yup.array()
    .of(
      Yup.object({
        url: Yup.string().url("Invalid URL"),
      })
    )
    .nullable(),
});

export default function UserDetail() {
  const location = useLocation();
  const dispatch = useDispatch();
  const profile = location.state;
  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_BASE_URL.replace(/^http:/, "https:");
  const endPointOfUserProfile = import.meta.env.VITE_GET_USER_PROFILE;
  const [imageSelected, setImageSelected] = useState(false);
  const [profileData, setProfileData] = useState(profile || {});
  const [selectedImage, setSelectedImage] = useState(
    profileData.profile_image || "https://via.placeholder.com/150"
  );
  const [initialImage, setInitialImage] = useState(
    profileData.profile_image || "https://via.placeholder.com/150"
  );
  const [isImageUpdated, setIsImageUpdated] = useState(false);
  const [showRemoveButton, setShowRemoveButton] = useState(false);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const accessToken = getAccessToken();
      if (!accessToken) {
        console.error("Access token not available");
        return;
      }

      const response = await axios.get(`${baseUrl}${endPointOfUserProfile}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setProfileData(response.data);
      setInitialImage(
        response.data.profile_image || "https://via.placeholder.com/150"
      );
      setSelectedImage(
        response.data.profile_image || "https://via.placeholder.com/150"
      );
    } catch (error) {
      console.error(
        "Error fetching profile data:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleNavigateBack = () => {
    navigate(-1);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
      setIsImageUpdated(true);
    }
  };

  const handleImageRemove = () => {
    setSelectedImage(initialImage);
    setIsImageUpdated(false);
  };

  const handleSubmit = async (values, { setSubmitting }) => {

    try {
      const formattedDob = values.dob
        ? format(new Date(values.dob), "yyyy-MM-dd")
        : null;

      const updatedProfile = {
        first_name: values.first_name || "",
        last_name: values.last_name || "",
        username: `${values.first_name}${values.last_name}` || "",
        email: values.email || "",
        gender: values.gender || "",
        dob: formattedDob,
        biography: values.biography || "",
        phone_number: values.phone_number || "",
        contact_info: values.contact_info || "",
        location: values.location || "",
        social_links: values.social.length ? values.social[0].url : null, // Use only the first URL
        profile_image:
          isImageUpdated && selectedImage !== "https://via.placeholder.com/150"
            ? selectedImage
            : initialImage,
      };


      const accessToken = getAccessToken();
      if (!accessToken) {
        console.error("Access token not available");
        return;
      }

      const response = await axios.put(
        `${baseUrl}${endPointOfUserProfile}`,
        updatedProfile,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response.data.message);
      dispatch(updateUserProfile(response.data));

      // Fetch updated profile data
      fetchProfileData();
      navigate("/view-profile");
      // window.location.reload();
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <main className="flex flex-col lg:flex-row items-center justify-center lg:justify-start">
        <Toaster position="top-right" reverseOrder={true} />
        <section className="flex items-center justify-center lg:h-screen lg:w-[50%] relative mt-20 lg:mt-0 lg:ml-[-380px] lg:bottom-[-10px]">
          <div className="bg-[#172554] h-[30vh] w-[30vh] lg:h-[100vh] lg:w-[100vh] rounded-full flex items-center justify-center">
            <img
              src={selectedImage}
              alt="Profile"
              className="h-[30vh] w-[30vh] object-cover rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:w-[320px] lg:h-[320px] lg:translate-x-[200px] lg:border-white lg:border-[20px]"
            />
          </div>
        </section>
        <section className="lg:h-screen flex flex-col justify-center items-start lg:w-[50%] text-left p-4 lg:p-0 lg:ml-72 xl:ml-56">
          <Formik
            enableReinitialize
            initialValues={{
              first_name: profileData.first_name || "",
              last_name: profileData.last_name || "",
              username: profileData.username || "",
              email: profileData.email || "",
              gender: profileData.gender || "",
              dob: profileData.dob
                ? format(new Date(profileData.dob), "yyyy-MM-dd")
                : "",
              biography: profileData.biography || "",
              phone_number: profileData.phone_number || "",
              contact_info: profileData.contact_info || "",
              location: profileData.location || "",
              social: profileData.social_links
                ? [{ url: profileData.social_links }]
                : [],
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="first_name"
                    >
                      នាមត្រកូល
                    </label>
                    <Field
                      type="text"
                      name="first_name"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <ErrorMessage
                      name="first_name"
                      component="div"
                      className="text-red-500 text-xs italic"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="last_name"
                    >
                      ឈ្មោះ
                    </label>
                    <Field
                      type="text"
                      name="last_name"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <ErrorMessage
                      name="last_name"
                      component="div"
                      className="text-red-500 text-xs italic"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="gender"
                    >
                      ភេទ
                    </label>
                    <Field
                      as="select"
                      name="gender"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="">ជ្រើសរើសភេទ</option>
                      <option value="M">ប្រុស</option>
                      <option value="F">ស្រី</option>
                    </Field>
                    <ErrorMessage
                      name="gender"
                      component="div"
                      className="text-red-500 text-xs italic"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="dob"
                    >
                      ថ្ងៃខែឆ្នាំកំណើត
                    </label>
                    <Field
                      type="date"
                      name="dob"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <ErrorMessage
                      name="dob"
                      component="div"
                      className="text-red-500 text-xs italic"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="phone_number"
                    >
                      លេខទូរស័ព្ទ
                    </label>
                    <Field
                      type="text"
                      name="phone_number"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <ErrorMessage
                      name="phone_number"
                      component="div"
                      className="text-red-500 text-xs italic"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="location"
                    >
                      ទីតាំង
                    </label>
                    <Field
                      type="text"
                      name="location"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>

                  <div className="mb-4 col-span-1 md:col-span-2 lg:col-span-3">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="social"
                    >
                      Facebook
                    </label>
                    <Field
                      type="text"
                      name="social[0].url"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Facebook URL"
                    />
                    <ErrorMessage
                      name="social[0].url"
                      component="div"
                      className="text-red-500 text-xs italic"
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="profile_image"
                  >
                    រូបថត
                  </label>
                  <div className="flex flex-col md:flex-row md:space-y-0 space-y-2 gap-3">
                    <input
                      id="profile_image"
                      type="file"
                      name="profile_image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        document.getElementById("profile_image").click()
                      }
                      className="md:w-[20%] w-full font-bold border-blue-500 border-2 bg-transparent hover:border-transparent hover:bg-blue-500 hover:text-white text-blue-500 py-2 px-4 rounded mt-2 flex justify-center items-center gap-2"
                    >
                      ផ្លាស់ប្ដូរ
                      <FaRegEdit />
                    </button>
                    {selectedImage !== initialImage && (
                      <button
                        type="button"
                        className="md:w-[20%] w-full font-bold border-red-500 border-2 bg-transparent hover:border-transparent hover:bg-red-500 hover:text-white text-red-500 py-2 px-4 rounded mt-2 flex justify-center items-center gap-2"
                        onClick={handleImageRemove}
                      >
                        លុប
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="border-green-500 border-2 bg-transparent hover:border-transparent hover:bg-green-500 hover:text-white text-green-500 font-bold py-1 px-4 rounded mt-5 lg:mt-3"
                  >
                    រក្សាទុក
                  </button>
                  <button
                    onClick={() => handleNavigateBack()}
                    className="border-red-500 border-2 bg-transparent hover:border-transparent hover:bg-red-500 hover:text-white text-red-500 font-bold py-1 px-4 rounded mt-5 lg:mt-3"
                  >
                    ថយក្រោយ
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </section>
      </main>
    </>
  );
}
