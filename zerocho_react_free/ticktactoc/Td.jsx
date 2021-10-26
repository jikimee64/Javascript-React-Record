import React, { useCallback, memo, useEffect, useRef } from 'react';
import { CLICK_CELL } from './TicTacToe';

//반복문 있는애들을 memo 하는게 좋음, memo를 적용했는데도 최적화가 안되면 useMemo 쓰기
const Td = memo(({ rowIndex, cellIndex, dispatch, cellData }) => {
    console.log('td rendered');

    //머때문에 렌더링되는지 확인하기
    //이방법 편함 ★★★★★★★★★★★★★★★★★★★
    // const ref = useRef([]);
    // useEffect( () => {
    //     //바뀌는게 있다면 false, false로 뜨는게 문제임(애때문에 리렌더링이 뜸)
    //     console.log(rowIndex === ref.current[0],
    //         cellIndex === ref.current[1],
    //         dispatch === ref.current[2],
    //         cellData === ref.current[3])
    //     console.log(cellData, ref.current[3]);
    //     ref.current = [rowIndex, cellIndex, dispatch, cellData];
    // },[rowIndex, cellIndex, dispatch, cellData])

    const onClickTd = useCallback(() => {
        console.log(rowIndex, cellIndex);
        if (cellData) {
            return;
        }
        //state를 바꾸는거니 action을 만듬, 액션은 마음대로 만들되. 리듀서에서 잘 처리만 하면됨
        //useReducer는 state가 비동기적으로 바꿈(리덕스는 동기)
        dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
    }, [cellData]); //바귈여지가 있는 state를 []에 넣어주기

    //props로 넣어두는 데이터(onClickTd)는 useCallback으로 왠만하면 감싸기
    return (
        <td onClick={onClickTd}>{cellData}</td>
    )
});

export default Td;