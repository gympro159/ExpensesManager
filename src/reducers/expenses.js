import * as Types from './../constants/ActionType';

var initialState = [];

const expenses = (state = initialState, action) => {
    var { expense, id } = action;
    var index = -1;
    switch (action.type) {
        case Types.FETCH_EXPENSES:
            return [...action.expenses];
        case Types.ADD_EXPENSE:
            state.push(expense);
            return [...state];
        case Types.UPDATE_EXPENSE:
            index = findIndex(state, expense.id);
            state[index] = expense;
            return [...state];
        case Types.DELETE_EXPENSE:
            index = findIndex(state, id);
            state.splice(index, 1);
            return [...state];
        default: return [...state];
    }
};

var findIndex = (expenses, id) => {
    var result = -1;
    expenses.forEach((expense, index) => {
        if (expense.id === id) {
            result = index;
        }
    });
    return result;
}

export default expenses;