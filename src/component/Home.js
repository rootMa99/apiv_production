import { useSelector } from "react-redux";
import c from "./Home.module.css";
import Efficiency from "./home/Efficiency";
import Projects from "./home/Projects";

const Home = (p) => {
  const data= useSelector(s=>s.datas);

  console.log(data);

  return (
    <div className={c.container}>
      <div className={c.content}>
        <Efficiency />
        <Projects />
      </div>
    </div>
  );
};

export default Home;
