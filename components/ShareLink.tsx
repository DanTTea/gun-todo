import { useTranslation } from "next-i18next";
import { FunctionComponent, useEffect, useState } from "react";
import Toast from "./Toast";

interface ShareLinkProps {}

const ShareLink: FunctionComponent<ShareLinkProps> = () => {
  const [state, setState] = useState({
    showSharelink: false,
    showToast: false,
  });
  const { t } = useTranslation();

  useEffect(() => {
    setState({ ...state, showSharelink: true });
  }, []);

  const copyToClipboard = (event: { target: any }) => {
    const { target } = event;

    navigator.clipboard.writeText(target.innerHTML);
    setTimeout(() => {
      setState({ ...state, showToast: false });
    }, 1000);

    return setState({ ...state, showToast: true });
  };

  return (
    <>
      {state.showSharelink ? (
        <div className="text-center text-sm m-8 transition duration-200">
          <div className="text-gray-400">{t("common:shareLink")}</div>
          <p
            onClick={copyToClipboard}
            className="dark:text-lime-300 text-lime-600 hover:text-lime-700 dark:hover:text-lime-600 cursor-pointer"
          >
            {document.location.href}
          </p>
        </div>
      ) : (
        <div></div>
      )}
      {state.showToast ? <Toast text={t("common:toastCopy")} /> : null}
    </>
  );
};

export default ShareLink;
