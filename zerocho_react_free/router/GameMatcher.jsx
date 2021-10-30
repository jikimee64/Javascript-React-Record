import React, {Component} from "react";
import NumberBaseball from "../baseball/NumberBaseball";
import RSP from "../rocksizerpaper/my-app/src/RSP";
import Lotto from "../lotto/Lotto";

//동적 라우트 매핑 개념

class GameMatcher extends Component {
    render() {
        console.log(this.props); // Route 컴포넌트가 props로 history, location.match를 넘겨줌
        //history: 페이지 넘나든 내역을 간직, 앞으로가기, 뒤로가기 함수 등 있음
        //페이지 넘나들은 api를 기본 브라우저의 api로 쓰면안되고 리액트 라우터에서 제공해주는 걸  써야함
        //location:
        //>location의 search부분에 param에 대한 정보가 있음
        //match: 라우터에 등록한 path를 가지고 있음, params도 가지고 있음

        let urlSearchParams = new URLSearchParams(this.props.location.search.slice(1));
        console.log(urlSearchParams.get('hello'));

        if (this.props.match.params.name === 'number-baseball') { //:옆에 붙은 정보
            return <NumberBaseball />
        } else if (this.props.match.params.name === 'rock-scissors-paper') {
            return <RSP />
        } else if (this.props.match.params.name === 'lotto-generator') {
            return <Lotto />
        }

        return (
            <div>
                일치하는 게임이 없습니다.
            </div>
        )
    }
}

export default GameMatcher;
