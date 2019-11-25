// https://github.com/diegohaz/arc/wiki/Storybook
import React from "react";
import { storiesOf } from "@storybook/react";
import HomePage from ".";

storiesOf("HomePage", module).add("default", () => <HomePage />);
