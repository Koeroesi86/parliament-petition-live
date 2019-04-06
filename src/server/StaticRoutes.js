import React from "react";
import { StaticRouter } from "react-router";
import reactRouterToArray from 'react-router-to-array';
import PropTypes from "prop-types";
import Routes from "../components/routes";

const mapLocalsToContext = locals => ({
  assets: locals.assets,
  title: locals.title,
});

export const routeArray = reactRouterToArray(new Routes());

const StaticRoutes = ({ locals }) => {
  const context = mapLocalsToContext(locals);
  return (
    <StaticRouter
      context={context}
      location={`${locals.path}`}
    >
      <Routes />
    </StaticRouter>
  );
};

StaticRoutes.propTypes = {
  locals: PropTypes.shape({
    path: PropTypes.string,
    assets: PropTypes.array,
    title: PropTypes.string,
  })
};

export default StaticRoutes;
