"use client";
const Register = () => {
  const handleLogin = () => {};
  return (
    <div className="flex justify-center ">
      <h1>Register Here</h1>
      <div>
        <form>
          <input type="email" placeholder="Enter your email"></input>
          <input type="password" placeholder="Enter the password"></input>
          <input type="password" placeholder="Re-Enter the password"></input>
          <button onClick={handleLogin}>Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
