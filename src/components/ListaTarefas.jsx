//importando os hooks
import { useCallback, useReducer, useEffect, useState } from "react";

const tarefasReducer = (state, action) => {
    switch(action.type){
        case 'add_tarefa':
            return[...state, action.payload]
            //payload é dado atual (valor da tarefa) que está sendo adicionado 
            //na nossa lista
        case 'concluir_tarefa': 
            const atualizarTarefa = [...state]
            atualizarTarefa[action.payload].completed = true
            //utilizando a função completed para marcar como verdadeiro
            //quando o nosso dado atual (payload) for marcado como concluido
            return atualizarTarefa 
        case 'excluir_tarefa':
            /*vou colocar um filtro na lista de tarefas para identificar a posição
             do item que vai ser excluido e comparar os outros itens da lista com o atual
             para criar uma nova lista de tarefas sem o item que foi excluido*/
            return state.filter((_,index /*pegando a posição*/) => index !== action.payload)
            //item da posicao precisa ser diferente do dado atual que ta chamando a ção excluir
            default: //se nao tiver fazendo nada
                return state; //retornar a lista de tarefas normal      
    }
}

//funcao lista de tarefas
export default function ListaTarefas(){
    //definir as variaveis da nossa lista
    const [tarefa, setTarefa] = useState('')

    //usando o dispatch para mandar as ações pro nosso useReducer executar
    const [tarefaAtual, dispatch] = useReducer(tarefasReducer, [])

    //usando o useCallback para adicionar as tarefas na memoria cache
    const addTarefa = useCallback(() => {
        //verificando se a tarefa não está vazia para que seja
        //armazenada na memoria cache
        if(tarefa.trim() !== ''){
            dispatch({type: 'add_tarefa', payload: {text: tarefa, completed: false}})
        }
    }, [tarefa])


    //funcao para marcar tarefa como concluida
    const concluirTarefa = useCallback((index) => {
        dispatch({type: 'concluir_tarefa', payload: index })
    , []})

    return(
        <div className="center">
            <h1>Lista de Tarefas</h1>
            <div className="inputArea">
                <input 
                    type="text"
                    placeholder="Nova tarefa"
                    value={tarefa}
                    onChange={(e) => setTarefa(e.target.value)}
                />
                <button onClick={addTarefa}>Add tarefa</button>
            </div>
            <ul>
                {/*Criando a lista com as tarefas que forem sendo adicionadas 
                    vamos usar o .map para mapear cada tareda 
                    usar o index para identificar a posição de cada tarefa adicionada
                */}

                {tarefaAtual.map((tarefas, index) =>(
                    //lista de acordo com a posição da tarefa anterior
                    <li key={index}>
                        <span style={{textDecoration: tarefas.completed ? 'line-through' : 'none' }}>
                            {tarefas.text}
                        </span>
                        
                        {/*colocando verificador para conferir se a tareda ta feita ou nao*/}
                        {!tarefas.completed && (
                            <>
                                <button onClick={() => concluirTarefa(index)}>Concluir</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )

}