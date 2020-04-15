import React from "react";
import HomePage from "./screens/Home/Home";
import NotFound from "./screens/NotFound/NotFound";
import Radio from "./screens/Radio/Radio";

const routes = [
  {
    path: "/",
    exact: true,
    main: () => <HomePage />,
  },
  {
    path: "/radio-page",
    exact: false,
    main: () => <Radio />,
  },
  {
    path: "",
    exact: false,
    main: () => <NotFound />,
  },
];

export default routes;
