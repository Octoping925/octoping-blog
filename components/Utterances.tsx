import BLOG from "@/blog.config";
import { useEffect } from "react";

const Utterances = ({ layout }) => {
  useEffect(() => {
    const theme =
      BLOG.appearance === "auto"
        ? "preferred-color-scheme"
        : BLOG.appearance === "light"
        ? "github-light"
        : "github-dark";

    const script = document.createElement("script");
    const anchor = document.getElementById("comments");

    script.setAttribute("src", "https://utteranc.es/client.js");
    script.setAttribute("crossorigin", "anonymous");
    script.setAttribute("async", "true");

    Object.entries(BLOG.comment.utterancesConfig).forEach(([key, val]) =>
      script.setAttribute(key, val)
    );

    // script.setAttribute('issue-term', issueTerm)
    script.setAttribute("theme", theme);
    anchor.appendChild(script);

    return () => {
      anchor.innerHTML = "";
    };
  });

  return (
    <div
      id="comments"
      className={layout && layout === "fullWidth" ? "" : "md:-ml-16"}
    >
      <div className="utterances-frame" />
    </div>
  );
};

export default Utterances;
