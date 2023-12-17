import { useState } from "react";
import c from "./Compare.module.css";
import Select from "react-select";
import { useSelector } from "react-redux";
import { filterProjectsByName } from "../hooks/getEfficiencyData";
import { getShiftLeaders } from "../hooks/EfficiencyProjectFilter";

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
    border: "2px solid #ecf0f162",
    backgroundColor:"rgba(24, 13, 13, 0.37)",
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

const Compare = (p) => {
  const data = useSelector((s) => s.datas);

  const [selectedOptions, setSelectedOptions] = useState({
    shiftleader1: "",
    shiftleader2: "",
    compareBy: [],
    type:{ value: "day", label: "day" }
  });
  const options = [
    { value: "ab/absTarget", label: "ab" },
    { value: "dt/dtTarget", label: "down time" },
    { value: "hc/hcTarget", label: "head count" },
    { value: "ot/ot", label: "over time" },
    { value: "output/outputTarget", label: "output" },
    { value: "tlo/tlo", label: "tlo" },
  ];
  const optionsType=[
    { value: "weekly", label: "weekly" },
    { value: "daily", label: "daily" },
    { value: "monthly", label: "monthly" },
    { value: "day", label: "day" },
  ]
  const optionsSH1 = [];

  const filtredData = filterProjectsByName(data, p.project);
  const shiftLeaders = getShiftLeaders(filtredData[0].data);

  console.log(shiftLeaders);
  shiftLeaders.map(
    (m) => m.name !== null && optionsSH1.push({ value: m.name, label: m.name })
  );
  const optionsSH2 = optionsSH1.filter(
    (f) => f.value !== selectedOptions.shiftleader1.value
  );

  const onChangeHandlerType=e=>{
    setSelectedOptions({
        ...selectedOptions,
        type: e,
      });
  }
  const onChangeHandler = (e) => {
    setSelectedOptions({
      ...selectedOptions,
      shiftleader1: e,
    });
  };
  const onChangeHandler1 = (e) => {
    setSelectedOptions({
      ...selectedOptions,
      shiftleader2: e,
    });
  };
  const clickHandler = (e) => {
    p.compare({ selectedOptions, shiftLeaders });
    p.click();
  };

  const handleSelectChange = (event) => {
    console.log(event);
    setSelectedOptions({ ...selectedOptions, compareBy: event });
  };
  console.log(selectedOptions);
  return (
    <div className={c.selectsContatainer}>
      <h1>compare between :</h1>
      <div className={c.selectContatainer}>
        <div className={c.select}>
          <label htmlFor="multiSelect">Select shiftLeader 1:</label>
          <Select
            options={optionsSH1}
            id="multiSelect"
            inputId="shiftleader1"
            onChange={onChangeHandler}
            styles={customStyles}
            defaultValue={" "}
          />
        </div>
        <div className={c.select}>
          <label htmlFor="multiSelect">Select shiftLeader 2:</label>
          <Select
            options={optionsSH2}
            id="multiSelect"
            inputId="shiftleader1"
            onChange={onChangeHandler1}
            styles={customStyles}
            defaultValue={" "}
          />
        </div>
      </div>
      <div className={c.selectm}>
        <div className={c.selectt}>
          <label htmlFor="multiSelect">compare by:</label>
          <Select
            options={options}
            isMulti
            id="multiSelect"
            onChange={handleSelectChange}
            styles={customStyles}
            defaultValue={" "}
          />
        </div>
        <div className={c.selectty}>
          <label htmlFor="multiSelect">Select type:</label>
          <Select
            options={optionsType}
            id="multiSelect"
            inputId="shiftleader1"
            onChange={onChangeHandlerType}
            styles={customStyles}
            defaultValue={" "}
          />
        </div>
      </div>

      <button className={c.buttonToggle} onClick={clickHandler}>
        compare
      </button>
    </div>
  );
};

export default Compare;
