import { useState } from "react";
import c from "./Login.module.css";
import { useDispatch } from "react-redux";
import { additionalDataAction } from "../../store/AdditionalData";

const getData =  async (uri, body) => {
  try {
    const response = await fetch(uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers you may need
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};


const Login = (p) => {
  const dispatch=useDispatch();
  const [cred, setCred] = useState({
    adminName: "",
    adminPassword: "",
  });

  const submitHandler =async (e) => {
    e.preventDefault();
    if (cred.adminName.trim()==="" || cred.adminPassword.trim()===""){
      alert("please make sure all field not empty");
      return;
    }
    const body={
      adminName:cred.adminName,
      password:cred.adminPassword
    };
    try{
      const data=await getData("http://localhost:8081/auth/signin", body);
      console.log(data)
      dispatch(additionalDataAction.isLoggin(data.token))
    }catch (e) {
      console.log(e)
    }
  };
  const adminNameHandler = (e) => {
    setCred((prev) => ({
        ...prev,
        adminName:e.target.value
    }));
  };
  const passwordHandler = (e) => {
    setCred((prev) => ({
        ...prev,
        adminPassword:e.target.value
    }));
  };

  return (
    <form className={c["Form-container"]} onSubmit={submitHandler}>
      <h2 className={c["login-title"]}> Login </h2>

      <div>
        <div id="error" className={c["error-message"]}></div>
      </div>

      <div className={c["user-container"]}>
        <input
          type="text"
          name="matricule"
          placeholder="Admin Name"
          className={c["username"]}
          onChange={adminNameHandler}
          value={cred.adminName}
        />
      </div>

      <div className={c["password-container"]}>
        <input
          type="password"
          name="password"
          placeholder="Admin Password"
          className={c["userpassword"]}
          onChange={passwordHandler}
          value={cred.adminPassword}
        />
      </div>

      <button className={c["Login"]}>Submmit</button>
    </form>
  );
};

export default Login;
