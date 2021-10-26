import React from 'react';
import Tr from './Tr';

const Table = ({ tableData, dispatch }) => {
    return (
        <table>
            <tbody>
            {Array(tableData.length).fill().map((tr, i) => (
                //dispatch를 tr에 넘김
                //반복문 key 필수
                <Tr key={i} dispatch={dispatch} rowIndex={i} rowData={tableData[i]} />
            ))}
            </tbody>
        </table>
    );
};

export default Table;