import { FunctionComponent, useEffect, useState } from "react";

interface ShareLinkProps {}

const ShareLink: FunctionComponent<ShareLinkProps> = () => {
  const [state, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      {state ? (
        <div className="text-center text-sm m-8 transition duration-200">
          <div className="text-gray-400">
            Teile folgenden Link um zusammen an der Todo-liste zu arbeiten
          </div>

          <p className="dark:text-lime-300">{document.location.href}</p>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default ShareLink;
