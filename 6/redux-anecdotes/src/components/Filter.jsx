import React from "react";
import { connect } from "react-redux";
import { createFilterAction } from "../reducers/filterReducer";

const Filter = (props) => {
  const handleChange = (e) => {
    const val = e.target.value;
    props.createFilterAction(val);
  };

  return (
    <div style={{ marginBottom: 10 }}>
      <label htmlFor="filter">filter</label>
      <input
        name="filter"
        type="text"
        value={props.filter}
        onChange={handleChange}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
  };
};

const mapDispatchToProps = {
  createFilterAction,
};

const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter);
export default ConnectedFilter;
