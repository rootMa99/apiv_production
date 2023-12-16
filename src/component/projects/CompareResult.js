import Select from "react-select";
import c from "./CompareResult.module.css";
import ComparedResult from "./ComparedResult";
import React, { useState } from "react";

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

const CompareResult = (p) => {
  const [type, setType] = useState(p.compareData.selectedOptions.type.value);
  const optionsType = [
    { value: "weekly", label: "weekly" },
    { value: "daily", label: "daily" },
    { value: "monthly", label: "monthly" },
  ];
  const changeTypeHandler = (e) => {
    setType(e.value);
  };
  console.log(p.compareData);
  return (
    <React.Fragment>
        <div className={c.selectty}>
          <label htmlFor="multiSelect">Select type:</label>
          <Select
            options={optionsType}
            id="multiSelect"
            inputId="shiftleader1"
            onChange={changeTypeHandler}
            styles={customStyles}
            defaultValue={p.compareData.selectedOptions.type}
          />
        </div>
      <div className={c.container}>
        <div className={c.result}>
          <h1>{p.compareData.selectedOptions.shiftleader1.value}</h1>
          {p.compareData.selectedOptions.compareBy.map((m) => (
            <ComparedResult
              data={p.compareData.shiftLeaders}
              typeS={type}
              name={p.compareData.selectedOptions.shiftleader1.value}
              actual={m.value.split("/")[0]}
              target={m.value.split("/")[1]}
            />
          ))}
        </div>
        <div className={c.result}>
          <h1>{p.compareData.selectedOptions.shiftleader2.value}</h1>
          {p.compareData.selectedOptions.compareBy.map((m) => (
            <ComparedResult
              data={p.compareData.shiftLeaders}
              typeS={type}
              name={p.compareData.selectedOptions.shiftleader2.value}
              actual={m.value.split("/")[0]}
              target={m.value.split("/")[1]}
            />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};
export default CompareResult;
