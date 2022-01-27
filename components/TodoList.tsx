import { useTranslation } from "next-i18next";
import { FunctionComponent, useEffect, useState } from "react";
import { ToDoItem } from "../interfaces/todos";
import { activeToDo, subscribeTodo } from "../services/gunDB";
import TodoItem from "./TodoItem";

interface TodoListProps {}

const TodoList: FunctionComponent<TodoListProps> = () => {
  const [todoState, setTodoState] = useState<{ items: ToDoItem[] }>({
    items: [],
  });

  const { t } = useTranslation();

  useEffect(() => {
    subscribeTodo((items: any) => {
      setTodoState({ items: [...items] });
    });
  }, [activeToDo.id]);

  return (
    <>
      <section className="p-8 flex items-center flex-col xl:mx-72 2xl:mx-96">
        {todoState.items.length === 0 ? (
          <p>{t("common:listEmpty")}</p>
        ) : (
          todoState.items.map((ele) => {
            return <TodoItem item={ele} key={ele.id} />;
          })
        )}
      </section>
    </>
  );
};

export default TodoList;
