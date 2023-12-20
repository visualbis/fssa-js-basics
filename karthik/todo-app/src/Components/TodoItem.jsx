import React from "react";
import { ListGroup, Button } from "react-bootstrap";
import "./TodoItem.css";

const TodoItem = ({ item, onDelete, onEdit }) => {
  return (
    <ListGroup.Item className="todo-item" variant="dark" action>
      {item.value}
      <span className="todo-item-actions">
        <Button variant="light" onClick={() => onDelete(item.id)}>
          Delete
        </Button>
        <Button variant="light" onClick={onEdit}>
          Edit
        </Button>
      </span>
    </ListGroup.Item>
  );
};

export default TodoItem;
