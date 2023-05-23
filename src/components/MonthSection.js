import React from "react";
import styled from "styled-components";
import ArrowLeftIcon from "../assets/arrowLeft.png";
import ArrowRightIcon from "../assets/arrowRight.png";
import moment from "moment";

const MonthSection = ({ setPrevMoment, setNextMoment, today }) => {
  let todayInfo = today;
  return (
    <Container>
      <Wrapper>
        <ArrowLeft src={ArrowLeftIcon} onClick={() => setPrevMoment()} />
        <Month>{todayInfo.format("YYYY . MMM")}</Month>
        <ArrowRight src={ArrowRightIcon} onClick={() => setNextMoment()} />
      </Wrapper>
    </Container>
  );
};

export default MonthSection;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-bottom: 0.8px solid #000000;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
  height: 70px;
  justify-content: space-between;
  align-items: center;
`;

const ArrowLeft = styled.img`
  display: flex;
  cursor: pointer;
  width: 30px;
  height: 30px;
`;
const ArrowRight = styled.img`
  display: flex;
  cursor: pointer;
  width: 30px;
  height: 30px;
`;

const Month = styled.div`
  display: flex;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 5px;
`;
