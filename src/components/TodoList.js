import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Check from "../assets/isCheck.png";
import TimeModal from "./TimeModal";
import { useDispatch, useSelector } from "react-redux";
import { setList } from "../data/listData";

const Lines = (type) => {
  switch (type) {
    case "UnderLined":
      console.log("타는중이다");
      return "line-through";
    case "NonLine":
      return "";
    default:
      break;
  }
};
const TypeCheck = (type) => {
  switch (type) {
    case true:
      return "UnderLined";
    case false:
      return "NonLine";
    default:
      break;
  }
};

const TodoList = ({ selectedDate }) => {
  const dispatch = useDispatch();

  const [newList, setNewList] = useState("");
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);
  const [selectedList, setSelectedList] = useState();

  let reduxValue = useSelector((state) => {
    return state.listData.value;
  });

  useEffect(() => {
    if (selectedDate !== "" && reduxValue !== undefined) {
      setSelectedList(reduxValue.result.filter((e) => e.date === selectedDate));
    } else setSelectedList();
  }, [selectedDate, reduxValue]);

  const submit = async (timeInfo) => {
    let temp = {
      date: selectedDate,
      id: reduxValue === undefined ? 0 : Object.keys(reduxValue.result).length,
      value: newList,
      time: timeInfo,
      isOpen: false,
      isCheck: false,
    };
    if (reduxValue !== undefined) {
      let result = [...reduxValue.result];
      result.push(temp);
      await setNewList("");
      await dispatch(setList({ result }));
    } else {
      let result = [];
      result.push(temp);
      await setNewList("");
      await dispatch(setList({ result }));
    }

    setIsTimeModalOpen(false);
  };

  const openUp = (i) => {
    let temp = [...selectedList];
    for (let n = 0; n < selectedList.length; n++) {
      if (n !== i) {
        temp[n] = { ...temp[n], isOpen: false };
      } else {
        if (temp[n].isOpen === true) {
          temp[n] = { ...temp[n], isOpen: false };
        } else {
          temp[n] = { ...temp[n], isOpen: true };
        }
      }
    }
    setSelectedList(temp);
  };
  const checkOut = (i) => {
    let temp = [...selectedList];
    temp[i] = { ...temp[i], isCheck: true };
    setSelectedList(temp);
    let result = [...reduxValue.result];
    let resultindex = result.findIndex((e) => e.value === temp[i].value);
    result[resultindex] = { ...result[resultindex], isCheck: true };
    dispatch(setList({ result }));
  };

  return (
    <Container>
      <Title>To Do List</Title>
      <Contents>
        {selectedList &&
          selectedList.map((v, index) => {
            return (
              <div ket={index} className="row">
                <ListInfo>
                  <div
                    className="listName"
                    type={TypeCheck(v.isCheck)}
                    onClick={() => openUp(index)}
                  >
                    {index + 1}번째 할 일
                  </div>
                  <div className="listTime">{v.time}</div>
                </ListInfo>
                {v.isOpen === true && (
                  <OpenWrap>
                    <div className="opened">↳ {v.value}</div>
                    {v.isCheck === true ? (
                      <Done src={Check} />
                    ) : (
                      <Checked onClick={() => checkOut(index)}>Done</Checked>
                    )}
                  </OpenWrap>
                )}
              </div>
            );
          })}
      </Contents>

      <InputArea>
        <Input
          value={newList}
          onKeyDown={() => {
            window.event.keyCode === 13 && setIsTimeModalOpen(true);
          }}
          onChange={(e) => setNewList(e.target.value)}
        />
        <Button
          onClick={() => {
            setIsTimeModalOpen(true);
          }}
        >
          Submit
        </Button>
      </InputArea>
      <TimeModal
        open={isTimeModalOpen}
        timeSet={(time) => {
          submit(time);
        }}
      />
    </Container>
  );
};

export default TodoList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  height: 100%;
`;

const Title = styled.div`
  display: flex;
  width: 100%;
  height: 70px;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 700;
  border-bottom: 0.8px solid #000000;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 70vh;
  padding-bottom: 20px;
  padding-top: 10px;
  overflow-y: auto;

  .row {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 20px;
    margin-bottom: 8px;
    width: 87%;
    border: 0.5px solid #808080;
    border-radius: 5px;
  }
`;

const ListInfo = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

  .listName {
    display: flex;
    text-decoration: ${(props) => `${Lines(props.type)}`};
    cursor: pointer;
  }

  .listTime {
    display: flex;
  }
`;

const OpenWrap = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  .opened {
    padding-top: 20px;
  }
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 91%;
  padding: 10px;
  border: 0.5px solid #000000;
  border-radius: 5px;
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Input = styled.textarea`
  display: flex;
  width: 100%;
  height: 80px;
  border: none;
  border-right: 0.5px solid #000000;
  outline: none;
  resize: none;
`;

const Button = styled.button`
  display: flex;
  cursor: pointer;
  padding: 0px 8px;
  width: 50px;
  height: 20px;
  border: none;
  background-color: #ffff;
`;
const Done = styled.img`
  display: flex;
  width: 20px;
  height: 20px;
  padding-top: 20px;
  border: none;
  background-color: #ffff;
`;
const Checked = styled.button`
  display: flex;
  cursor: pointer;
  margin-right: 10px;
  padding-top: 12px;
  width: 30px;
  height: 20px;
  border: none;
  font-weight: 800;
  background-color: #ffff;
`;
