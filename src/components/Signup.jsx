import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";

const Signup = () => {
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //API Call
    const response = await fetch(
      "https://e-notebook-backend-virid.vercel.app/api/auth/createUser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        }),
      }
    );
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //Save the auth token and redirect
      localStorage.setItem("token", json.authToken);
      navigate("/");
      toast.success("Account Created");
    } else {
      toast.error("Invalid details");
    }
  };
  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="mt-10 items-center flex justify-center">
      <form
        className="border rounded-md w-[400px] p-10 shadow"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl mb-6">Create an account to use CloudNotes</h1>
        <div className="grid gap-1 mb-3">
          <Label htmlFor="name">Name</Label>
          <Input
            value={credentials.name}
            name="name"
            onChange={onChange}
            type="text"
            id="name"
            required
            minLength={5}
            placeholder="Enter Name"
          />
        </div>
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
            minLength={8}
          />
        </div>
        <Button type="submit" className="hover:cursor-pointer w-full mb-3">
          Create Account
        </Button>
        <h1>
          Already have an account?{" "}
          <Link to="/login" className="text-red-500 hover:underline">
            Login
          </Link>
        </h1>
      </form>
    </div>
  );
};

export default Signup;
