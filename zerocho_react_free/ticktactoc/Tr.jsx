import React, {memo, useMemo} from 'react';
import Td from './Td';

//반복문 있는애들을 memo 하는게 좋음, memo를 적용했는데도 최적화가 안되면 useMemo 쓰기
const Tr = memo(({rowData, rowIndex, dispatch}) => {
    console.log('tr rendered');
    return (
        <tr>
            {Array(rowData.length).fill().map((td, i) => (
                //dispatch를 td로 넘김
                //반복문 key 필수
                useMemo( () =>
                    <Td key={i} dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]}>{''}</Td>,
                    [rowData[i]])
            ))}
        </tr>
    );
});

export default Tr;