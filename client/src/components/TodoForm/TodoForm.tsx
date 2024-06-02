import { ChangeEvent, FormEvent, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createTodo } from "../../redux/actions";
import { ITodo } from "../../types/types";

export const TodoForm = () => {
    const [numFields, setNumFields] = useState(0);
    const [id, setId] = useState('')
    const [edges, setEdges] = useState('')
    const [count, setCount] = useState('')
    const [stok, setStok] = useState('')
    const [istok, setIstok] = useState('')
    const [vershins, setVershins] = useState<string[]>([])
    const dispatch = useDispatch()

    const handleAddToDB = () => {
        if (!count.trim() || !stok.trim() || !istok.trim() || vershins.length === 0 || !edges.trim()) {
            
        }

        dispatch(createTodo(id, count, stok, istok, vershins))
        setId('')
        setCount('')
        setStok('')
        setIstok('')
        setVershins([])
        setEdges('')
    }

    const handleChangeCount = (event: ChangeEvent<HTMLInputElement>) => {
        setCount(event.target.value);
    };

    const handleChangeEdge  = (event: ChangeEvent<HTMLInputElement>) => {
        setEdges(event.target.value);
        setNumFields(parseInt(event.target.value));
    };

    const handleChangeStok = (event: ChangeEvent<HTMLInputElement>) => {
        setStok(event.target.value)
    }

    const handleChangeIstok = (event: ChangeEvent<HTMLInputElement>) => {
        setIstok(event.target.value)
    }

    const handleChangeVershin = (index: number, event: ChangeEvent<HTMLInputElement>) => {
        setVershins(prevVershins => {
            const newVershins = [...prevVershins];
            newVershins[index] = event.target.value;
            return newVershins;
        });
    };

    const fields = Array.from({ length: numFields }, (_, i) => (
        <div className="form-group" style={{ width: '92%', marginRight: '10px' }} key={i}>
          <label htmlFor="" className="form-label">Ребро {i + 1}</label>
          <input 
                        onChange={(event) => handleChangeVershin(i, event)}
                        type="text" 
                        className="form-control"
                    />
        </div>
      ));
      
    
    return (
        <form>
            <div className="justify-content-between">
                <div className="form-group" style={{ width: '92%', marginRight: '10px' }}>
                    <label htmlFor="" className="form-label">Введите количество вершин</label>
                    <input 
                        onChange={handleChangeCount}
                        type="text" 
                        className="form-control"
                    />
                </div>
                <div className="form-group" style={{ width: '92%', marginRight: '10px' }}>
                    <label htmlFor="" className="form-label">Введите количество рёбер</label>
                    <input 
                        onChange={handleChangeEdge}
                        type="text" 
                        className="form-control"
                    />
                </div>
                <div className="form-group" style={{ width: '92%', marginRight: '10px' }}>
                    <label htmlFor="" className="form-label">Введите исток</label>
                    <input 
                        onChange={handleChangeIstok}
                        type="text" 
                        className="form-control"
                    />
                </div>

                <div className="form-group" style={{ width: '92%', marginRight: '10px' }}>
                    <label htmlFor="" className="form-label">Введите сток</label>
                    <input 
                        onChange={handleChangeStok}
                        type="text" 
                        className="form-control"
                    />
                </div>

                {fields}

                <button onClick={handleAddToDB} className="btn btn-success" style={{marginTop: '40px'}}>создать</button>
            </div>
        </form>
    );
};