import React, { useState } from "react";
import styled from "styled-components";
import Check from "../assets/isCheck.png";
import TimeModal from "./TimeModal";

const TodoList = () => {
  const [lists, setLists] = useState([]);
  const [newList, setNewList] = useState("");
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);
  const [timeInfo, setTimeInfo] = useState("");

  const submit = () => {
    let temp = {
      id: lists.length,
      value: newList,
      time: timeInfo,
      isOpen: false,
      isCheck: false,
    };
    let result = [...lists];
    result.push(temp);
    setLists(result);
    setNewList("");
    setTimeInfo("");
  };

  const openUp = (i) => {
    let temp = [...lists];
    for (let n = 0; n < lists.length; n++) {
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
    setLists(temp);
  };
  const checkOut = (i) => {
    let temp = [...lists];
    temp[i] = { ...temp[i], isCheck: true };
    setLists(temp);
  };

  console.log(timeInfo);

  return (
    <Container>
      <Title>To Do List</Title>
      <Contents>
        {lists.length > 0 &&
          lists.map((v, index) => {
            return (
              <div ket={index} className="row">
                <ListInfo>
                  <div className="listName" onClick={() => openUp(index)}>
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
            window.event.keyCode === 13 && submit();
            // setIsTimeModalOpen(true);
          }}
          onChange={(e) => setNewList(e.target.value)}
        />
        <Button
          onClick={() => {
            // submit();
            setIsTimeModalOpen(true);
          }}
        >
          Submit
        </Button>
      </InputArea>
      <TimeModal
        open={isTimeModalOpen}
        onClose={() => setIsTimeModalOpen(false)}
        timeSet={(timeNow) => setTimeInfo(timeNow)}
        onSubmit={() => {
          submit();
          setIsTimeModalOpen(false);
        }}
      />
    </Container>
  );
};

export default TodoList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
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
  height: 550px;
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
    padding: 10px 0px;
  }
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 92%;
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
  width: 25px;
  height: 25px;
  border: none;
  background-color: #ffff;
`;
const Checked = styled.button`
  display: flex;
  cursor: pointer;
  margin-right: 10px;
  width: 30px;
  height: 20px;
  border: none;
  font-weight: 800;
  background-color: #ffff;
`;
