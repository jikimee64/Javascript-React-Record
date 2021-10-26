import React, {useState, useRef, useEffect, useMemo, useCallback} from 'react';
import Ball from './Ball';

function getWinNumbers() {
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber];
}

//훅스는 전체가 다시 실행됨
//훅스는 선언 순서가 제일 중요함
const Lotto = () => {
    //useMemo를 써서 getWinNumbers가 한번만 실행하고 캐싱한걸 가져다 씀
    //두번째 배열의 요소가 바뀌면 다시실행됨
    //useMemo : 복잡한 함수 결괏값을 기억
    //useRef : 일반 값을 기억
    //훅스는 최상위
    const lottoNumbers = useMemo(() => getWinNumbers(), []);
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]);

    //조건문 안에 반드시 금지 (함수나 반복문 안에도 넣지 말기)
    // if(조건){
    //     const [redo, setRedo] = useState(false);
    // }

    //패턴(꼼수0) : componentedDidUpdate일때만 실행하고 싶을때
    const mounted = useRef(false);
    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
        } else {
            //바뀌는 값에 따라 실행되는 부분
            //ajax 요청
        }
    }, []) //componentedDidUpdate만, componentDidMount는 실행은 되지만 아무것도 안함

    //다른 훅스안에 useState 쓰는거 금지
    useEffect(() => {
        console.log('useEffect');
        for (let i = 0; i < winNumbers.length - 1; i++) {
            //timeouts.current 가 바뀌는게 아님(current 배열의 요소에 넣어준거라서)
            timeouts.current[i] = setTimeout(() => {
                setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
            }, (i + 1) * 1000);
        }
        timeouts.current[6] = setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 7000);
        return () => {
            timeouts.current.forEach((v) => {
                clearTimeout(v);
            });
        };
    }, [timeouts.current]); // 빈 배열이면 componentDidMount와 동일
    // 배열에 요소가 있으면 componentDidMount랑 componentDidUpdate 둘 다 수행

    useEffect(() => {
        console.log('로또 숫자를 생성합니다.');
    }, [winNumbers]);

    //useCallback : 함수자체를 기억
    //렌더링될때 이부분은 처음만 생성되고 나중엔 X
    //자식 컴포넌트에 함수를 넘길때는 반드시 userCallback을 써야함, 매번 새로운 함수를 생성할 필요가 없으므로
    //자식은 새로운 함수를 받으면 리렌더링을 함
    const onClickRedo = useCallback(() => {
        console.log('onClickRedo');
        console.log(winNumbers);//모든함수를 useCallback으로 감쌀떄 문제점, 당첨숫자가 바뀌지 않음
        //useCallback안에서 쓰이는 state는 항상 deps(두번째 인자)에다가 넣어줘야함
        //winNumbers가 바뀌면 userCallback이 새로실행됨
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = []; //timeouts.current가 달라지는것 (current에 직접 넣어져서 예전꺼랑 달라짐)
    }, [winNumbers]);

    return (
        <>
            <div>당첨 숫자</div>
            <div id="결과창">
                {winBalls.map((v) => <Ball key={v} number={v}/>)}
            </div>
            <div>보너스!</div>
            {bonus && <Ball number={bonus} onClick={onClickRedo}/>}
            {redo && <button onClick={onClickRedo}>한 번 더!</button>}
        </>
    );
};

export default Lotto;