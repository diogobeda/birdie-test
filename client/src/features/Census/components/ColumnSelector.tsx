import React, { Component } from "react";
import Downshift, { ControllerStateAndHelpers } from "downshift";
import styled from "react-emotion";

const Container = styled("div")`
  position: relative;
`;

const Input = styled("input")`
  height: 45px;
  width: 100%;
  border: 0;
  font-size: 18px;
  background: #fcfcfc;
  box-shadow: 0px 0px 10px 1px rgba(204,204,204,1);
  outline: none;
  padding: 0px 10px;
`;

const Dropdown = styled("div")`
  position: absolute;
  top: 65px;
  left: 0;
  width: 100%;
  box-shadow: 0px 0px 10px 1px rgba(204,204,204,1);
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
`;

const DropdownItem = styled("div")`
  padding: 10px;
  cursor: pointer;
  background-color: ${({ isHighlighted }: { isHighlighted: boolean }) => isHighlighted ? "#ccc" : "#fff"};
`;

export type ColumnSelectorItem = {
  value: string;
};

export type ColumnSelectorProps = {
  className?: any;
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  onChange(value: string): void;
  columns: Array<ColumnSelectorItem>;
};

export type ColumnSelectorState = {
  filteredColumns: Array<ColumnSelectorItem>;
  filter: string;
};

class ColumnsSelector extends Component<ColumnSelectorProps, ColumnSelectorState> {
  state = {
    filter: "",
    filteredColumns: this.props.columns,
  };

  static getDerivedStateFromProps(props: ColumnSelectorProps, state: ColumnSelectorState) {
    let newState = null;
    if (!state.filteredColumns || (state.filter === "" && state.filteredColumns.length === 0)) {
      newState = {
        filteredColumns: props.columns,
      };
    }
    return newState;
  }

  handleInputChange(value: string, { selectedItem }: ControllerStateAndHelpers<ColumnSelectorItem>) {
    const { columns } = this.props;

    if (!value || value === "" || (selectedItem && value === selectedItem.value)) {
      this.setState({
        filteredColumns: columns,
        filter: "",
      });
      return;
    }

    const filteredColumns = columns.filter(col => col.value.includes(value));
    this.setState({ filteredColumns, filter: value });
  }

  handleValueChange(item: ColumnSelectorItem) {
    this.props.onChange(item.value);
  }

  render() {
    const {
      className,
      value,
      columns,
      placeholder,
      disabled
    } = this.props;
    const { filteredColumns } = this.state;

    return (
      <Downshift
        onChange={(item: ColumnSelectorItem) => this.handleValueChange(item)}
        onInputValueChange={(...args) => this.handleInputChange(...args)}
        itemToString={(item: ColumnSelectorItem) => (item && item.value) || ""}
      >
        {({
          getInputProps,
          getMenuProps,
          getItemProps,
          getRootProps,
          isOpen,
          openMenu,
          highlightedIndex
        }) => (
          <Container
            {...getRootProps({
              refKey: "innerRef"
            })}
            className={className}
          >
            <Input
              {...getInputProps()}
              onFocus={openMenu}
              onClick={openMenu}
              placeholder={placeholder || "Select a column"}
              disabled={disabled}
            />
            {isOpen && (
              <Dropdown {...getMenuProps()}>
                {filteredColumns.map((column, index) => (
                  <DropdownItem
                    {...getItemProps({
                      key: column.value,
                      item: column,
                      index,
                    })}
                    isHighlighted={highlightedIndex === index}
                  >
                    {column.value}
                  </DropdownItem>
                ))}
              </Dropdown>
            )}
          </Container>
        )}
      </Downshift>
    );
  }
}

export default ColumnsSelector;