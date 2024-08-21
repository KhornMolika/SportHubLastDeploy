import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function LoginWithGoogle({ onLoginSuccess, onLoginFailure }) {
  const [generatedPassword, setGeneratedPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const secretPassword = import.meta.env.VITE_SECRET_PASSWORD;
  const adminToken = import.meta.env.VITE_ADMIN_TOKEN;

  const handleGoogleLogin = (response) => {
    if (response.credential) {
      const decoded = jwtDecode(response.credential);

      // Generate username
      const username = decoded.email.split("@")[0];

      // Combine username and secret password
      const password = username + secretPassword;
      const confirmPassword = password;

      // Save the generated password for later use (e.g., display to user)
      setGeneratedPassword(password);

      // Send the decoded user information to your API
      fetch("http://136.228.158.126:50003/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: decoded.email,
          name: decoded.name,
          googleId: decoded.sub,
          username,
          password,
          confirmPassword,
        }),
      })
        .then((response) => response.json())
        .then((data) => {

          if (data.results && data.results.length > 0) {
            data.results.forEach((user) => user.id);
          }

          if (data.status === 201) {
            onLoginSuccess(data);

            // Navigate to the VerifyEmail page after successful login
            navigate("/verify-email", { state: decoded.email });
          } else {
            onLoginFailure();
          }
        })
        .catch((error) => {
          console.error("Error creating user in API:", error);
          onLoginFailure();
        });
    } else {
      onLoginFailure();
    }
  };

  return (
    <div className="flex items-center justify-center w-full px-5 py-2.5 rounded-lg ring-2 ring-[#222162] ring-inset bg-white hover:bg-[#222162] transition duration-300 ease-in-out">
      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={() => onLoginFailure()}
        className="w-full text-lg font-semibold text-gray-500 hover:text-white transition duration-300 ease-in-out"
      />
    </div>
  );
}
