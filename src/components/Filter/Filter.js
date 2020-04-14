import React from "react";
import Propstype from 'prop-types'

export default function Filter({ checkFilter ,setCheckFilter }) {
  const handleFilter = (e) => {
    switch (e.target.value) {
      case "Done":
        setCheckFilter({
          ...checkFilter,
          done: e.target.checked,
        });
        break;
      case "Inprogress":
        setCheckFilter({
          ...checkFilter,
          inprogress: e.target.checked ? true : false,
        });
        break;
      case "Income":
        setCheckFilter({
          ...checkFilter,
          income: e.target.checked ? true : false,
        });
        break;
      default:
        setCheckFilter({
          ...checkFilter,
          outcome: e.target.checked ? true : false,
        });
    }
  };

  return (
    <div className="col-md-3 mt-3">
      <b>Filter Expenses</b>
      <table className="table">
        <tbody>
          <tr>
            <td>
              <b style={{ color: "blue" }}>Status</b>
            </td>
            <td>
              <input
                id="Done"
                type="checkbox"
                value="Done"
                defaultChecked={true}
                onChange={handleFilter}
              />
              Done
            </td>
            <td>
              <input
                id="Inprogress"
                type="checkbox"
                value="Inprogress"
                defaultChecked={true}
                onChange={handleFilter}
              />
              Inprogress
            </td>
          </tr>
          <tr>
            <td>
              <b style={{ color: "blue" }}>Type</b>
            </td>
            <td>
              <input
                id="Income"
                type="checkbox"
                value="Income"
                defaultChecked={true}
                onChange={handleFilter}
              />
              Income
            </td>
            <td>
              <input
                id="Outcome"
                type="checkbox"
                value="Outcome"
                defaultChecked={true}
                onChange={handleFilter}
              />
              Outcome
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

Filter.protoTypes = {
  checkFilter: Propstype.arrayOf(
    Propstype.shape({
      done: Propstype.bool.isRequired,
      inprogress: Propstype.bool.isRequired,
      income: Propstype.bool.isRequired,
      outcome: Propstype.bool.isRequired
    })
  ).isRequired,
  setCheckFilter: Propstype.func.isRequired
}