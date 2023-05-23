import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Colors = (type) => {
  switch (type) {
    case "Normal":
      return "#000000";
    case "Gray":
      return "#d3d3d3";
    case "Selected":
      return "#ffffff";
    default:
      break;
  }
};
const Borders = (type) => {
  switch (type) {
    case "Normal":
      return "none";
    case "Gray":
      return "none";
    case "Selected":
      return "solid #d3d3d3";
    default:
      break;
  }
};

const DateSection = ({ today, setDate, allList }) => {
  const [weekOfMonth, setWeekOfMonth] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  //정보 초기화 => 이 달의 주는 올해의 몇번째 주인지 정보를 입력
  useEffect(() => {
    setWeekOfMonth([]);
    let week = firstWeek;
    let weeksResult = [];
    for (week; week <= lastWeek; week++) {
      weeksResult.push(week);
    }
    setWeekOfMonth(weeksResult);
  }, [today]);

  //이 달의 첫번째 주는 전체 주의 몇번째인가?
  const firstWeek = today.clone().startOf("month").week();

  //이 달의 마지막 주는 전체 주의 몇번째인가?
  const lastWeek =
    today.clone().endOf("month").week() === 1
      ? 53
      : today.clone().endOf("month").week();

  //지난달 날짜인지 아닌지 구별하여 타입 지정
  const DateType = (today, days) => {
    if (today.format("MM") === days.format("MM")) {
      return "Normal";
    } else {
      return "Gray";
    }
  };

  //날짜 선택 시 테두리타입 + 선택한 날짜정보 입력
  const SelectedCheck = (v) => {
    if (v === selectedDate) {
      setDate(selectedDate);
      return "Selected";
    } else {
      return "Normal";
    }
  };

  //날짜마다 투두리스트 배열
  const listsByDate = (v) => {
    if (allList !== "") {
      let lists = allList.filter((e) => e.date === v);
      return lists;
    } else {
      return "";
    }
  };

  //투두리스트칩 내용 줄임말처리
  const truncate = (str) => {
    return str?.length > 10 ? str.substr(0, 10 - 1) + "..." : str;
  };

  console.log(weekOfMonth);

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
                  <Days
                    key={index}
                    onClick={() => setSelectedDate(days.format("MM-D"))}
                    type={DateType(today, days)}
                  >
                    <div
                      className="selectedDiv"
                      type={SelectedCheck(days.format("MM-D"))}
                    >
                      {days.format("D")}
                    </div>
                    <div className="listDiv">
                      {listsByDate(days.format("MM-D")) !== "" &&
                        listsByDate(days.format("MM-D")).map((v) => {
                          return (
                            <>
                              <div className="oneList">{truncate(v.value)}</div>
                            </>
                          );
                        })}
                    </div>
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
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 14.5%;
  height: 90px;
  padding-top: 25px;
  color: ${(props) => `${Colors(props.type)}`};
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;

  .selectedDiv {
    display: flex;
    justify-content: center;
    width: 50px;
    color: ${(props) => `${Colors(props.type)}`};
    border-bottom: 1.8px ${(props) => `${Borders(props.type)}`};
  }

  .listDiv {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 8px;
  }

  .oneList {
    display: flex;
    width: 88%;
    padding: 3px;
    border-radius: 3px;
    border: 1px solid #b7b9bd;
    font-size: 12px;
    color: #b7b9bd;
    margin-bottom: 3px;
  }
`;
