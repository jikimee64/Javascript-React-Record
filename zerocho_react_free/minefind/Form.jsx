import React, { useState, useCallback, useContext, memo } from 'react';
import { START_GAME, TableContext } from './MineSearch';

//하위컴포넌트들의 모두 다 memo를 적용해야 상위 컴포넌트들도 memo적용 가능
const Form = memo(() => {
    const [row, setRow] = useState(10); //세로몇줄
    const [cell, setCell] = useState(10); //칸 몇개
    const [mine, setMine] = useState(20); //지뢰 몇개할지
    const { dispatch } = useContext(TableContext);

    //불필요한 렌더링 막기 위해 useCallBack
    const onChangeRow = useCallback((e) => {
        setRow(e.target.value);
    }, []);

    const onChangeCell = useCallback((e) => {
        setCell(e.target.value);
    }, []);

    const onChangeMine = useCallback((e) => {
        setMine(e.target.value);
    }, []);

    //context api 적용 ★★★★★
    //입력한 값을 전달해줌
    const onClickBtn = useCallback(() => {
        dispatch({ type: START_GAME, row, cell, mine });
    }, [row, cell, mine]);

    return (
        <div>
            <input type="number" placeholder="세로" value={row} onChange={onChangeRow} />
            <input type="number" placeholder="가로" value={cell} onChange={onChangeCell} />
            <input type="number" placeholder="지뢰" value={mine} onChange={onChangeMine} />
            <button onClick={onClickBtn}>시작</button>
        </div>
    );
});

export default Form;