"use client"
import { registerUser, setError } from "@/lib/store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-hot-toast";

const page = () => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [data, setData] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const {isLoading, error} = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await dispatch(registerUser({ username: data.username, email: data.email, password: data.password })); 
    if(result?.success){
      router.replace("/login");
      toast.success("Registration successful. Please log in.");
      setData({
        username: "",
        email: "",
        password: "",
      });
    } else {
      toast.error(error || "Registration failed. Please try again.");
      setInterval(() => {},3000);
      dispatch(setError(null))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <div className="max-w-md bg-white w-full shadow-md p-4">
        <div className="flex flex-col space-y-4">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-center">
              Create Your Account
            </h1>
          </div>
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="Username" className="text-sm block">
                  Username
                </label>
                <div className="flex border border-gray-300 px-4 py-2.5">
                  <input
                    type="text"
                    id="Username"
                    name="username"
                    value={data.username}
                    onChange={handleInputChange}
                    placeholder="Enter your username"
                    className="focus-within:outline-none w-full"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label htmlFor="email" className="text-sm block">
                  Email
                </label>
                <div className="flex border border-gray-300 px-4 py-2.5">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={data.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="focus-within:outline-none w-full"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label htmlFor="password" className="text-sm block">
                  Password
                </label>
                <div className="flex border border-gray-300 px-4 py-2.5">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={data.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="focus-within:outline-none w-full"
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className="ml-2"
                  >
                    {passwordVisible ? (
                      <EyeOff size={18} className="text-gray-500" />
                    ) : (
                      <Eye size={18} className="text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`bg-green-800 w-full py-2.5 px-4 text-gray-100 hover:bg-green-900 transition-colors cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-400`}
                >
                  {isLoading ? "Signing Up..." : "Sign Up"}
                </button>
              </div>
              <div>
                <p className="text-sm text-center">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="text-green-800 hover:underline"
                  >
                    Sign In
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
