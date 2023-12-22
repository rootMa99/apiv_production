import { useDispatch, useSelector } from "react-redux";
import c from "./Home.module.css";
import Efficiency from "./home/Efficiency";
import { Outlet, useParams } from "react-router-dom";
import { additionalDataAction } from "../store/AdditionalData";

const Home = (p) => {
  const data = useSelector((s) => s.datas);
  const day = useSelector((s) => s.additionalData);
  const dispatch = useDispatch();
  const { project } = useParams();

  const month = day.month[day.date.split("-")[1] - 1];
  console.log(data, project);

  return (
    <div className={c.container}>
      <div className={c.content}>
        <div className={c.labelCheck}>
          <label className={c["cyberpunk-checkbox-label"]}>
            <input
              type="checkbox"
              className={c["cyberpunk-checkbox"]}
              checked={day.checkBox}
              onChange={() =>
                dispatch(additionalDataAction.editCheckBox(!day.checkBox))
              }
            />
            esa
          </label>
            <p className={c.plabelCheck} >
              (by cheking this checkbox all efficiencies will be displayed as esa efficiency.)*
            </p>
        </div>
        {project === undefined && (
          <Efficiency
            singleProject={project !== undefined ? project : ""}
            day={day.date}
            month={month}
            title="plant"
          />
        )}
        <Efficiency
          singleProject={project !== undefined ? project : ""}
          day={day.date}
          month={month}
          title="eff fa"
        />
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
