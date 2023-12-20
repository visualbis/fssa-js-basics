import React, { useState } from "react";
import { Container, Row, Col, Button, InputGroup, FormControl, ListGroup } from "react-bootstrap";
import TodoItem from "./Components/TodoItem";
import "./Components/TodoApp.css";

const TodoApp = () => {
  const [userInput, setUserInput] = useState("");
  const [list, setList] = useState([]);

  const updateInput = (value) => {
    setUserInput(value);
  };

  const addItem = () => {
    if (userInput.trim() !== "") {
      const newItem = {
        id: Math.random(),
        value: userInput.trim(),
      };

      setList([...list, newItem]);
      setUserInput("");
    }
  };

  const deleteItem = (id) => {
    const updatedList = list.filter((item) => item.id !== id);
    setList(updatedList);
  };

  const editItem = (index) => {
    const editedTodo = prompt('Edit the todo:');
    if (editedTodo !== null && editedTodo.trim() !== '') {
      const updatedList = [...list];
      updatedList[index].value = editedTodo.trim();
      setList(updatedList);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center align-items-center todo-app-title">
        TODO LIST
      </Row>

      <hr />

      <Row>
        <Col md={{ span: 5, offset: 4 }}>
          <InputGroup className="mb-3 todo-input-group">
            <FormControl
              placeholder="add item . . ."
              size="lg"
              value={userInput}
              onChange={(e) => updateInput(e.target.value)}
              aria-label="add something"
              aria-describedby="basic-addon2"
            />
            <InputGroup>
              <Button variant="dark" className="mt-2" onClick={addItem}>
                ADD
              </Button>
            </InputGroup>
          </InputGroup>
        </Col>
      </Row>

      <Row>
        <Col md={{ span: 5, offset: 4 }}>
          <ListGroup>
            {list.map((item, index) => (
              <TodoItem key={index} item={item} onDelete={deleteItem} onEdit={() => editItem(index)} />
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default TodoApp;
