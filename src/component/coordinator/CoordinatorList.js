import c from "./Coordinators.module.css";
import fa from "../../assets/managerbr.png";
import Coordinator from "./Coordinator";
import { useDispatch, useSelector } from "react-redux";
import {
  faData,
  getCoordinatorData,
  getCoordinatorsData,
} from "../hooks/coordinatorDataFilters";
import React, { useState } from "react";
//import { additionalDataAction } from "../../store/AdditionalData";
import Select from "react-select";
import { additionalDataAction } from "../../store/AdditionalData";
import CoordinatorChart from "./CoordinatorCharts";
//import logo from "../../assets/aptiv_logo_rev_orange_rgb.png";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: "100%",
    height: "3rem",
    fontWeight: "600",
    textTransform: "uppercase",
    borderRadius: "5px",
    fontFamily: `Formular, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
              "Segoe UI Symbol"`,
    letterSpacing: "2px",
    textAlign: "center",
    outline: "none",
    border: "2px solid #f4dfc8",
    backgroundColor: "rgba(24, 13, 13, 0.37)",
    boxShadow: "none",
    "&:hover": {
      border: "2px solid rgb(255, 255, 255)",
      backgroundColor: "rgba(100, 98, 98, 0.37)",
      cursor: "pointer",
    },
  }),
  option: (provided, state) => ({
    width: "100%",
    padding: "0.5rem",
    color: state.isFocused ? "#f3f3f3" : "#474b4d",
    backgroundColor: state.isFocused && "#474b4d",
    fontFamily: `Formular, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
              "Segoe UI Symbol"`,
    textTransform: "uppercase",
    outline: "none",
    "&:hover": {
      cursor: "pointer",
    },
  }),
  input: (provided) => ({
    ...provided,
    color: "#f3f3f3",
  }),
  singleValue: (p) => ({
    ...p,
    color: "#f3f3f3",
  }),
  menuList: (provided) => ({
    maxHeight: "350px",
    overflowY: "auto",
    overflowX: "hidden",
    scrollbarWidth: "thin",
    msOverflowStyle: "none",
    "&::-webkit-scrollbar": {
      width: "9px",
      backgroundColor: "#535151",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#8a0101",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
    },
  }),
};
const options = [
  { value: "date", label: "yesterday" },
  { value: "week", label: "last week" },
  { value: "month", label: "last month" },
];
const CoordinatorList = (p) => {
  const data = useSelector((s) => s.datas);
  const { date } = useSelector((s) => s.additionalData);
  //const dispatch = useDispatch();
  const coordinators = getCoordinatorsData(data);
  const [type, setType] = useState({ value: "date", label: "yesterday" });
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  dispatch(additionalDataAction.editCheckBox(false));
  const datafa = faData(coordinators);

  // useEffect(() => {
  //   console.log("console log coordinator re run");
  //   dispatch(additionalDataAction.addCoordinator(coordinators));
  // }, [dispatch, coordinators]);


  const clickHadler = (e) => {
    setShow(!show);
  };
  const dataFa = getCoordinatorData(coordinators);
  return (
    <div className={`${c.wrapper}`}>
      <div className={c.select}>
        {show ? (
          <React.Fragment>
            <input
              className={c.titles}
              type="date"
              value={date}
              onChange={(e) =>
                dispatch(additionalDataAction.addDate(e.target.value))
              }
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <label htmlFor="multiSelect">Select</label>
            <Select
              options={options}
              onChange={(e) => setType(e)}
              styles={customStyles}
              defaultValue={type}
            />
          </React.Fragment>
        )}
      </div>
      <div className={c.fa}>
        <Coordinator
          name="Amjad Bouoidina"
          pic={fa}
          flags={true}
          clickhHandler={clickHadler}
          data={datafa}
          type={type}
          level="fa"
        />
      </div>
      {show ? (
        <CoordinatorChart dataCoordinator={dataFa} type="fa" />
      ) : (
        <React.Fragment>
          <h1>coordinators</h1>
          <div className={c.Coordinator}>
            {coordinators.map((m, i) => (
              <Coordinator
                pic={m.urlPic}
                name={m.name}
                data={m.dataByProject}
                key={i}
                level="coordinator"
                type={type}
              />
            ))}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default CoordinatorList;
