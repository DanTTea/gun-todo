import Head from "next/head";
import { useState } from "react";
import Header from "./Header";
import Theme from "./Theme";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [state, setState] = useState({ dark: true });

  const onThemeChange = (theme: boolean) => {
    setState({ ...state, dark: theme });
    return theme;
  };

  return (
    <Theme dark={state.dark}>
      <Head>
        <title>Gun Todo Dapp</title>
        <meta
          property="og:image"
          content="https://camo.githubusercontent.com/64213f411349db936a0fa36ef41741b170d4c8d34d1cc0d1c887f7d880838707/68747470733a2f2f636c6475702e636f6d2f5445793979476834356c2e737667"
        />
        <meta property="og:type" content="dapp" />
        <meta
          property="og:description"
          content="Decentralised Todo App! Share and securely collaborate on your todo list!"
        />
      </Head>
      <Header themeChange={onThemeChange} />
      <main className="bg-gray-100 dark:bg-gray-900 text-black  dark:text-white min-h-full">
        {children}
      </main>
    </Theme>
  );
}
