import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";

const Login = () => {
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //API Call
    const response = await fetch("http://127.0.0.1:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      //Save the auth token and redirect
      localStorage.setItem("token", json.authToken);
      toast.success("Logged In Successfully");
      navigate("/");
    } else {
      toast.error("Invalid Credentials");
    }
  };
  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="mt-10 items-center flex justify-center  ">
      <form
        className="border rounded-md w-[400px] p-10 shadow"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl mb-6">Login to continue to iNotebook</h1>
        <div className="grid gap-1 mb-3">
          <Label htmlFor="email">Email</Label>
          <Input
            value={credentials.email}
            name="email"
            onChange={onChange}
            type="email"
            id="email"
            placeholder="Enter email"
            required
          />
        </div>
        <div className="grid gap-1 mb-3">
          <Label htmlFor="password">Password</Label>
          <Input
            value={credentials.password}
            name="password"
            onChange={onChange}
            type="password"
            id="password"
            placeholder="Enter Password"
            required
          />
        </div>
        <Button type="submit" className="hover:cursor-pointer w-full mb-3">
          Login
        </Button>
        <h1>
          Don't have an account?{" "}
          <Link to="/signup" className="text-red-500 hover:underline">
            SignUp
          </Link>
        </h1>
      </form>
    </div>
  );
};

export default Login;
