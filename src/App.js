import "./App.css";
import MonthSection from "./components/MonthSection";
import DateSection from "./components/DateSection";
import TodoList from "./components/TodoList";
import moment from "moment";
import { useState } from "react";
import styled from "styled-components";

function App() {
  const [getMoment, setMoment] = useState(moment());
  let today = getMoment;

  console.log(today);
  return (
    <div className="App">
      <MainContainer>
        <CalendarWrap>
          <MonthSection
            setPrevMoment={() => {
              console.log("누름");
              setMoment(getMoment.clone().subtract(1, "month"));
            }}
            setNextMoment={() => setMoment(getMoment.clone().add(1, "month"))}
            today={today}
          />
          <DateSection today={today} />
        </CalendarWrap>
        <TodoList />
      </MainContainer>
    </div>
  );
}

export default App;

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const CalendarWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  height: 100%;
`;
