import * as Types from './../constants/ActionType';
import callApi from './../utils/apiCaller';

export const actFetchExpensesRequest = () => {
    return (dispatch) => {
        return callApi('/list', 'GET', null).then(res => {
            dispatch(actFetchExpenses(res.data));
        });
    }
}

export const actFetchExpenses = (expenses) => {
    return {
        type: Types.FETCH_EXPENSES,
        expenses
    }
}

export const actAddExpenseRequest = (expense) => {
    return (dispatch) => {
        return callApi('/list', 'POST', expense).then(res => {
            dispatch(actAddExpense(res.data));
        });
    }
}

export const actAddExpense = (expense) => {
    return {
        type: Types.ADD_EXPENSE,
        expense
    }
}

export const actUpdateExpenseRequest = (expense) => {
    return (dispatch) => {
        return callApi(`/list/${expense.id}`, 'PUT', expense).then(res => {
            if (res) {
                dispatch(actUpdateExpense(res.data));
            }
        });
    }
}

export const actUpdateExpense = (expense) => {
    return {
        type: Types.UPDATE_EXPENSE,
        expense
    }
}

export const actDeleteExpenseRequest = (id) => {
    return (dispatch) => {
        return callApi(`/list/${id}`, 'DELETE', null).then(res => {
            dispatch(actDeleteExpense(id));
        });
    }
}

export const actDeleteExpense = (id) => {
    return {
        type: Types.DELETE_EXPENSE,
        id
    }
}