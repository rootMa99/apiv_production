import c from "./Loading.module.css";
import logo from "../../assets/aptiv_logo_rev_orange_rgb.png";

const Loading = (p) => {
  return (
    <div className={c.imageHolder}>
      <img src={logo} alt="logo loading" />
    </div>
  );
};

export default Loading;
