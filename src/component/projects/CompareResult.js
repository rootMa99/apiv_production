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
    border: "2px solid #ecf0f162",
    backgroundColor: "black",
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
    color: "#f4dfc8",
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
  const [chooseSL, setChooseSL] = useState({ sl1: false, sl2: false });
  const [type, setType] = useState(p.compareData.selectedOptions.type.value);
  const [compareb, setCompareb] = useState(
    p.compareData.selectedOptions.compareBy
  );
  const [shifleaders, setShiftLeaders] = useState({
    shiftleader1: p.compareData.selectedOptions.shiftleader1,
    shiftleader2: p.compareData.selectedOptions.shiftleader2,
  });
  const optionsType = [
    { value: "weekly", label: "weekly" },
    { value: "daily", label: "daily" },
    { value: "monthly", label: "monthly" },
    { value: "day", label: "day" },
  ];
  const options = [
    { value: "ab/absTarget", label: "ab" },
    { value: "dt/dtTarget", label: "down time" },
    { value: "hc/hcTarget", label: "head count" },
    { value: "ot/ot", label: "over time" },
    { value: "output/outputTarget", label: "output" },
    { value: "tlo/tlo", label: "tlo" },
  ];
  const changeTypeHandler = (e) => {
    setType(e.value);
  };
  const handleSelectChange = (e) => {
    setCompareb(e);
  };
  console.log(p.compareData, compareb);
  const chooseSL1Handler = (e) => {
    setChooseSL({
      ...chooseSL,
      sl1: !chooseSL.sl1,
    });
  };
  const chooseSL2Handler = (e) => {
    setChooseSL({
      ...chooseSL,
      sl2: !chooseSL.sl2,
    });
  };
  const onChangeHandlerSL1 = (e) => {
    setShiftLeaders({
      ...shifleaders,
      shiftleader1: e,
    });
    setChooseSL({
      ...chooseSL,
      sl1: false,
    });
  };
  const onChangeHandlerSL2 = (e) => {
    setShiftLeaders({
      ...shifleaders,
      shiftleader2: e,
    });
    setChooseSL({
      ...chooseSL,
      sl2: false,
    });
  };
  return (
    <React.Fragment>
      <div className={c.selects}>
        <div className={c.selectm}>
          <Select
            options={options}
            isMulti
            id="multiSelect"
            onChange={handleSelectChange}
            styles={customStyles}
            defaultValue={p.compareData.selectedOptions.compareBy}
          />
        </div>
        <div className={c.selectty}>
          <Select
            options={optionsType}
            id="multiSelect"
            inputId="shiftleader1"
            onChange={changeTypeHandler}
            styles={customStyles}
            defaultValue={p.compareData.selectedOptions.type}
          />
        </div>
      </div>
      <div className={c.container}>
        <div className={`${c.result} ${c.resultl}`}>
          <h1 onClick={chooseSL1Handler}>{shifleaders.shiftleader1.value}</h1>
          {chooseSL.sl1 && (
            <div className={c.selectSlds}>
              <Select
                options={p.compareData.optionsSH1.filter(
                  (f) =>
                    f.value !== shifleaders.shiftleader1.value &&
                    f.value !== shifleaders.shiftleader2.value
                )}
                id="multiSelect"
                inputId="shiftleader1"
                onChange={onChangeHandlerSL1}
                styles={customStyles}
                defaultValue={" "}
              />
            </div>
          )}
          {compareb.map((m) => (
            <ComparedResult
              data={p.compareData.shiftLeaders}
              typeS={type}
              name={shifleaders.shiftleader1.value}
              actual={m.value.split("/")[0]}
              target={m.value.split("/")[1]}
            />
          ))}
        </div>
        <div className={`${c.result} ${c.resultr}`}>
          <h1 onClick={chooseSL2Handler}>{shifleaders.shiftleader2.value}</h1>
          {chooseSL.sl2 && (
            <div className={c.selectSlds}>
              <Select
                options={p.compareData.optionsSH2.filter(
                  (f) =>
                    f.value !== shifleaders.shiftleader1.value &&
                    f.value !== shifleaders.shiftleader2.value
                )}
                id="multiSelect"
                inputId="shiftleader1"
                onChange={onChangeHandlerSL2}
                styles={customStyles}
                defaultValue={" "}
              />
            </div>
          )}
          {compareb.map((m) => (
            <ComparedResult
              data={p.compareData.shiftLeaders}
              typeS={type}
              name={shifleaders.shiftleader2.value}
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