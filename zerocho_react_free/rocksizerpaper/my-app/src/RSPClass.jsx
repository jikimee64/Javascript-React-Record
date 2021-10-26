import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';

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

//Object.entries [키, value]로 배열로 반환
const computerChoice = (imgCoord) => {
    console.log(imgCoord);
    return Object.entries(rspCoords).find(function(v) {
        //0은 key값, 1은 value값
        return v[1] === imgCoord;
    })[0]; //key값을 반환
};

// 클래스 라이프 사이클 -> state나 메소드나 생성자를 클래스에 붙임 -> render() 한번 실행
// -> ref를 설정하는 부분이 실행 -> componentDidMount -> 화면에 보임
// => setState/props 바뀔때
// -> shouldComponentUpdate(return true일경우 리렌더링 일어남)
// -> render -> componentDidUpdate) -> 부모가 나를 없앴을 때
// -> componentWillUnmount -> 소멸

class RSPClass extends Component {
    state = {
        result: '',
        imgCoord: rspCoords.바위,
        score: 0,
    };

    // 컴포넌트가 처음 렌더링된 후(render()가 처음 실행된 후)
    // 여기에 비동기 요청을 많이 해요(+ setInterval or setTimout, 라이브러리 사용(D3, video.js),
    //+ props로 받은 값을 컴포넌트의 로컬 상태로 설정
    //리 렌더링할때는 실행 X
    //setInterval, setTimeout 같은거 안지우면 메모리 차다가 터짐(메모리 누수) ★★★
    componentDidMount() {
        this.interval = setInterval(this.changeHand, 100);
    }

    //리렌더링 후 실행되는 곳
    //보통 부모에 의해서 내가 없어질 때 실행됨
    componentDidUpdate(){

    }

    // 컴포넌트가 제거되기 직전, 비동기 요청 정리를 많이 해요
    //보통 componentDidMount에서 만든걸 제거하는 역할
    componentWillUnmount() {
        //여기서 이거 안해주면 컴포넌트가 사라졌다하더라도
        // 안지우면 계속 실행하고 있음
        clearInterval(this.interval);
    }

    //render()안에 넣으면 setState가 들어가기 때문에 무한 렌더링 발생
    changeHand = () => {
        const {imgCoord} = this.state;
        if (imgCoord === rspCoords.바위) {
            this.setState({
                imgCoord: rspCoords.가위,
            });
        } else if (imgCoord === rspCoords.가위) {
            this.setState({
                imgCoord: rspCoords.보,
            });
        } else if (imgCoord === rspCoords.보) {
            this.setState({
                imgCoord: rspCoords.바위,
            });
        }
    };

    //고차함수 패턴(리액트에서 자주 쓰임 ★★★★★)
    //onClick에서 원래는 onClick={(e) => this.onClicnBtn('바위')} 였음
    //onClick={this.onClickBtn('바위')} << 이렇게 바꾼뒤
    // () => { 처럼 '()' 추가 (순서 중요)
    //보통 매개변수 받아서 쓰거나 중복줄이기 위해 사용
    onClickBtn = (choice) => (e) => {
        //e.preventDefault() 이렇게 사용 가능
        const {imgCoord} = this.state;
        clearInterval(this.interval);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        console.log(`cpuScore : ${cpuScore}`)
        const diff = myScore - cpuScore;
        if (diff === 0) {
            this.setState({
                result: '비겼습니다!',
            });
        } else if ([-1, 2].includes(diff)) {
            this.setState((prevState) => {
                return {
                    result: '이겼습니다!',
                    score: prevState.score + 1,
                };
            });
        } else {
            this.setState((prevState) => {
                return {
                    result: '졌습니다!',
                    score: prevState.score - 1,
                };
            });
        }
        setTimeout(() => {
            this.interval = setInterval(this.changeHand, 100);
        }, 1000);
    };

    //onClick : 메소드안에 함수를 호출하는 부분은
    //this.onClickBtn('바위') 이게 고차 함수 !!!!
    render() {
        const { result, score, imgCoord } = this.state;
        return (
            <>
                <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
                <div>
                    <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
                    <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
                    <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score}점</div>
            </>
        );
    }
}

export default RSPClass;