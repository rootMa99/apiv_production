import c from "./Coordinators.module.css";
//import hamzaKhartaoui from "../../assets/hamzaKhartaoui.png";
import Coordinator from "./Coordinator";
import { useSelector } from "react-redux";
import { getCoordinatorsData } from "../hooks/coordinatorDataFilters";
import {  useState } from "react";
//import { additionalDataAction } from "../../store/AdditionalData";
import Select from "react-select";

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
    { value: "daily", label: "daily" },
    { value: "weekly", label: "weekly" },
    { value: "monthly", label: "monthly" },
  ];
const CoordinatorList = (p) => {
  const data = useSelector((s) => s.datas);
  //const dispatch = useDispatch();
  const coordinators = getCoordinatorsData(data);
  const [type, setType]=useState({ value: "daily", label: "daily" })
  console.log(coordinators);

  // useEffect(() => {
  //   console.log("console log coordinator re run");
  //   dispatch(additionalDataAction.addCoordinator(coordinators));
  // }, [dispatch, coordinators]);

  console.log(type)
  return (
    <div className={`${c.wrapper} ${c.centerd}`}>
      <div className={c.select}>
        <label htmlFor="multiSelect">Select</label>
        <Select
          options={options}
          onChange={(e)=>setType(e)}
          styles={customStyles}
          defaultValue={type}
        />
      </div>
      <h1>cordinators</h1>
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
    </div>
  );
};

export default CoordinatorList;
