import React from 'react';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import NumberBaseball from "../baseball/NumberBaseball";
import RSP from "../rocksizerpaper/my-app/src/RSP";
import Lotto from "../lotto/Lotto";
//StaticRounter는 서버쪽에서 많이 씀
//HashRotuer랑 BrowserRouter를 많이 씀
//제일 많이 쓰는건 BrowserRouter
//단점 : 새로고침할떄 안뜸(서버에서 추가적인 세팅을 하면 됨)
//실무에는 더적합한데, 신경쓸게 많음

//HashRouter는 주소 중간에 /#/가 들어가 있음
//>장점은 새로고침을 해도 서버에는 인식을 못해서 새로고침해도 뜸
//>단점은 검색엔진할때 불이익을 받음 (검색엔진들이 인식을 못함), 그래서 실무에선 잘 안씀
//관리자 페이지같은경우는 hashrouter 써도됨
//※ 브라우저라우터를 사용해도 SEO을 위해 따로 세팅이 필요함

//리액트는 눈속임이다
//페이지가 여러개 있는 척 하는거다
//리액트 라우터가 가상으로 만든거다
//a태그가 아닌 Link를 써야함
//리액트 라우터가 아닌 url에서 엔터해서 들어가면 서버에 요청하는거임(서버는 모르니 에러뜸) (새로고침 하면 서버에 요청)
const Games = () => {
    return (
        <BrowserRouter>
            {/* Route부분을 불러주는 역할*/}
            {/* Link들이 있는게 공통적인 레이아웃*/}
            {/* Router있는 부분이 바뀌는 부분*/}
            <div>
                공통인 부분
                <Link to="/game/number-baseball">숫자야구</Link>
                &nbsp;
                <Link to="/game/rock-scissors-paper">가위바위보</Link>
                &nbsp;
                <Link to="/game/lotto-generator">로또생성기</Link>
                &nbsp;
                <Link to="/game/index">게임 매쳐</Link>
            </div>
            <div>
                {/*:name부분이 동적으로 바뀜(파람 부분)*/}
                {/*<Route path="/game/:name" component={GameMatcher}></Route>*/}

                {/*라우트중에서 첫번째로 일치하는 것만 렌더링 하고 싶다면 switch 사용*/}
                {/*같은게 두번이상 나오는게 의도가 아니라면 Switch로 감싸는게 맞음*/}
                <Switch>
                    {/* render를 사용하여 부모의 props를 자식에게 전달, 오직 props넘기는 목적이면 component보단 render 쓰는거 추천*/}

                    {/*주소가 정확하게 일치하는 경우에만 exact 사용, 그냥 path="/"만 쓰면 /game/number-baseball도 인식해서 렌더링 함*/}
                    {/*즉 상위주소도 일치하는 걸로 쳐서 두개이상이 렌더링 됨*/}
                    <Route exact path="/" render={(props) =>
                        <GameMatcher {...props} />} />
                    {/*이건 동적 라우팅*/}
                    <Route path="/game/:name" render={(props) =>
                        <GameMatcher {...props} />} />
                </Switch>
            </div>
        </BrowserRouter>
    )
}

//withRouter
export default Games;