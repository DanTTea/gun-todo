import type { NextPage } from "next";
import Link from "next/link";
import Header from "../components/header";
import Theme from "../components/theme";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}

const Home: NextPage<{ locale: string }> = (props) => {
  const todosFor = ["Hausaufgaben", "Reisen", "Projekte"];
  const [state, setState] = useState({ dark: true, todoFor: "Family" });
  const { t } = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => {
      setState((_state) => {
        return {
          ..._state,
          todoFor: todosFor[Math.floor(Math.random() * todosFor.length)],
        };
      });
    }, 4000);

    return () => clearInterval(interval);
  });

  const onThemeChange = (theme: boolean) => {
    setState({ ...state, dark: theme });
    return theme;
  };

  return (
    <Layout>
      <section className="pt-32">
        <div className="m-auto font-sans w-8/12">
          <div className="xl:text-5xl md:text-4xl text-3xl text-center">
            <p>{props.locale}</p>
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
          <Link href="/1234">
            <div className="dark:hover:bg-lime-600 hover:bg-lime-700 mt-6 m-auto w-36 p-2 font-bold rounded dark:bg-lime-300 bg-lime-600 text-white dark:text-slate-900 text-center cursor-pointer">
              {t("common:getStarted")}
            </div>
          </Link>
        </div>
      </section>
      <section className="mt-56 m-auto xl:w-4/12 md:w-7/12 text-center">
        <div className="m-3.5 sm:mx-8">
          <p className="mb-4">
            Eine Todo-App mit der du ganz bequem per Link deine Liste teilen
            kannst. Alle die den Link erhalten haben können dann an der Liste
            arbeiten und so wird nichts vergessen!
          </p>
          <p className="mb-4">
            Deine eingegebenen Todos sind dabei voll{" "}
            <span className="dark:text-lime-300 text-lime-600">
              dezentralisiert
            </span>{" "}
            und werden nur von Nutzern gesehen mit denen du deinen Link getailt
            hast!
          </p>
          <p className="mb-4">
            Die Dezentrailisierung wurde ermöglicht mit{" "}
            <a
              href="https://gun.eco/"
              target="_blank"
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
