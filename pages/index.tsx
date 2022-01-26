import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import * as uid from "uuid";

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
      locale,
    },
  };
}

const Home: NextPage<{ locale: string }> = (props) => {
  let todosFor: string[] = [];
  const [state, setState] = useState({ dark: true, todoFor: "" });
  const { t } = useTranslation();

  useEffect(() => {
    todosFor =
      props.locale === "de"
        ? ["Hausaufgaben", "Reisen", "Projekte"]
        : ["Homework", "Journeys", "Projects"];

    setState({ ...state, todoFor: todosFor[0] });

    const interval = setInterval(() => {
      setState((_state) => {
        return {
          ..._state,
          todoFor: todosFor[Math.floor(Math.random() * todosFor.length)],
        };
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [props]);

  return (
    <Layout>
      <section className="pt-32">
        <div className="m-auto font-sans w-8/12">
          <div className="xl:text-5xl md:text-4xl text-3xl text-center">
            <h1>
              {t("common:your")}{" "}
              <span className="dark:text-lime-300 text-lime-600 font-bold">
                {t("common:todos")}
              </span>{" "}
              {t("common:toShare")}
            </h1>
            <div className="w-100% dark:text-lime-300 text-lime-600 m-auto sm:m-0 ">
              <span className="font-mono font-bold">{state.todoFor}</span>
            </div>
          </div>
          <Link href={"/" + uid.v4()}>
            <div className="dark:hover:bg-lime-600 hover:bg-lime-700 mt-6 m-auto w-36 p-2 font-bold rounded dark:bg-lime-300 bg-lime-600 text-white dark:text-slate-900 text-center cursor-pointer">
              {t("common:getStarted")}
            </div>
          </Link>
        </div>
      </section>
      <section className="mt-56 m-auto xl:w-4/12 md:w-7/12 text-center">
        <div className="m-3.5 sm:mx-8">
          <p className="mb-4">{t("common:discription1")}</p>
          <p className="mb-4">
            {t("common:yourTodos")}{" "}
            <span className="dark:text-lime-300 text-lime-600">
              {t("common:dezentralized")}
            </span>{" "}
            {t("common:sharedLink")}
          </p>
          <p className="mb-4">
            {t("common:theDezentralisation")}{" "}
            <a
              href="https://gun.eco/"
              target="_blank"
              rel="noopener noreferrer"
              className="dark:text-lime-300 text-lime-600 hover:text-lime-900 dark:hover:text-lime-600"
            >
              GUN
            </a>
            !
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
