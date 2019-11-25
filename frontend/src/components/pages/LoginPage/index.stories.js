// https://github.com/diegohaz/arc/wiki/Storybook
import React from "react";
import { storiesOf } from "@storybook/react";
import LoginPage from ".";

storiesOf("LoginPage", module).add("default", () => <LoginPage />);
