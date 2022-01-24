import Link from "next/link";
import { useRouter } from "next/router";
import { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "next-i18next";

interface LanguageProps {}

const Language: FunctionComponent<LanguageProps> = () => {
  const router = useRouter();
  const { locale } = router;

  const [state, setState] = useState({
    language: locale === "de" ? "en" : "de",
  });

  useEffect(() => {
    setState({ language: locale! });
  }, [locale]);

  const onChange = (event: any) => {
    const { target } = event;

    router.push({ pathname: router.pathname }, router.asPath, {
      locale: target.value,
    });
    setState({ language: target.value });
  };

  return (
    <>
      <select
        className="bg-gray-100 dark:bg-gray-900"
        defaultValue={locale}
        onChange={onChange}
      >
        <option value="de">🇩🇪</option>
        <option value="en">🇺🇸</option>
      </select>
    </>
  );
};

export default Language;
