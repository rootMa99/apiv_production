import { useSelector } from "react-redux";
import c from "./Admin.module.css";
import Login from "./Login";

const Admin=p=>{
    const { login } = useSelector((s) => s.additionalData);


    return(
        <div className={c.wrapper} >
            <h1 className={c.header}>Admin Page</h1>

            {
                !login.isLogged && <Login />
            }
        </div>
    )
}
export default Admin;