import React, {useReducer, createContext, useContext, useRef} from 'react';

const initialTodos = [
    {
        id: 1,
        text: '프로젝트 생성하기',
        done: true
    },
    {
        id: 2,
        text: '컴포넌트 스타일링하기',
        done: true
    },
    {
        id: 3,
        text: 'Context 만들기',
        done: false
    },
    {
        id: 4,
        text: '기능 구현하기',
        done: false
    }
];

function todoReducer(state, action) {
    switch (action.type) {
        case 'CREATE':
            return state.concat(action.todo);
        case 'TOGGLE':
            return state.map(todo =>
                todo.id === action.id ? { ...todo, done: !todo.done } : todo
            );
        case 'REMOVE':
            return state.filter(todo => todo.id !== action.id);
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

//별개로 만듬으로써
//dispatch 만 필요한 컴포넌트에서 불필요한 렌더링을 방지 할 수 있습니다.
const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

//상태를 관리하는 TodoProvider 컴포넌트
export function TodoProvider({children}) {
    const [state, dispatch] = useReducer(todoReducer, initialTodos);
    const nextId = useRef(5);

    return (
        //Provider의 value 지정 : Context 에서 사용 할 값을 지정
        //children : props 로 받아온 children 값을 내부에 렌더링
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                <TodoNextIdContext.Provider value={nextId}>
                    {children}
                </TodoNextIdContext.Provider>
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    );
}

/**
 * useTodoState, useTodoDispatch, useTodoNextId Hook 을 사용하려면,
 * 해당 컴포넌트가 TodoProvider 컴포넌트 내부에 렌더링되어 있어야 합니다
 * (예: App 컴포넌트에서 모든 내용을 TodoProvider 로 감싸기).
 * 만약 TodoProvider 로 감싸져있지 않다면 에러를 발생시키도록 커스텀 Hook 을 수정해보겠습니다.
 * @returns {unknown}
 */
export function useTodoState() {
    const context = useContext(TodoStateContext);
    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}

export function useTodoDispatch() {
    const context = useContext(TodoDispatchContext);
    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}

export function useTodoNextId() {
    const context = useContext(TodoNextIdContext);
    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}

//다른 컴포넌트에서 사용
// import React from 'react';
// import { useTodoState, useTodoDispatch } from '../TodoContext';
//
// function Sample() {
//     const state = useTodoState();
//     const dispatch = useTodoDispatch();
//     return <div>Sample</div>;
// }