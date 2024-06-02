
export enum ITodoActionTypes {
    CREATE_TODO_SUCCESS = 'CREATE_TODO_SUCCESS',
    CREATE_TODO = 'CREATE_TODO',
    GET_TODOS = 'GET_TODOS',
    GET_TODOS_SUCCESS = 'GET_TODOS_SUCCESS'
}

export interface ITodo {
    id: number,
    count: number,
    stok: number,
    istok: number,
    vershin: string,
}

export interface ITodoState {
    todos: ITodo[]
}



export interface ITodoReducer {
    todoReducer: ITodoState
}



export interface ICreateAction {
    type: ITodoActionTypes.CREATE_TODO_SUCCESS | ITodoActionTypes.CREATE_TODO;
    id: number,
    count: number,
    stok: number,
    istok: number,
    vershin: string
}

export interface IGetAction {
    type: ITodoActionTypes.GET_TODOS_SUCCESS | ITodoActionTypes.GET_TODOS;
    payload?: ITodoState
}


export type ITodoAction = ICreateAction  | IGetAction 