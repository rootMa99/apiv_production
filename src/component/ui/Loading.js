import c from "./Loading.module.css";
import logo from "../../assets/aptiv_logo_rev_orange_rgb.png";

const Loading = (p) => {
  const classes = p.dataCome ? `${c.img} ${c.out}` : `${c.img} ${c.in}`;

  return (
    <div className={c.imageHolder}>
      <img src={logo} alt="logo loading" className={classes} />
    </div>
  );
};

export default Loading;
