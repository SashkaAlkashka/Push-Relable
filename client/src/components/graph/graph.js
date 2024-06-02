import React, { useState, useEffect } from 'react';
import Graph from 'react-vis-network-graph';
import axios from 'axios';
import { TodoApi } from '../../api';

export function ITodo(id, count, stok, istok, vershin) {
    this.id = id;
    this.count = count;
    this.stok = stok;
    this.istok = istok;
    this.vershin = vershin;
}

export default function GraphView() {
    const [todos, setTodos] = useState([]);
    const [lastVershin, setLastVershin] = useState([]);
    const [lastCount, setLastCount] = useState([]);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const fetchedTodos = await TodoApi.getTodos();
            setTodos(fetchedTodos);
        } catch (error) {
            console.error('Ошибка при получении задач:', error);
        }
    };

    useEffect(() => {
        if (todos.length > 0) {
            const lastTodo = todos[todos.length - 1];
            // Удаляем фигурные скобки и разбиваем строку на массив строк
            const strArray = lastTodo.vershin.slice(1, -1).split('","');
            // Преобразуем каждую строку в массив чисел, удаляя пробелы в начале и конце
            const numberArray = strArray.map(row => row.split(',').map(item => Number(item.replace(/^["\s]+|["\s]+$/g, ''))));
            // Обновляем состояние lastVershin

            setLastCount(Number(lastTodo.count));
            setLastVershin(numberArray);
        }
    }, [todos]);

    console.log(lastVershin)
    console.log(lastCount)

    // Создаем узлы и ребра на основе lastVershin
    const graph = {
        nodes: [],
        edges: [],
    };

    if (lastCount > 0) {
        // Создаем узлы
        for (let i = 1; i <= lastCount; i++) {
            graph.nodes.push({ id: i, label: `Node ${i}`, shape: "star" });
        }
        // Создаем ребра
        lastVershin.forEach((edge) => {
            const [from, to, capacity] = edge;
            graph.edges.push({ from, to, capacity });
        });
    }

    const options = {
        edges: {
            color: 'yellow',
        },
        nodes: {
            borderWidth: 2, 
            size: 50, 
            color: {
                border: "#c607e3",
                background: "#ff9eef"
            }
        },
        height: "700px"
    };

    return (
        <div>
            <Graph
                graph={graph}
                options={options} // Исправленное свойство option на options
            />
        </div>
    );
}