import React, {Component} from 'react';

class ResponseCheckClass extends Component {
    state = {
        state: 'waiting',
        message: '클랙해서 시작하세요.',
        result: []
    };

    onClickScreen = (e) => {

    };

    renderAverage = () => {
        const {result} = this.state;
        return result.length === 0
            ? null
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