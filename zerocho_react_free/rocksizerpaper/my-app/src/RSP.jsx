import React, { useState, useRef, useEffect } from 'react';

const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px',
};

const scores = {
    가위: 1,
    바위: 0,
    보: -1,
};

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function(v) {
        return v[1] === imgCoord;
    })[0];
};

//                        result, imgCoord, score
// componentDidMount
// componentDidUpdate
// componentWillUnmount

//클래스 형(한번에 처리)
// componentDidMount() {
//   this.setState({
//     imgCoord: 3,
//     score: 1,
//     result: 2,
//   })
// }

//리액트 훅형(state 마다 따로 처리)
// useEffect(() => {
//   setImgCoord();
//   setScore();
// }, [imgCoord, score]);
// useEffect(() => {
//   setResult();
// }, [result]);

const RSP = () => {
    const [result, setResult] = useState('');
    const [imgCoord, setImgCoord] = useState(rspCoords.바위);
    const [score, setScore] = useState(0);
    const interval = useRef();

    //useLayoutEffect : 화면이 바뀌기 전에 발생(화면 변화감지 발생, 잘안쓰는듯?)
    //useEffect는 화면이 완전히 바뀌고 난 후에 발생

    //추가 참고링크 : https://react.vlpt.us/basic/16-useEffect.html
    /**
     * 함수 컴포넌트 안에 적어야 함
     * componentDidMount + componentDidUpdate + componentWillUnmount : 합친 역할
     */
    // useEffect 안에서 사용하는 상태나, props 가 있다면, useEffect 의 deps 에 넣어주어야 합니다.
    // 그렇게 하는게, 규칙입니다.
    /**
     * 화면이 처음 떴을때 실행.
     deps에 [] 빈배열을 넣을 떄.
     life cycle중 componentDidmount처럼 실행

     화면이 사라질때 실행(clean up함수).
     componentWillUnmount처럼 실행

     deps에 넣은 파라미터값이 업데이트 됬을때 실행.
     componentDidUpdate처럼 실행.
     */
    useEffect(() => { // componentDidMount, componentDidUpdate 역할(1대1 대응은 아님)
        console.log('다시 실행');
        interval.current = setInterval(changeHand, 100);
        return () => { // componentWillUnmount 역할 (cleanUp 함수라고도 부름)
            console.log('종료');
            clearInterval(interval.current);
        }
    }, [imgCoord]); //여러개 넣을 수 있음, 배열에는 꼭 useEffect를 다시 실행할 값만 넣어야됨
    //useEffect을 실행하고 싶은 state를 설정
    //deps의 배열을 비우면 컴포넌트가 처음 나타날때에만 useEffect에 등록된 함수가 호출
    //배열에 값을 넣으면 컴포넌트가 처음 마운트 될 때에도 호출되고, 지정한 값이 바뀔때도 호출됨

    //useEffect 여러개 쓰기 가능


    const changeHand = () => {
        if (imgCoord === rspCoords.바위) {
            setImgCoord(rspCoords.가위);
        } else if (imgCoord === rspCoords.가위) {
            setImgCoord(rspCoords.보);
        } else if (imgCoord === rspCoords.보) {
            setImgCoord(rspCoords.바위);
        }
    };

    const onClickBtn = (choice) => () => {
        if (interval.current) {
            clearInterval(interval.current);
            interval.current = null;
            const myScore = scores[choice];
            const cpuScore = scores[computerChoice(imgCoord)];
            const diff = myScore - cpuScore;
            if (diff === 0) {
                setResult('비겼습니다!');
            } else if ([-1, 2].includes(diff)) {
                setResult('이겼습니다!');
                setScore((prevScore) => prevScore + 1);
            } else {
                setResult('졌습니다!');
                setScore((prevScore) => prevScore - 1);
            }
            setTimeout(() => {
                interval.current = setInterval(changeHand, 100);
            }, 1000);
        }
    };

    return (
        <>
            <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
            <div>
                <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
                <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
                <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 {score}점</div>
        </>
    );
};

export default RSP;