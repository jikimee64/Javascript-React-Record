import React, { useContext, memo} from 'react';
import Tr from './Tr';
import { TableContext } from "./MineSearch";

const Table = memo( () => {
    //value.tableData를 가져옴
    const { tableData } = useContext(TableContext)
    return (
        <table>
            {Array(tableData.length).fill().map((tr, i) => <Tr rowIndex={i} />)}
        </table>
    )
});

export default Table;