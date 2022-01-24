import { FunctionComponent, useEffect, useState } from "react";
import { ToDoItem } from "../interfaces/todos";
import { activeToDo, subscribeTodo } from "../services/gunDB";

interface TodoListProps {}

const TodoList: FunctionComponent<TodoListProps> = () => {
  const [todoState, setTodoState] = useState<{ items: ToDoItem[] }>({
    items: [],
  });

  useEffect(() => {
    subscribeTodo((items: any) => {
      console.log("_data", items);

      setTodoState({ items: [...items] });
    });
  }, [activeToDo.id]);

  return (
    <>
      {todoState.items.map((ele) => {
        return (
          <div className="whitespace-pre-line" key={ele.id}>
            - {ele.text}
          </div>
        );
      })}
    </>
  );
};

export default TodoList;
