import React, { memo } from 'react';

//훅스가 아님, 그냥 함수 컴포넌트임, 훅스는 useState, useEffect 쓰는게 훅스임
//state를 안쓰는 애들은 그냥 이렇게...
const Ball = memo(({ number }) => { //memo or purecomponent
    let background;
    if (number <= 10) {
        background = 'red';
    } else if (number <= 20) {
        background = 'orange';
    } else if (number <= 30) {
        background = 'yellow';
    } else if (number <= 40) {
        background = 'blue';
    } else {
        background = 'green';
    }

    return (
        <div className="ball" style={{ background }}>{number}</div>
    )
});

export default Ball;