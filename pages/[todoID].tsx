import { useRouter } from "next/router";
import { FunctionComponent, useEffect, useState } from "react";
import Layout from "../components/layout";
import InputTextarea from "../components/textareaInput";
import TodoList from "../components/todoList";
import { activeToDo } from "../services/gunDB";

interface TodosProps {}

const Todos: FunctionComponent<TodosProps> = () => {
  const router = useRouter();
  const { todoID } = router.query;
  console.log(router);

  const [state, setState] = useState({ id: "" });

  useEffect(() => {
    if (!todoID) return;

    activeToDo.id = todoID as string;
    setState({ id: todoID as string });
  }, [router]);

  return (
    <>
      <Layout>
        <p>ID: {state.id} </p>
        <InputTextarea />
        <TodoList />
      </Layout>
    </>
  );
};

export default Todos;
