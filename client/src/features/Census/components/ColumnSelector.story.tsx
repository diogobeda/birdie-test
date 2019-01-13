import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import styled from "react-emotion";
import ColumnSelector, { ColumnSelectorItem } from "./ColumnSelector";

const Container = styled("div")`
  width: 300px;
  padding: 20px;
`;

const columns: Array<ColumnSelectorItem> = [
  { value: "education" },
  { value: "weight" },
  { value: "income" }
];

storiesOf("ColumnSelector", module)
  .add("Basic", () => (
    <Container>
      <ColumnSelector
        columns={columns}
        onChange={action("change")}
      />
    </Container>
  ));