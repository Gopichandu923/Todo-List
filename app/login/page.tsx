"use client";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext.js";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, user } = useAuth();
  const Router = useRouter();

  const handleLogin = async (e) => {
    console.log(email, password, user);
    e.preventDefault();
    try {
      await signIn(email, password);
      Router.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex justify-center items-center flex-col">
      <h1>Login Here</h1>
      <form>
        <label htmlFor="email"></label>
        <input
          type="email"
          value={email}
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        ></input>{" "}
        <br />
        <br />
        <label htmlFor="password"></label>
        <input
          type="password"
          value={password}
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>{" "}
        <br />
        <br />
        <button onClick={handleLogin}>Sign in</button>
      </form>
    </div>
  );
};

export default Login;
