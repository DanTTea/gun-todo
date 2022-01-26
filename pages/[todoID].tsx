import { useRouter } from "next/router";
import { FunctionComponent, useEffect, useState } from "react";
import Layout from "../components/layout";
import InputTextarea from "../components/textareaInput";
import TodoList from "../components/todoList";
import { activeToDo } from "../services/gunDB";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ShareLink from "../components/shareLink";

interface TodosProps {}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
      locale,
    },
  };
}

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};

const Todos: FunctionComponent<TodosProps> = (props) => {
  const router = useRouter();
  const { todoID } = router.query;
  console.log(router);
  console.log("Props ", props);

  const [state, setState] = useState({ id: "" });

  useEffect(() => {
    if (!todoID) return;

    activeToDo.id = todoID as string;
    setState({ id: todoID as string });
  }, [router, todoID]);

  return (
    <>
      <Layout>
        {/* <p>ID: {state.id} </p> */}
        <InputTextarea />
        <ShareLink />
        <TodoList />
      </Layout>
    </>
  );
};

export default Todos;
