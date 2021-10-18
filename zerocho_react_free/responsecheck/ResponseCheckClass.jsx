import React, {Component} from 'react';

class ResponseCheckClass extends Component {
    state = {
        state: 'waiting',
        message: '클랙해서 시작하세요.',
        result: []
    };

    //렌더링을 일어나게 하고싶지 않은 애들
    //state에 넣으면 > state가 바뀌면 렌더링이 다시됨
    //this 객체의 속성들
    timeout;
    startTime;
    endTime;

    //setTimeout은 2~3초 후에 콜스택으로 넘어가버려서 실행
    //clearTimeout으로 취소 가능
    onClickScreen = () => {
        const { state } = this.state;
        if (state === 'waiting') {
            timeout.current = setTimeout(() => {
                this.setState({
                    state: 'now',
                    message: '지금 클릭',
                });
                this.startTime = new Date();
            }, Math.floor(Math.random() * 1000) + 2000); // 2초~3초 랜덤
            this.setState({
                state: 'ready',
                message: '초록색이 되면 클릭하세요.',
            });
        } else if (state === 'ready') { // 성급하게 클릭
            clearTimeout(this.timeout);
            this.setState({
                state: 'waiting',
                message: '너무 성급하시군요! 초록색이 된 후에 클릭하세요.',
            });
        } else if (state === 'now') { // 반응속도 체크
            endTime.current = new Date();
            this.setState((prevState) => {
                return {
                    state: 'waiting',
                    message: '클릭해서 시작하세요.',
                    result: [...prevState.result, this.endTime, this.startTime],
                };
            });
        }
    };

    onReset = () => {
        this.setState({
            result: [],
        });
    };

    //리액트의 조건문
    //사실 함수보단 새로운 컴포넌트로 빼는게 좋음(result를 props로 내려줌)
    //result값에 따라 달라지면 랜더링함, 이부분이 바뀌어도 74 ~ 80도 무조껀 바뀜(안좋음, 컴포넌트 분리하는게 좋음)
    renderAverage = () => {
        const {result} = this.state;
        return result.length === 0
            ? null //jsx에서는 null이 태그가 아예 없는거임
            : <>
                <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
                <button onClick={this.onReset}>리셋</button>
            </>
    };

    //jsx에서 for과 if을 보통은 못씀
    render() {
        const { state, message } = this.state;
        return (
            <>
                <div
                    id="screen"
                    className={state}
                    onClick={this.onClickScreen}
                >
                    {message}
                </div>
                {this.renderAverage()}
            </>
        )
    }
}

export default ResponseCheckClass;