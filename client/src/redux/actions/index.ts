import { ITodoActionTypes } from '../../types/types';

export const getTodos = () => {
    return {
        type: ITodoActionTypes.GET_TODOS,
    }
}

export const createTodo = (zero: string, one: string, two:string, three:string, four: string[]) => {
    return {
        type: ITodoActionTypes.CREATE_TODO,
        id: parseInt(zero, 10), 
        count: parseInt(one, 10),
        stok: parseInt(two, 10),
        istok: parseInt(three, 10),
        vershin: four
    }
}
