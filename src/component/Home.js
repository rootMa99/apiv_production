import { useSelector } from "react-redux";
import c from "./Home.module.css";
import Efficiency from "./home/Efficiency";
import { Outlet, useParams } from "react-router-dom";



const Home = (p) => {
  const data = useSelector((s) => s.datas);
  const day= useSelector(s=>s.additionalData);
  const { project } = useParams();

  const month = day.month[day.date.split("-")[1] - 1];
  console.log(data);

  return (
    <div className={c.container}>
      <div className={c.content}>
        <Efficiency singleProject={project!==undefined ? project : ""} day={day.date} month={month} />
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
