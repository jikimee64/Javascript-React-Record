import React, { Component } from 'react';
import Ball from './Ball';

//계산량이 많은 알고리즘, 반복실행되면 안됨
function getWinNumbers() {
    console.log('getWinNumbers'); //반복실행 체크
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber];
}

class Lotto extends Component {
    state = {
        winNumbers: getWinNumbers(), // 당첨 숫자들
        winBalls: [],
        bonus: null, // 보너스 공
        redo: false,
    };

    timeouts = [];

    runTimeouts = () => {
        console.log('runTimeouts');
        const { winNumbers } = this.state; //구조분해
        //let을 쓰면 클로저문제 안생김
        for (let i = 0; i < winNumbers.length - 1; i++) {
            this.timeouts[i] = setTimeout(() => {
                this.setState((prevState) => {
                    return {
                        //리액트에서 state 배열에다가 값을 넣을대는 push X, 이렇게 해야됨
                        //예전 state 이용해서 값을 넣어야 함
                        winBalls: [...prevState.winBalls, winNumbers[i]],
                    };
                });
            }, (i + 1) * 1000); //1초마다...
        }
        //보너스 공
        this.timeouts[6] = setTimeout(() => {
            this.setState({
                bonus: winNumbers[6],
                redo: true, //한번더 버튼 표시
            });
        }, 7000);
    };

    componentDidMount() {
        console.log('didMount');
        this.runTimeouts();
        console.log('로또 숫자를 생성합니다.');
    }

    //state가 바뀌었을때 실행
    //조건문을 줘서 업데이트하고 싶은 상황을 주면됨(주의)
    //prevProps : 부모한테 받은 props
    componentDidUpdate(prevProps, prevState) {
        console.log('didUpdate');
        if (this.state.winBalls.length === 0) {
            this.runTimeouts();
        }
        if (prevState.winNumbers !== this.state.winNumbers) {
            console.log('로또 숫자를 생성합니다.');
        }
    }

    //부모 컴퍼넌트가 자식컴포넌트를 없앨 수 있음
    //그럴때 setTimeout을 항상 clear 해줘야함
    //state는 컴포넌트에 귀속된상태
    //결론 : 로또 컴포넌트를 없엘때 설정된 timeout도 clear 해줘야 함
    componentWillUnmount() {
        this.timeouts.forEach((v) => {
            clearTimeout(v);
        });
    }

    onClickRedo = () => {
        console.log('onClickRedo');
        this.setState({
            winNumbers: getWinNumbers(), // 당첨 숫자들
            winBalls: [],
            bonus: null, // 보너스 공
            redo: false,
        });
        this.timeouts = [];
    };

    //반복문을 기점으로 컴포넌트를 분리
    render() {
        const { winBalls, bonus, redo } = this.state;
        return (
            <>
                <div>당첨 숫자</div>
                <div id="결과창">
                    {winBalls.map((v) => <Ball key={v} number={v} />)}
                </div>
                <div>보너스!</div>
                {bonus && <Ball number={bonus} />}
                {redo && <button onClick={this.onClickRedo}>한 번 더!</button>}
            </>
        );
    }
}

export default Lotto;