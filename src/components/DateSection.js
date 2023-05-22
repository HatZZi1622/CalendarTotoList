import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Colors = (type) => {
  switch (type) {
    case "Normal":
      return "#000000";
    case "Gray":
      return "#d3d3d3";
    default:
      break;
  }
};

const DateSection = ({ today }) => {
  const [weekOfMonth, setWeekOfMonth] = useState([]);

  useEffect(() => {
    setWeekOfMonth([]);
    let week = firstWeek;
    let weeksResult = [];
    for (week; week <= lastWeek; week++) {
      weeksResult.push(week);
    }
    setWeekOfMonth(weeksResult);
  }, [today]);

  const firstWeek = today.clone().startOf("month").week();
  const lastWeek =
    today.clone().endOf("month").week() === 1
      ? 53
      : today.clone().endOf("month").week();

  const DateType = (today, days) => {
    if (today.format("MM") === days.format("MM")) {
      return "Normal";
    } else {
      return "Gray";
    }
  };

  return (
    <Container>
      {weekOfMonth.map((v1, index1) => {
        return (
          <WeekRow key={index1}>
            {Array(7)
              .fill(0)
              .map((data, index) => {
                let days = today
                  .clone()
                  .startOf("year")
                  .week(v1)
                  .startOf("week")
                  .add(index, "day");
                return (
                  <Days key={index} type={DateType(today, days)}>
                    {days.format("D")}
                  </Days>
                );
              })}
          </WeekRow>
        );
      })}
    </Container>
  );
};

export default DateSection;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const WeekRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 15%;
`;

const Days = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 14.5%;
  height: 90px;
  padding-top: 25px;
  color: ${(props) => `${Colors(props.type)}`};
  font-size: 15px;
  font-weight: 500;
`;
