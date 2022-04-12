import React, { useState } from "react";
import { ITarefa } from "../../types/tarefa";
import Botao from "../Botao";
import style from './Formulario.module.scss'
import { v4 as uuidv4 } from "uuid";

interface Props {
    setTarefas: React.Dispatch<React.SetStateAction<ITarefa[]>>
}

export default function Formulario({setTarefas}:Props){
    const [tempo,setTempo] = useState("00:00:00")
    const [tarefa,setTafera] = useState("")

    const resetInput = () => {
        setTempo("00:00:00")
        setTafera("")
    }

    const handleAddTarefa = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setTarefas(tarefasAntigas => 
            [
                ...tarefasAntigas,
                {
                    tarefa,tempo,
                    selecionado: false,
                    completado: false,
                    id: uuidv4()
                }
            ]
        )
        resetInput()
    }
    
    return(
        <form className={style.novaTarefa} onSubmit={handleAddTarefa}>
            <div className={style.inputContainer}>
                <label htmlFor="tarefa">Adicione um novo estudo</label>
                <input 
                    type={"text"}
                    name="tarefa" 
                    id="tarefa"
                    value={tarefa}
                    onChange={event => setTafera(event.target.value)}
                    placeholder="O que você quer estudar?"
                    required
                />
            </div>
            <div className={style.inputContainer}>
                <label htmlFor="tempo">Tempo</label>
                <input 
                    type={"time"} 
                    step="1" 
                    name="tempo" 
                    id="tempo"
                    value={tempo}
                    onChange={event =>setTempo(event.target.value)}
                    min={"00:00:00"} 
                    max={"01:30:00"}
                    required
                />
            </div>
            <Botao 
                type="submit"
                text="adicionar!"
            />
        </form>
    )
}