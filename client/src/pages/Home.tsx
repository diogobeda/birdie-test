import React, { Component } from "react";
import styled from "react-emotion";
import { connect } from "react-redux";
import PageContent from "../components/PageContent";
import ColumnSelector from "../features/Census/components/ColumnSelector";
import CensusDataTable from "../features/Census/components/CensusDataTable";
import { actions as columnsActions } from "../store/domains/columns";
import { actions as censusActions, CensusData } from "../store/domains/census";
import { State } from "../store";

const FilterBar = styled("div")`
  width: 100%;
  display: flex;
`;

const Content = styled("div")`
  margin-top: 50px;
`;

const StyledColumnSelector = styled(ColumnSelector)`
  flex: 1;
  max-width: 300px;
`;

type HomeProps = {
  columns: Array<string>;
  isLoadingColumns: boolean;
  fetchColumns: () => void;
  censusData: CensusData;
  fetchCensusData: (column: string) => void;
  isLoadingCensusData: boolean;
};

type HomeState = {
  selectedColumn?: string;
};

class Home extends Component<HomeProps, HomeState> {
  state: HomeState = {
    selectedColumn: undefined,
  };

  componentDidMount() {
    this.props.fetchColumns();
  }

  componentDidUpdate(prevProps: HomeProps, prevState: HomeState) {
    const { selectedColumn } = this.state;
    if (selectedColumn && prevState.selectedColumn !== selectedColumn) {
      this.props.fetchCensusData(selectedColumn);
    }
  }

  handleColumnChange(column: string) {
    this.setState({ selectedColumn: column });
  }

  render() {
    const {
      columns,
      isLoadingColumns,
      censusData,
      isLoadingCensusData,
    } = this.props;
    const { selectedColumn } = this.state;

    return (
      <PageContent>
        <FilterBar>
          <StyledColumnSelector
            columns={columns.map(value => ({ value }))}
            onChange={value => this.handleColumnChange(value)}
            placeholder={isLoadingColumns ? "Loading columns..." : undefined}
            disabled={isLoadingColumns}
          />
        </FilterBar>
        <Content>
          {isLoadingCensusData && (
            <p>Loading census data for that column...</p>
          )}
          {selectedColumn && !isLoadingCensusData && (
            <CensusDataTable
              {...censusData}
              selectedColumn={selectedColumn}
            />
          )}
        </Content>
      </PageContent>
    );
  }
}

export default connect(
  ({ columns, census }: State) => ({
    columns: columns.list,
    isLoadingColumns: columns.loading,
    isLoadingCensusData: census.loading,
    censusData: {
      rows: census.rows,
      totalRows: census.totalRows,
    },
  }),
  {
    fetchColumns: columnsActions.fetchColumnsRequest,
    fetchCensusData: censusActions.fetchCensusDataRequest,
  }
)(Home);