import React, {useRef, useReducer, useMemo, useCallback} from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';
import useInputs from "../custom_hook/useInputs"
import produce from 'immer';

function countActiveUsers(users) {
    console.log('활성 사용자 수를 세는중...');
    return users.filter(user => user.active).length;
}

const initialState = {
    inputs: {
        username: '',
        email: ''
    },
    users: [
        {
            id: 1,
            username: 'velopert',
            email: 'public.velopert@gmail.com',
            active: true
        },
        {
            id: 2,
            username: 'tester',
            email: 'tester@example.com',
            active: false
        },
        {
            id: 3,
            username: 'liz',
            email: 'liz@example.com',
            active: false
        }
    ]
};

/**
 * useState와 다르게 컴포넌트 바깥에 작성 & 다른 파일에 작성 후 불러와서 사용
 *
 * 벨로퍼의 경우 setter 를 한 함수에서 여러번 사용해야 하는 일이 발생한다면 useReducer 를 쓸까? 에 대한
 * 고민을 시작
 */
function reducer(state, action) {
    //reducer 함수내에서도 비구조화 할당 가능
    // const { users, inputs } = state;
    // const { name, value, user, id } = action;
    switch (action.type) {
        // case 'CHANGE_INPUT':
        //     return {
        //         ...state,
        //         inputs: {
        //             ...state.inputs,
        //             [action.name]: action.value
        //         }
        //     };
        case 'CREATE_USER':
            return {
                // inputs: initialState.inputs, 커스텀 훅 사용하므로 주석
                users: state.users.concat(action.user)
                //immer
                // produce(state, draft => {
                //     draft.users.push(action.user);
                // });
            };
        case 'TOGGLE_USER':
            return {
                // ...state,
                users: state.users.map(user =>
                    user.id === action.id ? {...user, active: !user.active} : user
                )
                //immer
                // produce(state, draft => {
                //     const user = draft.users.find(user => user.id === action.id);
                //     user.active = !user.active;
                //     });
            };
        case 'REMOVE_USER':
            return {
                // ...state,
                users: state.users.filter(user => user.id !== action.id)

                //immer
                /*          produce(state, draft => {
                            const index = draft.users.findIndex(user => user.id === action.id);
                            draft.users.splice(index, 1);
                        });*/
            };
        default:
            return state;
    }
}

/**
 * 리액트의 Context API 를 사용하면, 프로젝트 안에서 전역적으로 사용 할 수 있는 값을 관리 할 수 있습니다.
 * 여기서 제가 "상태" 가 아닌 "값" 이라고 언급을 했는데요, 이 값은 꼭 상태를 가르키지 않아도 됩니다.
 * 이 값은 함수일수도 있고, 어떤 외부 라이브러리 인스턴스일수도 있고 심지어 DOM 일 수도 있습니다.

 물론, Context API 를 사용해서 프로젝트의 상태를 전역적으로 관리 할 수도 있긴한데요,
 이에 대해서는 나중에 더 자세히 알아보도록 하겠습니다.
 */
// UserDispatch 라는 이름으로 내보내줍니다.
export const UserDispatch = React.createContext(null);

function App() {
    const [{username, email}, onChange, reset] = useInputs({
        username: '',
        email: ''
    });

    const [state, dispatch] = useReducer(reducer, initialState);
    const nextId = useRef(4);

    const {users} = state;
    //const { username, email } = state.inputs;

    // const onChange = useCallback(e => {
    //     const { name, value } = e.target;
    //     dispatch({
    //         type: 'CHANGE_INPUT',
    //         name,
    //         value
    //     });
    // }, []);

    const onCreate = useCallback(() => {
        dispatch({
            type: 'CREATE_USER',
            user: {
                id: nextId.current,
                username,
                email
            }
        });
        nextId.current += 1;
    }, [username, email, reset]);

    const onToggle = useCallback(id => {
        dispatch({
            type: 'TOGGLE_USER',
            id
        });
    }, []);

    const onRemove = useCallback(id => {
        dispatch({
            type: 'REMOVE_USER',
            id
        });
    }, []);

    const count = useMemo(() => countActiveUsers(users), [users]);
    return (
        //UserDispatch 라는 Context 를 만들어서, 어디서든지 dispatch 를 꺼내 쓸 수 있도록
        // 준비를 해준 것입니다.
        <UserDispatch.provider value={dispatch}>
            <CreateUser
                username={username}
                email={email}
                // onChange={onChange}
                // onCreate={onCreate}
            />
            <UserList users={users} onToggle={onToggle} onRemove={onRemove}/>
            <div>활성사용자 수 : {count}</div>
        </UserDispatch.provider>
    );
}

export default App;