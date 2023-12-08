import { useSelector } from "react-redux";
import c from "./Home.module.css";
import Efficiency from "./home/Efficiency";
import Projects from "./home/Projects";
import { Route, Routes } from "react-router-dom";

import ProjectDetails from "./projects/ProjectDetails";


const MONTH = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Home = (p) => {
  const data= useSelector(s=>s.datas);
  const day="2023-11-23";
  const month = MONTH[day.split("-")[1]-1];
  console.log(data);

  return (
    <div className={c.container}>
      <div className={c.content}>
        <Efficiency singleProject="" day={day} month={month}/>
        <Projects data={data} day={day} month={month} />
        <Routes>
          <Route exact path="/home/project" >
            <Route exact path=":project" element={<ProjectDetails />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default Home;
