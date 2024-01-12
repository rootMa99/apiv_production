import Coordinator from "./Coordinator";
import c from "./Coordinators.module.css";
//import profileP from "../../assets/unknownProfile.jpg";
import avatar from "../../assets/avatarunkown.png";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useRef, useState } from "react";
import { getCoordinatorsData } from "../hooks/coordinatorDataFilters";
import Select from "react-select";
import CoordinatorChart from "./CoordinatorCharts";
import { additionalDataAction } from "../../store/AdditionalData";

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
    backgroundColor: "rgba(24, 13, 13, 1)",
    boxShadow: "none",
    marginBottom:"1rem",
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

const Coordinators = (p) => {
  const { date } = useSelector((s) => s.additionalData);
  const dispatch = useDispatch();

  const [teamLeader, setTeamLeader] = useState({ name: "", show: false });
  const [teamLeaderi, setTeamLeaderi] = useState({ name: "", show: false });
  const [type, setType] = useState({ value: "date", label: "yesterday" });
  const [showMore, setShowMore] = useState(false);
  const [showMoreSL, setShowMoreSL] = useState(false);
  const [showMoreTL, setShowMoreTL] = useState(false);
  const { name } = useParams();
  const data = useSelector((s) => s.datas);
  const scrollToRef = useRef();
  const scrollToRefChart = useRef();
  const coordinatoor = getCoordinatorsData(data);
  console.log(coordinatoor, name);
  const dataCoordinator = coordinatoor.filter(
    (f) => f.name.toLowerCase() === name.toLowerCase()
  )[0];
  console.log(dataCoordinator);
  const setShiftleader = (name) => {
    setTeamLeader({ name: name, show: true });
    setTimeout(() => {
      scrollToRef.current.scrollIntoView({ behavior: "smooth" });
    }, 40);
  };
  const setShiftleaderi = (name) => {
    setTeamLeaderi({ name: name, show: true });
    setShowMoreTL(!showMoreTL);
    setTimeout(() => {
      scrollToRefChart.current.scrollIntoView({ behavior: "smooth" });
    }, 40);
  };
  const teamleaders = dataCoordinator.shiftleader.filter(
    (f) => f.name === teamLeader.name
  )[0];
  console.log(teamleaders);

  const clickHadler = (e) => {
    setShowMoreSL(false);
    setShowMoreTL(false);
    setTeamLeaderi({ name: "", show: false });
    if (teamLeader.show) {
      setTeamLeader({ ...teamLeader, show: false });
    } else {
      setShowMore(!showMore);
    }
  };
  const clickHadlerSL = (e) => {
    if (teamLeaderi.show) {
    setShowMoreTL(false);
      setTeamLeaderi({ name: "", show: false });
    } else {
      setShowMoreSL(!showMoreSL);
    }
  };
  const clickHadlerTL = (e) => {
    setShowMoreTL(false);
    setTeamLeaderi({ name: "", show: false });
  };

  return (
    <div className={c.wrapper}>
      <div className={c.notification}>
        <p>
          Tap the coordinator card to view statistics or return to the
          coordinator tree.
        </p>
      </div>

      <div className={c.selectq}>
        <Select
          options={options}
          onChange={(e) => setType(e)}
          styles={customStyles}
          defaultValue={type}
        />
        {(showMore || showMoreSL || showMoreTL) && (
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
        ) }
      </div>
      <div className={c.Coordinator}>
        <Coordinator
          pic={dataCoordinator.urlPic}
          name={name}
          level="coordinator"
          data={dataCoordinator.dataByProject}
          type={type}
          flag={true}
          clickhHandler={clickHadler}
        />
      </div>

      {showMore ? (
        <CoordinatorChart dataCoordinator={dataCoordinator.dataByProject} />
      ) : (
        <React.Fragment>
          <h1>shiftLeaders</h1>
          <div
            className={c.shiftLeader}
            style={!teamLeader.show ? { marginBottom: "1rem" } : {}}
          >
            {!teamLeader.show &&
              dataCoordinator.shiftleader.map(
                (m, i) =>
                  m.name !== null && (
                    <Coordinator
                      pic={m.urlPic}
                      name={m.name}
                      level="shiftLeader"
                      setShiftleader={setShiftleader}
                      data={m.teamleader}
                      key={i}
                      type={type}
                    />
                  )
              )}
            {teamLeader.show && (
              <React.Fragment>
                {dataCoordinator.shiftleader
                  .filter((f) => f.name === teamLeader.name)
                  .map(
                    (m, i) =>
                      m.name !== null && (
                        <Coordinator
                          pic={m.urlPic}
                          name={m.name}
                          level="shiftLeader"
                          setShiftleader={setShiftleader}
                          data={m.teamleader}
                          key={i}
                          type={type}
                          clickhHandler={clickHadlerSL}
                          flags={true}
                        />
                      )
                  )}
              </React.Fragment>
            )}
          </div>
          {teamLeader.show && !showMoreSL && (
            <React.Fragment>
              <h1 ref={scrollToRef}>{teamLeader.name} Team's Leaders </h1>

              {!teamLeaderi.show ? (
                <div className={c.teamleader}>
                  {teamleaders.teamleader.map((m, i) => (
                    <Coordinator
                      pic={avatar}
                      name={m.name}
                      data={m.data}
                      key={i}
                      type={type}
                      level="teamleader"
                      setShiftleaderi={setShiftleaderi}
                    />
                  ))}
                </div>
              ) : (
                <div className={c.teamleader}>
                  {teamleaders.teamleader
                    .filter((f) => f.name === teamLeaderi.name)
                    .map((m, i) => (
                      <Coordinator
                        pic={avatar}
                        name={m.name}
                        data={m.data}
                        key={i}
                        type={type}
                        level="teamleader"
                        setShiftleaderi={setShiftleaderi}
                        flagss={true}
                        clickhHandler={clickHadlerTL}
                      />
                    ))}
                </div>
              )}
            </React.Fragment>
          )}
          {showMoreSL && (
            <CoordinatorChart
              dataCoordinator={
                dataCoordinator.shiftleader.filter(
                  (f) => f.name === teamLeader.name
                )[0].teamleader
              }
              dontNavigate={true}
            />
          )}
          {showMoreTL && (
            <React.Fragment>
              <h1 ref={scrollToRefChart}>Efficiency </h1>

              <CoordinatorChart
                dataCoordinator={
                  teamleaders.teamleader.filter(
                    (f) => f.name === teamLeaderi.name
                  )[0]
                }
                dontNavigate={true}
                level="teamleader"
              />
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default Coordinators;
