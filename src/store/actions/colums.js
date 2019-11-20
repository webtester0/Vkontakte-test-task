import actionTypes from '../actionTypes'

export const addColumn = title => ({
    type: actionTypes.ADD_COLUMN,
    payload: title
})

export const removeColumn = columnIndex => ({
    type: actionTypes.REMOVE_COLUMN,
    payload: columnIndex
})

