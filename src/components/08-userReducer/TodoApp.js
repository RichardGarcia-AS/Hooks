import React, {useReducer} from 'react';
import {todoReducer} from './TodoReducer';

import './styles.css';
import { useForm } from '../../hooks/useForm';

const initialState =[{
    id: new Date().getTime(),
    desc: 'Aprender React',
    done: false
}]

export const TodoApp = () => {

    const [ todo, dispatch ] = useReducer(todoReducer, initialState);

    const [{description}, handleInputChange, reset] = useForm({description:''});

    const handleSubmit = (e) =>{
        e.preventDefault();


        const newTodo = {
            id: new Date().getTime(),
            desc: description,
            done: false        
        }

        const action = {
            type: 'add',
            payload: newTodo
        }

        dispatch(action);
        reset();


    }

    const taskDone = (e, itemId) =>{
        e.preventDefault();

        const actualTODO = todo.find(elenemt => elenemt.id === itemId)
        var i = todo.indexOf( actualTODO );
        todo.splice( i, 1 );
        

        const updateTODO = {
            id: actualTODO.id,
            desc: actualTODO.desc,
            done: true
        }
        
        console.log(todo.find(elenemt => elenemt.id === itemId))

        const action = {
            type: 'done',
            payload: updateTODO
        }

        dispatch(action);
    }


    return (
        <div>
            <h1>TodoApp ({todo.length})</h1>
            <hr/>
            <div className='row'>
                <div className='col-7'>
                    <ul className='list-group list-group-flush'>
                        {todo.map((item, index)=>(
                            <li key={item.id}
                                className="list-group-item"
                            >
                                <p className={`text-center ${item.done && "complete"} `}> {index + 1}. {item.desc}</p>
                                <button onClick={(e) => taskDone(e, item.id)} className='btn btn-danger'>Borrar</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='col'>
                    <h3>Agregar T</h3>
                    <form onSubmit={handleSubmit}>
                        <input
                            type='text'
                            name="description"
                            className="form-control"
                            placeholder="Aprender ..."
                            autoComplete="off"
                            value={description}
                            onChange={handleInputChange}
                        />

                        <button type="submit" className="btn btn-outline-primary mt-1 btn-block"> Agregar</button>
                    
                    </form>
                </div>
            </div>
        </div>
    )
}
