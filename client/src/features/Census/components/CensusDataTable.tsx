import React from "react";
import styled, { css } from "react-emotion";
import { CensusDataRow } from "../../../store/domains/census";

const Table = styled("table")`
  width: 100%;
`;

const TR = styled("tr")`
  height: 30px;

  tbody &:nth-child(even) {
    background: #ccc;
  }
`;

const TH = styled("th")`
  text-align: left;
  padding: 0 5px;
`;

const TD = styled("td")`
  padding: 0 5px;
`;

const smallCol = css`
  width: 10%;
`;

const bigCol = css`
  width: 50%;
`;

const mediumCol = css`
  width: 20%;
`;

type TableProps = {
  rows: Array<CensusDataRow>;
  totalRows: number;
  selectedColumn: string;
};

const CensusDataTable: React.SFC<TableProps> = ({ rows, totalRows, selectedColumn }) => {
  const notDisplayedRows = totalRows - rows.length;
  return (
    <div>
      <Table>
        <thead>
          <TR>
            <TH className={smallCol}>#</TH>
            <TH className={bigCol}>{selectedColumn}</TH>
            <TH className={mediumCol}>Count</TH>
            <TH className={mediumCol}>Average age</TH>
          </TR>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <TR key={row.value}>
              <TD className={smallCol}>{index + 1}</TD>
              <TD className={bigCol}>{row.value}</TD>
              <TD className={mediumCol}>{row.count}</TD>
              <TD className={mediumCol}>{row.averageAge.toFixed(1)}</TD>
            </TR>
          ))}
        </tbody>
      </Table>
      {notDisplayedRows > 0 && (
        <p>Not displaying {notDisplayedRows} rows.</p>
      )}
    </div>
  );
};

export default CensusDataTable;