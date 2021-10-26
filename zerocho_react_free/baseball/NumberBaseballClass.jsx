//require 대신에 import를 씀
//require는 node의 모듈 시스템, 다른 jsx파일에서 module.exports한걸 가져옴
//남이만든 스크립트도 require로 가져옴
import React, {Component, createRef} from "react";
import TryClass from './TryClass';

// const React = require('react');
// const { Component } = React;
// const { hot } = require('react-hot-loader/root');

function getNumbers() { // 숫자 네 개를 겹치지 않고 랜덤하게 뽑는 함수
    const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const array = [];
    for (let i = 0; i < 4; i += 1) {
        //랜덤으로 뽑힌 숫자의 배열 위치부터 1개를 제거 후 배열의 첫번째 인덱스 값 출력
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

class NumberBaseball extends Component {
    state = {
        result: '',
        value: '',
        answer: getNumbers(), //ex: [1,3,5,7]
        tries: [], // 몇번 시도했는지 넣음, push 금지(리액트 불변성 깨짐)
    };

    //자기가 직접 만드는 함수는 화살표함수 써야됨, 화살표함수안쓸꺼면 생성자 만들어야됨
    //화살표 함수를 안쓰면 this.state와 같이 this를 못씀
    //화살표함수가 bind this를 자동으롷 해줌
    onSubmitForm = (e) => {
        const {value, tries, answer} = this.state;
        e.preventDefault();
        if (value === answer.join('')) {
            this.setState((prevState) => {
                return {
                    result: '홈런!',
                    //... 기존 배열 복사, {넣고싶은것 넣기}(추가) :
                    //이래야 리액트가 이전과 다른값을 눈치채고 재렌더링함
                    tries: [...prevState.tries, {try: value, result: '홈런!'}],
                }
            });
            alert('게임을 다시 시작합니다.');
            this.setState({
                value: '',
                answer: getNumbers(),
                tries: [],
            });
            this.inputRef.current.focus();
        } else { //답 틀렸으면
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (tries.length >= 9) { //10번 이상 틀렸을 때
                this.setState({
                    result: `10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습ㄴ디ㅏㅏ!`,
                });
                alert('게임을 다시 시작합니다!');
                this.setState({
                    value: '',
                    answer: getNumbers(),
                    tries: [],
                });
            } else {
                for (let i = 0; i < 4; i += 1) {
                    if (answerArray[i] === answer[i]) {
                        strike += 1;
                    } else if (answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                }
                this.setState((prevState) => {
                    return {
                        tries: [...prevState.tries, {try: value, result: `${strike} 스트라이크, ${ball} 볼입니다.`}],
                    };
                });
                this.inputRef.current.focus();
            }
        }
    };

    onChangeInput = (e) => {
        this.setState({
            value: e.target.value,
        });
    }

    inputRef = createRef(); // this.inputRef

    //이전버전
    inputRef2
    onInputRef = (c) => { this.inputRef2 = c; };

    //render안에 절대 setState 쓰면 안됨(렌더링 무한반복됨)
    render() {
        //구조 분해(비구조화 할당)
        const {result, value, tries} = this.state;
        return (
            <>
                <h1>{result}</h1>
                {/* 이게주석 */}
                <form onSubmit={this.onSubmitForm}>
                    <input ref={this.inputRef} maxLength={4} value={value} onChange={this.onChangeInput}/>
                </form>
                <div>시도: {tries.length}</div>
                <ul>
                    {tries.map((v, i) => {
                        return (
                            //이 key 케이스는 써도되는 케이스
                            <TryClass key={`${i + 1}차 시도 :`} tryInfo={v}/>
                        );
                    })}
                </ul>
            </>
        );
        //react 반복분쓸떄 key 필수, 안그러면 콘솔에러남
        //리액트가 key를 보고 같은 컴포너트인지 아닌지 판단
        //성능최적화때 key 사용, 고유한 값으로 만들어야함
        //map의 두번째 인자(i, 인덱스)로 key값으로 주면 안됨!!
        // 성능최적화할떄 문제 발생(리액트에서 key를 보고 판단하는데 배열의 순서가 바뀌면 문제발생)
        //다만, 요소가 추가만 되는 배열인 경우 i를 써도 됨

        // <ul>
        //     {
        //         [
        //             {fruit: '사과', taste: '맛있다'},
        //             {fruit: '포도', taste: '맛있다'},
        //         ].map( (v,i) => {
        //             return (
        //                 <li key={v.fruit + v.taste}> <b>{v.fruit}</b> - {v.taste}</li>
        //             )
        //         })
        //     }
        // </ul>
    }
}

export default NumberBaseball; // import NumberBaseball;