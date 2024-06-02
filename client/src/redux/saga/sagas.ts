import { call, Effect, put, takeEvery } from 'redux-saga/effects'
import { ICreateAction, ITodo, ITodoActionTypes } from '../../types/types';
import { TodoApi } from '../../api/index';
import { Console } from 'console';
import { act } from 'react';

const delay = (time: number) => new Promise(resolve => setTimeout(resolve, time))

function* sagaGetTodos(): Generator<Effect, void, ITodo[]> {
    try {
        const todos = yield call(TodoApi.getTodos)
    
        yield put({ type: ITodoActionTypes.GET_TODOS_SUCCESS, payload: todos })
        yield call(delay, 3000)
    } catch (error) {
    
    }
}

function* sagaCreateTodo(action: ICreateAction): Generator<Effect, void> {
    try {
        const todoObject: Partial<ITodo> = {
            id: action.id, 
            count: action.count,
            stok: action.stok,
            istok: action.istok,
            vershin: action.vershin
        }

        const todo = yield call(TodoApi.createTodo, todoObject)

        yield put({ type: ITodoActionTypes.CREATE_TODO_SUCCESS, payload: todo })
        yield call(delay, 3000)
    } catch (error) {
    }
}

export function* sagaWatcher(): Generator<Effect, void> {
    yield takeEvery(ITodoActionTypes.CREATE_TODO, sagaCreateTodo)
    yield takeEvery(ITodoActionTypes.GET_TODOS, sagaGetTodos)
}