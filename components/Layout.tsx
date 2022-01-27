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
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        ></meta>
      </Head>
      <Header themeChange={onThemeChange} />
      <main className="bg-gray-100 dark:bg-gray-900 text-black  dark:text-white min-h-full">
        {children}
      </main>
    </Theme>
  );
}
