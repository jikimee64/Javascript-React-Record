import React, {useRef, useState, useMemo, useCallback} from 'react';
import UserList from "./UserList";
import CreateUser from "./CreateUser";

export default function App() {
    const [inputs, setInputs] = useState({
        usename: '',
        email: ''
    });

    const {username, email} = inputs;
    const onChange = useCallback(e => {
        const {value,name} = e.target;
        setInputs(inputs => ({
            ...inputs,
            [name] : value
        }))
    },[]);

    const [users, setUsers] = useState([
            {
                id: 1,
                username: 'godchiken',
                email: 'godchiken@naver.com',
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
    );

    const nextId = useRef(4);

    /**
     * 특정 함수를 재사용할 때 사용.
     *
     * 함수 안에서 사용하는 state,props가 있다면 꼭 deps에 포함시켜야 최신 값을 참조할 수 있다.
     */
    const onCreate = useCallback(() => {
        const user = {
            id : nextId.current,
            username,
            email
        };
        setUsers(users => [...users,user]);
        setInputs({ username : '', email: '' });
        nextId.current += 1;
    },[username,email]);

    const onRemove = useCallback(id => {
        setUsers(users => users.filter(user => user.id !== id))
    },[]);

    const onToggle = useCallback(id => {
        setUsers(users => users.map(
            user => user.id === id
                ? {...user, active: !user.active}
                : user
        ));
    },[]);

    /**
     *  연산한 값 재사용
     *
     * 두번째 인자의 배열 안에 넣은 내용이 바뀌면, 우리가 등록한 함수를 호출해서 값을 연산해주고,
     * \만약에 내용이 바뀌지 않았다면 이전에 연산한 값을 재사용한다.
     */
    const count = useMemo( () => {
        const activeUser = users.filter(user => user.active).length;
        console.log('활성 사용자 수를 세는중...');
        return activeUser;
    },[users]);

    return (
        <>
            <CreateUser
                username={username}
                email={email}
                onChange={onChange}
                onCreate={onCreate}
            />
            <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
            <div>활성사용자 수 : {count}</div>
        </>
    )

}