import React, {useRef, useState, useCallback} from "react";
import Try from './Try';

const getNumbers = () => {
    const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const array = [];
    for (let i = 0; i < 4; i += 1) {
        const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
};

//함수 컴포넌트는 클래스와 달리 value가 바귀어도 통째로 실행됨
const NumberBaseball = () => {
    //value가 바뀌어도 getNumbers()가 재실행됨(헤비한 함수면 안좋음),원래는 처음에만 실행해야함
    //usememo, useCallback으로 해결 가능 (useEffect 선행학습하고 해야 더 좋음)

    const [answer, setAnswer] = useState(getNumbers());
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const [tries, setTries] = useState([]);
    const inputEl = useRef(null);

    //useCallback : 첫번째 인자로 넘어온 함수를, 두번째 인자로 넘어온 배열 내의 값이
    // 변경될 때까지 저장해놓고 재사용할 수 있게 해줍니다.
    const onSubmitForm = useCallback((e) => {
        e.preventDefault();
        if (value === answer.join('')) {
            setTries((t) => ([
                ...t,
                {
                    try: value,
                    result: '홈런!'
                }
            ]));
            setResult('홈런!');
            alert('게임을 다시 시작합니다')
            setValue('');
            setAnswer(getNumbers());
            setTries([]);
            inputEl.current.focus();
        } else {
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (tries.length >= 9) {
                setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`); // state set은 비동기
                alert('게임을 다시 시작합니다.');
                setValue('');
                setAnswer(getNumbers());
                setTries([]);
                inputEl.current.focus();
            } else {
                console.log('답은', answer.join(''));
                for (let i = 0; i < 4; i += 1) {
                    if (answerArray[i] === answer[i]) {
                        console.log('strike', answerArray[i], answer[i]);
                        strike += 1;
                    } else if (answer.includes(answerArray[i])) {
                        console.log('ball', answerArray[i], answer.indexOf(answerArray[i]));
                        ball += 1;
                    }
                }
                setTries(t => ([
                    ...t,
                    {
                        try: value,
                        result: `${strike} 스트라이크, ${ball} 볼입니다.`,
                    }
                ]));
                setValue('');
                inputEl.current.focus();
            }
        }
    },[value, answer]);
    //deps: value와 answer의 값이 바뀔때 새로운 함수를 생성, 동일하면 기존 함수 재사용

    //useCallback : 첫번째 인자로 넘어온 함수를, 두번째 인자로 넘어온 배열 내의 값이
    // 변경될 때까지 저장해놓고 재사용할 수 있게 해줍니다.
    const onChangeInput = useCallback((e) => setValue(e.target.value), []);

    return (
        <>
            <h1>{result}</h1>
            <form onSubmit={onSubmitForm}>
                <input
                    ref={inputEl}
                    maxLength={4}
                    value={value}
                    onChange={onChangeInput}
                />
                <button>입력!</button>
            </form>
            <div>시도: {tries.length}</div>
            <ul>
                {tries.map((v, i) => (
                    <Try key={`${i + 1}차 시도 : ${v.try}`} tryInfo={v}/>
                ))}
            </ul>
        </>
    )
};

export default NumberBaseball;