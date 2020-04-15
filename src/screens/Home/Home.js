import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./Home.css";
import Filter from "../../components/Filter/Filter";
import {
  actFetchExpensesRequest,
  actAddExpenseRequest,
  actUpdateExpenseRequest,
  actDeleteExpenseRequest,
} from "../../actions/index";

function Home({
  expenses,
  fetchAllExpenses,
  onAddExpense,
  onUpdateExpense,
  onDeleteExpense,
}) {
  var date = new Date();
  const [checkFilter, setCheckFilter] = useState({
    done: true,
    inprogress: true,
    income: true,
    outcome: true,
  });
  const [total, setTotal] = useState(0);
  const [expense, setExpense] = useState({
    id: "",
    total: 0,
    date: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`,
    type: "",
    note: "",
    status: "",
  });
  const [checkEdit, setCheckEdit] = useState(false);

  var list = [];
  expenses.map((item) => {
    if (
      ((checkFilter.done && item.status === "Done") ||
        (checkFilter.inprogress && item.status === "Inprogress")) &&
      ((checkFilter.income && item.type === "Income") ||
        (checkFilter.outcome && item.type !== "Income"))
    )
      list.push(item);
  });

  useEffect(() => {
    async function fetchData() {
      await fetchAllExpenses();
      await calTotal(list);
    }
    fetchData();
  }, [fetchAllExpenses, list]);

  const calTotal = (expenses) => {
    let totalTemp = 0;
    expenses.forEach((expense) => {
      expense.type === "Income"
        ? (totalTemp += parseInt(expense.total, 10))
        : (totalTemp -= parseInt(expense.total, 10));
    });
    setTotal(totalTemp);
  };

  const editModal = (value) => {
    setCheckEdit(true);
    setExpense({
      id: value.id,
      date: value.date,
      total: parseInt(value.total, 10),
      type: value.type,
      note: value.note,
      status: value.status,
    });
  };

  const addModal = () => {
    setCheckEdit(false);
    setExpense({
      date: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`,
      total: "",
      type: "Income",
      status: "Inprogress",
      note: "",
    });
  };

  const handleSubmit = async () => {
    console.log(checkEdit);
    if (expense.total !== "") {
      await (checkEdit ? onUpdateExpense(expense) : onAddExpense(expense));
      window.alert("Lưu dữ liệu thành công!");
      window.location.reload();
    } else {
      window.alert("Vui lập nhập giá trị!");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Bạn chắc chắn muốn xóa?")) {
      await onDeleteExpense(expense.id);
      window.alert("Xóa dữ liệu thành công!");
      window.location.reload();
    }
  };

  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row">
          <Filter checkFilter={checkFilter} setCheckFilter={setCheckFilter} />
          <div className="col-md-6">
            <div
              className="overflow-auto box-shadow"
              style={{ height: window.innerHeight - 70 }}
            >
              <table className="table table-hover tableFixHead">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Note</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((item, index) => {
                    return (
                      <tr
                        key={index}
                        onClick={() => editModal(item)}
                        data-toggle="modal"
                        data-target="#exampleModal"
                      >
                        <td>{item.date}</td>
                        <td>{item.type}</td>
                        <td>{item.total}</td>
                        <td>{item.status}</td>
                        <td>{item.note}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-3 mt-3">
            <b>Remain</b>
            <hr className="mt-0" />
            <h1 style={{ textAlign: "center" }}>
              {new Intl.NumberFormat("en-US").format(total)}
            </h1>
          </div>
        </div>

        <button
          className="add"
          onClick={addModal}
          data-toggle="modal"
          data-target="#exampleModal"
        >
          +
        </button>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  {checkEdit ? `Edit Expense` : `Add Expense`}
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="container">
                  <form>
                    <div className="form-group">
                      <b style={{ color: "#0080ff" }}>Total</b>
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">$</span>
                        </div>
                        <input
                          type="number"
                          className="form-control"
                          value={expense.total}
                          onChange={(e) =>
                            setExpense({
                              ...expense,
                              total: parseInt(e.target.value, 10),
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <b>Type</b>
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          className="form-control"
                          value={expense.type}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <b>Note</b>
                      <div className="input-group mb-3">
                        <textarea
                          type="text"
                          className="form-control"
                          value={expense.note}
                          disabled
                        />
                      </div>
                    </div>
                    {checkEdit && (
                      <div className="form-check">
                        <label className="form-check-label">
                          <input
                            className="form-check-input"
                            name=""
                            id=""
                            type="checkbox"
                            checked={expense.status === "Done" ? true : false}
                            onChange={(e) =>
                              setExpense({
                                ...expense,
                                status: e.target.checked
                                  ? "Done"
                                  : "Inprogress",
                              })
                            }
                          />
                          Done
                        </label>
                      </div>
                    )}
                  </form>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                  style={!checkEdit ? { display: "none" } : {}}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    expenses: state.expenses,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllExpenses: () => {
      dispatch(actFetchExpensesRequest());
    },
    onAddExpense: (expense) => {
      dispatch(actAddExpenseRequest(expense));
    },
    onUpdateExpense: (expense) => {
      dispatch(actUpdateExpenseRequest(expense));
    },
    onDeleteExpense: (id) => {
      dispatch(actDeleteExpenseRequest(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
