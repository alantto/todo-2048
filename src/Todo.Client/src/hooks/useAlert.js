import React, { useState, useEffect } from "react";
const useAlert = () => {
  const [html, setHtml] = useState("");

  useEffect(() => {
    if (!html) {
      return;
    }
    const timeout = setTimeout(() => {
      setHtml("");
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [html]);

  const updateAlert = (message, isFatal = false) => {
    const cssClassName = "alert" + (isFatal ? " alert-fatal" : "");
    const newHtml = <div className={cssClassName}>{message}</div>;
    setHtml(newHtml);
  };

  return [html, updateAlert];
};

export default useAlert;
