import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Header } from './components/Header/Header';
import { TodoForm } from './components/TodoForm/TodoForm';
import { TodoList } from './components/TodoList/TodoList';
import { getTodos } from './redux/actions/index';
import './App.css';
import { TodoItem } from './components/TodoItem/TodoItem';
import GraphView from './components/graph/graph';
import Algoritm from './components/algoritm/algoritm';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTodos())
  }, [])

  

  return (
    <>
      <Header />
      <main>
        <section>
          <div className="container pt-3">
            <TodoForm />
            <h1 style={{marginTop: '30px'}}>Изначальный граф</h1>
            <GraphView/>
            <h1 style={{marginBottom: '20px'}} >Результат работы алгоритма</h1>
            <Algoritm/>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
