import React, { memo, useState } from 'react';

//memo : 자식 컴포넌트의 랜더링의 불필요한 랜더링을 줄이기 위해서
// React.memo() 함수와도 사용할 수 있습니다.
//props 값이 변경되지 않는 한 다시 호출되지 않습니다.
const Try = memo(({tryInfo}) => {
    tryInfo.try = 'hello'//이거 절대하면안됨, 자식이 직접 값을 바꾸면 안됨,부모가 바꿔야함(리액트 원칙)
    //왜? 자식이 바꾸면 부모에게도 영항을 끼치기 때문에
    //만약 자식에서 바꿔야된다면?(실무에서 종종 일어남)
    //props를 state로 바꾼다음 그 state를 바꿈
    const [result, setResult] = useState(tryInfo.result); //좋은 구조는 아니긴 함

    const onClick = () => {
        setResult('1');
    }

    return (
        <li>
            <div>{tryInfo.try}</div>
            <div onClick={onCLick}>{tryInfo.result}</div>
        </li>
    );
});

export default Try;