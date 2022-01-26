import { FunctionComponent, useEffect, useState } from "react";
import { ToDoItem } from "../interfaces/todos";
import { activeToDo, subscribeTodo } from "../services/gunDB";
import TodoItem from "./todo-item";

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
      <section className="p-8 flex items-center flex-col xl:mx-64">
        {todoState.items.map((ele) => {
          return <TodoItem item={ele} key={ele.id} />;
        })}
      </section>
    </>
  );
};

export default TodoList;
