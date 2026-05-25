"use client";

import React from "react";

/** TEMP: intentional pattern for Semgrep demo — delete before merging */
export default function SemgrepSmokeTest(): React.ReactElement {
  const untrustedMarkup = `<img src=x onerror='console.warn("demo")' />`;

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: untrustedMarkup,
      }}
    />
  );
}