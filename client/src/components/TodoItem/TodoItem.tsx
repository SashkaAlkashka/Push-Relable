import { useState, ChangeEvent } from 'react';
import { ITodo } from '../../types/types';
import './styles.css'

interface ITodoProps {
    todo: ITodo;
}

export const TodoItem = ({ todo }: ITodoProps) => {
    const [isTodoEdit, setIsTodoEdit] = useState(false)
    const [newTitle, setNewTitle] = useState('')

    const handleSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setIsTodoEdit(!isTodoEdit)
        } 
    }

    const handleTodoEdit = () => setIsTodoEdit(!isTodoEdit)
    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => setNewTitle(event.target.value)

    const handleChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
        return event.target.value
    }

    
    return (
            <div 
                className='todo-text'
            >
                <input type='text' onChange={handleChangeInputValue} />
            </div>
    )
}