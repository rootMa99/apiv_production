import { useSelector } from "react-redux";
import c from "./Home.module.css";
import Efficiency from "./home/Efficiency";
import Projects from "./home/Projects";
import { useState } from "react";


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
  const [day, setDay] = useState("2023-11-27");
  const changeDay=d=>{
    setDay(d);
  }
  const month = MONTH[day.split("-")[1]-1];
  console.log(data);

  return (
    <div className={c.container}>
      <div className={c.content}>
        <Efficiency singleProject="" day={day} month={month} changeDay={changeDay}/>
        <Projects data={data} day={day} month={month} />
      </div>
    </div>
  );
};

export default Home;
