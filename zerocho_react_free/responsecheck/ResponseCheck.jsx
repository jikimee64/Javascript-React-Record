import React, { useState, useRef, useCallback, useMemo } from 'react';

const ResponseCheck = () => {
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요.');
    const [result, setResult] = useState([]);

    //class에서는 보통 ref는 DOM에 직접 접근할떄만..
    //훅에서는 this에 접근할때도 사용가능(훅에서 추가됨)
    //useRef라서 .current로 해줘야됨
    //useRef의 값을 바꿔도 render()부분이 재실행되지 않음
    //즉, 값이바뀌기는 하지만 화면에 영향을 주고싶지 않을때 사용 가능(변하는 값을 잠깐 기록하는 걸로 생각)
    const timeout = useRef(null);
    const startTime = useRef(0);
    const endTime = useRef(0);

    const onClickScreen = useCallback(() => {
        if (state === 'waiting') {
            timeout.current = setTimeout(() => {
                setState('now');
                setMessage('지금 클릭');
                startTime.current = new Date();
            }, Math.floor(Math.random() * 1000) + 2000); // 2초~3초 랜덤
            setState('ready');
            setMessage('초록색이 되면 클릭하세요.');
        } else if (state === 'ready') { // 성급하게 클릭
            clearTimeout(timeout.current);
            setState('waiting');
            setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요.');
        } else if (state === 'now') { // 반응속도 체크
            endTime.current = new Date();
            setState('waiting');
            setMessage('클릭해서 시작하세요.');
            setResult((prevResult) => {
                return [...prevResult, endTime.current - startTime.current];
            });
        }
    }, [state]);

    const onReset = useCallback(() => {
        setResult([]);
    }, []);

    const renderAverage = () => {
        return result.length === 0
            ? null
            : <>
                <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
                <button onClick={onReset}>리셋</button>
            </>
    };

    //배열을 리턴하는 경우도 있음(거의 쓰이진 않음), 껍데기 태그를 많이 씀
    //배열을 할때는 key를 넣어줘야함
    return [
        <div key="사과"></div>,
        <div key="사과"></div>,
        <div key="사과"></div>,
        <div key="사과"></div>,
        <div key="사과"></div>,
    ]

    return (
        <>
            <div
                id="screen"
                className={state}
                onClick={onClickScreen}
            >
                {message}
            </div>
            {renderAverage()}
        </>
    );
};

export default ResponseCheck;