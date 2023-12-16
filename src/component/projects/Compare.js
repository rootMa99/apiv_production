import { useState } from "react";
import c from "./Compare.module.css";
import Select from "react-select";
import { shallowEqual, useSelector } from "react-redux";
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
    border: "2px solid #fff",
    backgroundColor: state.isFocused ? "grey" : "#474b4d",
    boxShadow: "none",
    "&:hover": {
      border: "2px solid #474b4d",
      backgroundColor: "#676c6e",
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
  });
  const options = [
    { value: "ab", label: "ab" },
    { value: "dt", label: "down time" },
    { value: "hc", label: "head count" },
    { value: "ot", label: "over time" },
    { value: "output", label: "output" },
    { value: "tlo", label: "tlo" },
  ];
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

      <button className={c.buttonToggle}>compare</button>
    </div>
  );
};

export default Compare;
