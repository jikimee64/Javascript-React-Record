import React, { useState, useCallback } from "react";
import useInput from "./useInputs2";

//1. useInputs 사용하기 전
// const [text, setText] = useState({
//     email: "",
//     password:""
// });
//
// const onChange = useCallback( e => {
//     const {value, name } = e.target;
//     setText({...text, [name]: value});
// }, [text]);

//2. useInputs 사용후
const [text, setText] = useInput({
    email:"",
    password:""
})

return (
    <>
        <input type="text" id="email" value={text.email} onChange={onChange}/>
        <input type="text" id="password" value={text.email} onChange={onChange}/>
    </>
)