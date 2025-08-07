import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map((c) => {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
        );
        const { email } = JSON.parse(jsonPayload);
        setEmail(email);
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded">
      <h1 className="text-3xl font-bold text-blue-600 mb-2">Welcome to your Dashboard!</h1>
      <p className="text-lg text-gray-700">
        Hello, <span className="font-semibold text-black">{email}</span> 👋
      </p>
      <p className="text-sm text-gray-500 mt-2">You are successfully logged in!</p>
    </div>
  );
}
