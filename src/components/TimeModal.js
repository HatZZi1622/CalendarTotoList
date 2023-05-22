import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import moment from "moment";
import SmallArrow from "../assets/smallArrow.png";

const TimeModal = ({ open, onClose, timeSet, onSubmit }) => {
  const [timeNow, setTimeNow] = useState(moment().format("HH : mm"));
  const [formattedTime, setFormattedTime] = useState(moment());

  useEffect(() => {
    setTimeNow(moment().format("HH : mm"));
    setFormattedTime(moment());
  }, [open]);

  const timeCalc = (pressed) => {
    if (pressed === "minus") {
      const result = moment(formattedTime).clone().subtract(1, "hour");
      setFormattedTime(result);
      setTimeNow(result.format("HH : mm"));
    } else if (pressed === "plus") {
      const result = moment(formattedTime).clone().add(1, "hour");
      setFormattedTime(result);
      setTimeNow(result.format("HH : mm"));
    }
  };
  const MinCalc = (pressed) => {
    if (pressed === "minus") {
      const result = moment(formattedTime).clone().subtract(10, "minute");
      if (result.minute() % 10 > 0) {
        const num = result.minute() - Math.floor(result.minute() / 10) * 10;
        const rounded = result.clone().subtract(num, "minute");
        setFormattedTime(moment(rounded));
        setTimeNow(moment(rounded).format("HH : mm"));
      } else {
        setFormattedTime(result);
        setTimeNow(result.format("HH : mm"));
      }
    } else if (pressed === "plus") {
      const result = moment(formattedTime).clone().add(10, "minute");
      if (result.minute() % 10 > 0) {
        const num = Math.ceil(result.minute() / 10) * 10 - result.minute();
        const rounded = result.clone().add(num, "minute");
        setFormattedTime(moment(rounded));
        setTimeNow(moment(rounded).format("HH : mm"));
      } else {
        setFormattedTime(result);
        setTimeNow(result.format("HH : mm"));
      }
    }
  };

  console.log(timeNow);
  return open
    ? ReactDOM.createPortal(
        <ModalContainer>
          <Modal>
            <TimeSetting>
              <div className="upBtnWrap">
                <TimeUpBtn src={SmallArrow} onClick={() => timeCalc("plus")} />{" "}
                <div />{" "}
                <MinUpBtn src={SmallArrow} onClick={() => MinCalc("plus")} />
              </div>
              <TimeDisplay>{timeNow}</TimeDisplay>
              <div className="downBtnWrap">
                <TimeDownBtn
                  src={SmallArrow}
                  onClick={() => timeCalc("minus")}
                />{" "}
                <div />{" "}
                <MinDownBtn src={SmallArrow} onClick={() => MinCalc("minus")} />
              </div>
            </TimeSetting>
            <SubmitBtn
              onClick={() => {
                timeSet(timeNow);
                onSubmit();
              }}
            >
              Submit
            </SubmitBtn>
          </Modal>
        </ModalContainer>,
        document.getElementById("root")
      )
    : null;
};

export default TimeModal;

const ModalContainer = styled.div`
  display: flex;
  position: fixed;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  z-index: 10000;
  top: 0;
  left: 0;
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 280px;
  border-radius: 10px;
  box-sizing: border-box;
  z-index: 200;
  padding: 24px 24px 30px 24px;
  background-color: #fff;
`;

const TimeSetting = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 80px;
  margin-top: 40px;
  margin-bottom: 80px;

  .upBtnWrap {
    display: flex;
    flex-direction: row;
    width: 50%;
    justify-content: space-between;
  }
  .downBtnWrap {
    display: flex;
    flex-direction: row;
    width: 50%;
    justify-content: space-between;
  }
`;

const TimeDisplay = styled.div`
  display: flex;
  justify-content: center;
  font-size: 40px;
  letter-spacing: 1px;
`;

const TimeUpBtn = styled.img`
  display: flex;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;
const MinUpBtn = styled.img`
  display: flex;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;
const TimeDownBtn = styled.img`
  display: flex;
  width: 30px;
  height: 30px;
  rotate: 180deg;
  cursor: pointer;
`;
const MinDownBtn = styled.img`
  display: flex;
  width: 30px;
  height: 30px;
  rotate: 180deg;
  cursor: pointer;
`;

const SubmitBtn = styled.button`
  display: flex;
  cursor: pointer;
  width: 50px;
  height: 20px;
  border: none;
  background-color: #ffff;
  font-size: 15px;
  font-weight: 800;
`;
