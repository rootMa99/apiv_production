import { useState } from "react";
import c from "./Compare.module.css";
import Select from "react-select";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: "100%",
    height: "3rem",
    fontWeight: "600",
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
  const [selectedOptions, setSelectedOptions] = useState({
    shiftleader1: "",
    shiftleader2: "",
    compareBy: [],
  });
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];
  const optionsSH1 = [
    { value: "option1SH1", label: "Option 1" },
    { value: "option2SH1", label: "Option 2" },
    { value: "option3SH1", label: "Option 3" },
  ];
  const optionsSH2 = [
    { value: "option1SH2", label: "Option 1" },
    { value: "option2SH2", label: "Option 2" },
    { value: "option3SH2", label: "Option 3" },
  ];

  const onChangeHandler = (e) => {
    setSelectedOptions({
      ...selectedOptions,
      "shiftleader1": e.value,
    });
  };
  const onChangeHandler1 = (e) => {
    setSelectedOptions({
      ...selectedOptions,
      "shiftleader2": e.value,
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
      <div >
        <div>
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
        <div>
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
        <div>
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
      </div>
    </div>
  );
};

export default Compare;
