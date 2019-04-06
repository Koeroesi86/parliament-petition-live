import { renderToString } from "react-dom/server";
import React from "react";
import StaticRoutes, { routeArray } from "./StaticRoutes";

export default function htmlGenerator(locals, callback) {
  const results = {};
  routeArray.forEach(path => {
    results[path] = locals.doctype + renderToString(
      <StaticRoutes locals={{ ...locals, path }} />
    );
  });
  callback(null, results);
};
