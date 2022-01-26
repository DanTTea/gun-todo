import { useTranslation } from "next-i18next";
import { FunctionComponent, useEffect, useState } from "react";

interface ShareLinkProps {}

const ShareLink: FunctionComponent<ShareLinkProps> = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const copyToClipboard = (event: { target: any }) => {
    const { target } = event;

    return navigator.clipboard.writeText(target.innerHTML);
  };

  return (
    <>
      {isVisible ? (
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
    </>
  );
};

export default ShareLink;
