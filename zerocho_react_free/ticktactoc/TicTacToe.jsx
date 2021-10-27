import React, {useEffect, useReducer, useCallback} from "react";
import Table from './Table';
/*
* 규모가 작으면 context api랑 useReducer로 커버 가능
* 규모가 크면 비동기 부분 처리를 위해 리덕스를 써야함 (2019년 하반기 기준)
* 요즘은 리덕스안쓰고 머쓰지??
*
* 쪼갤수있는대로 쪼개야 성능최적화에 좋음
* */

/**
 * useState를 계속 만들면 문제점
 * 실제 유저가 클릭하는건 TD
 * 하지만 state를 TicTacToc이 관리하기 때문에
 * MineSearch -> Table -> Tr - > td까지 state를 전달해줘야함
 *
 * state가 계속 늘어나면 관리도 힘들고 자식에 넘겨주기도 힘드니 이걸 해결하는 방법인
 * useReducer를 이용
 * 이걸 쓰면 하나의 state로 통일 가능
 */

//state 역할의 값들을 다 묶어줌
const initialState = {
    winner: '',
    turn: 'O',
    tableData: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ],
};

//action의 이름은 상수로 빼는게 좋음, 대문자로 하는게 규칙
//다른 컴포넌트에서 사용하니 export로 고고, 그리고 다른 컴포넌트에서 import 고고
export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

//reducer안에서 state를 어떻게 바꿀지 적어주는것
const reducer = (state, action) => {
    switch (action.type) {
        case SET_WINNER:
            // state.winner = action.winner; 이렇게 직접바꾸면 안됨.
            //새로운 객체를 만들어서 바뀔 부분만 바꿈(불변성)
            return {
                ...state,
                winner: action.winner,
            };
            //불변성 지키기 위해 조금 복잡해짐
        case CLICK_CELL: {
            const tableData = [...state.tableData]; //기존의 테이블 데이터를 얉은 복사(...)
            //불변성 지키는거의 단점
            //객체가 있으면 얉은 복사를 해줘야됨 => 단점, Td 컴포넌트의 row와 cell을 가져옴(?)
            tableData[action.row] = [...tableData[action.row]]; // immer라는 라이브러리로 가독성 해결(유료 강좌)
            tableData[action.row][action.cell] = state.turn; //현재턴(O,X)에 있는게 테이블 데이터에 들어감
            return {
                ...state,
                tableData,
                recentCell: [action.row, action.cell], //최근에 눌렀던 칸 기억
            };
        }
        case CHANGE_TURN: {
            return {
                ...state,
                turn: state.turn === 'O' ? 'X' : 'O',
            };
        }
        case RESET_GAME: {
            return {
                ...state,
                turn: 'O',
                tableData: [
                    ['', '', ''],
                    ['', '', ''],
                    ['', '', ''],
                ],
                recentCell: [-1, -1],
            };
        }
        default:
            return state;
    }
};

const TicTacToe = () => {
    //setState도 dispatch로 한방에 모아서 처리, state를 action을 통해서만 바꿈
    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, turn, winner, recentCell } = state; //state 한방에 모아서 처리
    // const [winner, setWinner] = useState('');
    // const [turn, setTurn] = useState('O');
    // const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']]);

    const onClickTable = useCallback( () => {
        //dispatch안에 들어가는건 action 객체이라 부름
        //dispatch하면 action 객체를 실행한다고 생각
        //액션만 있다고 해서 자동으로 state가 바뀌는게 아님
        //이 액션을 해석해서 직접 state를 바꿔주는 역할이 필요 => 이게 리듀서
        //즉, 액션을  dispatch할떄마다 reducer가 실행됨
        dispatch({type:'SET_WINNER', winner: '0'})
    }, []);

    //비동기인 state에서 뭔가처리할라면 useEffect를 쓴다
    useEffect(() => {
        const [row, cell] = recentCell;
        if (row < 0) { //초기화값 거름 (-1, -1)
            return;
        }
        let win = false;
        //가로줄 검사
        if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
            win = true;
        }
        //세로줄 검사
        if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
            win = true;
        }
        //대각선 검사
        if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
            win = true;
        }
        //반대로 대각선 검사
        if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
            win = true;
        }
        console.log(win, row, cell, tableData, turn);
        if (win) { // 승리시
            dispatch({ type: SET_WINNER, winner: turn });
            dispatch({ type: RESET_GAME });
        } else {
            let all = true; // all이 true면 무승부라는 뜻(칸이 다 차있으면 무승부)
            tableData.forEach((row) => { // 무승부 검사
                row.forEach((cell) => {
                    if (!cell) {
                        all = false;
                    }
                });
            });
            if (all) {
                dispatch({ type: SET_WINNER, winner: null });
                dispatch({ type: RESET_GAME });
            } else {
                dispatch({ type: CHANGE_TURN });
            }
        }
    }, [recentCell]);

    return (
        <>
            {/*dispatch를 td까지 넘겨야함(단점) 이를 한번에 옮길려면 context api 쓰면 됨*/}
            <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch} />
            {state.winner && <div>{state.winner}님의 승리</div>}
        </>
    )
}

export default TicTacToe;