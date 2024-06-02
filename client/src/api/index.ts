import axios from 'axios';
import { ITodo, ITodoState } from '../types/types';

export class TodoApi {
    static async getTodos(): Promise<ITodoState[]> {
        const res = await axios.get('http://localhost:3001/todos');
        return res.data;
    }

    static async createTodo(todo: Partial<ITodo>): Promise<ITodoState[]> {
        try {
            const res = await axios.post('http://localhost:3001/todos', todo);
            return res.data;
          } catch (error) {
            console.error(error);
            throw error;
          }
    }
}