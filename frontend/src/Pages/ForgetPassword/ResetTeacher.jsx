
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const ResetTeacher = () => {
  const [data, setData] = useState({
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [ConfirmshowPassword, ConfirmsetShowPassword] = useState(false);

  const navigate = useNavigate();
  const { token } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { password, confirmPassword } = data;

    // Validation
    if (!password || !confirmPassword) {
      toast.error("Both fields are required");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      toast.error("Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.");
      return;
    }

    try {
      const responsePromise = axios.post(`/api/teacher/forgetpassword/${token}`, {
        password: data.password,
        confirmPassword: data.confirmPassword
      });

      toast.promise(responsePromise, {
        loading: "Wait for processing...",
        success: (res) => res?.data?.message || "Password updated successfully!",
        error: "Time limit reached. Try again."
      });

      const response = await responsePromise;

      if (response.data.success) {
        navigate('/login');
      }

    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="h-[100vh] flex items-center justify-center">
      <form
        noValidate
        onSubmit={handleSubmit}
        className="w-[27rem] text-xl bg-cyan-900 p-12 shadow-[0_0_10px_white] flex flex-col gap-5 text-white font-semibold rounded-md"
      >
        <h1 className="font-semibold text-center text-xl mb-3 text-white">
          This link is valid for 15 mins otherwise password will not be updated
        </h1>

        {/* Password */}
        <label htmlFor="password" className="text-1xl text-white font-semibold rounded-md">
          New Password
        </label>
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password..."
            value={data.password}
            onChange={handleChange}
            className="w-full bg-transparent border-2 border-white py-3 px-4 focus:outline-none focus:border-yellow-500 rounded-lg"
          />
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-300"style={{display:"flex", justifyContent:"end",marginTop:"7px"}}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Confirm Password */}
        <label htmlFor="confirmPassword" className="text-1xl text-white font-semibold rounded-md">
          Confirm Password
        </label>
        <div className="relative w-full">
          <input
            type={ConfirmshowPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm your password..."
            value={data.confirmPassword}
            onChange={handleChange}
            className="w-full bg-transparent border-2 border-white py-3 px-4 focus:outline-none focus:border-yellow-500 rounded-lg"
          />
          <button
            type="button"
            onClick={() => ConfirmsetShowPassword(prev => !prev)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-300 "style={{display:"flex", justifyContent:"end",marginTop:"7px"}}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-5 bg-yellow-500 text-cyan-900 py-2 px-4 rounded-lg font-semibold hover:bg-yellow-600 transition duration-300"
        >
          Submit
        </button>

        <p className="text-sm text-red-400">
          * Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.
        </p>
      </form>
    </div>
  );
};

export default ResetTeacher;

