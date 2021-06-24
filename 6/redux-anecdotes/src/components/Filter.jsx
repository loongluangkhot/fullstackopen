import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createFilterAction } from "../reducers/filterReducer";

function Filter() {
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const val = e.target.value;
    dispatch(createFilterAction(val));
  };

  return (
    <div style={{ marginBottom: 10 }}>
      <label htmlFor="filter">filter</label>
      <input name="filter" type="text" value={filter} onChange={handleChange} />
    </div>
  );
}

export default Filter;
