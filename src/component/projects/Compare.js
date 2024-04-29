import React, { useState } from "react";
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
  { value: "efficiency", label: "efficiency" },
  { value: "output/outputTarget", label: "output" },
  { value: "hc/hcTarget", label: "head count" },
  { value: "scrap/scrapTarget", label: "scrap" },
  { value: "wsd/wsd", label: "wsd" },
  { value: "ab/absTarget", label: "ab" },
  { value: "ot/ot", label: "over time" },
  { value: "tlo/tlo", label: "tlo" },
  { value: "dt/dtTarget", label: "down time" },
];

const Compare = (p) => {
  let counter = 4;
  const data = useSelector((s) => s.datas);

  const [countDown, setCountDown] = useState(counter);
  const [third, setThird] = useState(false);

  const [selectedOptions, setSelectedOptions] = useState({
    shiftleader1: "",
    shiftleader2: "",
    shiftleader3: "",
    compareBy: options,
    type: { value: "day", label: "day" },
  });
  const [notify, setNotify] = useState(false);

  const optionsType = [
    { value: "weekly", label: "weekly" },
    { value: "daily", label: "daily" },
    { value: "monthly", label: "monthly" },
    { value: "day", label: "day" },
  ];
  const optionsSH1 = [];

  const filtredData = filterProjectsByName(data, p.project);
  const shiftLeaders = p.data ? p.data : getShiftLeaders(filtredData[0].data);

  console.log(shiftLeaders);
  shiftLeaders.map(
    (m) => m.name !== null && optionsSH1.push({ value: m.name, label: m.name })
  );
  const optionsSH11 = optionsSH1.filter(
    (f) =>
      f.value !== selectedOptions.shiftleader2.value &&
      f.value !== selectedOptions.shiftleader3.value
  );
  const optionsSH2 = optionsSH1.filter(
    (f) =>
      f.value !== selectedOptions.shiftleader1.value &&
      f.value !== selectedOptions.shiftleader3.value
  );
  const optionsSH3 = optionsSH1.filter(
    (f) =>
      f.value !== selectedOptions.shiftleader1.value &&
      f.value !== selectedOptions.shiftleader2.value
  );

  const onChangeHandlerType = (e) => {
    setSelectedOptions({
      ...selectedOptions,
      type: e,
    });
  };
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
  const onChangeHandler2 = (e) => {
    setSelectedOptions({
      ...selectedOptions,
      shiftleader3: e,
    });
  };
  const clickHandler = (e) => {
    if (
      selectedOptions.shiftleader1 === "" ||
      selectedOptions.shiftleader2 === ""
    ) {
      setNotify(true);
      setInterval(() => {
        setCountDown(counter--);
      }, 1000);
    } else {
      p.compare({ selectedOptions, shiftLeaders, optionsSH1, optionsSH2 });
      p.click();
    }
  };
  if (notify) {
    setTimeout(() => {
      setNotify(false);
    }, 4000);
  }

  const handleSelectChange = (event) => {
    setSelectedOptions({ ...selectedOptions, compareBy: event });
  };
  console.log(selectedOptions);

  return (
    <React.Fragment>
      {notify && (
        <div className={c.notification}>
          <p>
            to proceed, Please choose the {p.title}s you'd like to compare (
            {countDown}
            <span style={{ textTransform: "lowercase" }}>s</span>)
          </p>
        </div>
      )}
      <div className={c.selectsContatainer}>
        <label className={c["cyberpunk-checkbox-label"]}>
          <input
            type="checkbox"
            className={c["cyberpunk-checkbox"]}
            checked={third}
            onChange={() => setThird(!third)}
          />
          compare 3 shift leaders
        </label>
        <h1>compare between:</h1>
        <div className={c.selectContatainer}>
          <div className={c.select} style={third ? { width: "30%" } : {}}>
            <label htmlFor="multiSelect">Select {p.title} 1:</label>
            <Select
              options={optionsSH11}
              id="multiSelect"
              inputId="shiftleader1"
              onChange={onChangeHandler}
              styles={customStyles}
              defaultValue={" "}
            />
          </div>
          <div className={c.select} style={third ? { width: "30%" } : {}}>
            <label htmlFor="multiSelect">Select {p.title} 2:</label>
            <Select
              options={optionsSH2}
              id="multiSelect"
              inputId="shiftleader1"
              onChange={onChangeHandler1}
              styles={customStyles}
              defaultValue={" "}
            />
          </div>
          {third && (
            <div className={c.select} style={third ? { width: "30%" } : {}}>
              <label htmlFor="multiSelect">Select {p.title} 3:</label>
              <Select
                options={optionsSH3}
                id="multiSelect"
                inputId="shiftleader1"
                onChange={onChangeHandler2}
                styles={customStyles}
                defaultValue={" "}
              />
            </div>
          )}
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
    </React.Fragment>
  );
};

export default Compare;
