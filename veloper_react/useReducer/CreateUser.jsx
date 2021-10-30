import React, {memo, useRef, useContext} from 'react';
import {UserDispatch} from "./App";
import useInputs2 from "../custom_hook/sample/useInputs2";

const CreateUser = memo(() => {
    const [{username, email}, onChange, reset] = useInputs2({
        username: '',
        email: ''
    })

    const nextId = useRef(4);
    const dispatch = useContext(UserDispatch);

    const onCreate = () => {
        dispatch({
            type:'CREATE_USER',
            user:{
                id: nextId.current,
                username,
                email
            }
        });
        reset();
        nextId.current += 1;
    }

    return (
        <div>
            <input
                name="username"
                placeholder="계정명"
                onChange={onChange}
                value={username}
            />
            <input
                name="email"
                placeholder="이메일"
                onChange={onChange}
                value={email}
            />
            <button onClick={onCreate}>등록</button>
        </div>
    );
});
export default React.memo(CreateUser);