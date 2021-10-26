import React, {useState} from 'react'

export default function InputSample() {
    const [inputs, setInputs] = useState({
        name: '',
        nickname:''
    })

    /**
     * 여러 개의 DOM을 다룰 경우 단순히 useState, onChange 를 여러개 만드는 방법이
     * 쉬울 수 있으나 좋은 방법은 아니다. 해서 name을 설정하여
     * 이벤트 발생시 이 값을 참조하여 관리하는 방법이다.
     *
     * 리액트에서는 다음과 같은 연관배열이나 프로퍼티를 통해직접적인 수정을 하면 안된다.
     * inputs[name] = value
     *
     * 대신에 새로운 객체를 생성하여 새 객체에 변화를 주고 이것을 상태로 사용해야 한다.
     *
     * 위와 같이 기존 객체를 통해서 새로운 객체를 생성해 나가며 불변성을 지켜나가야만
     * 리액트 컴포넌트에서 상태가 업데이트 됨을 감지하고 필요해 의하여 리렌더링이 진행된다.
     *
     * 만약 직접 수정하는 경우 값이 바뀌어도 리렌더링이 되지 않는다.
     */
    const {name, nickname} = inputs; //비 구조화 할당으로 값 추출 : {name: "", nickname: ""}
    console.log(inputs);
    const onChange = (e) => {
        const {value, name} = e.target;
        setInputs({
            ...inputs, //기존 객체 복사후
            [name]: value //name 키를 가진 값을 value로 변경
        })
    }

    const onReset = () => {
        setInputs({
            name: '',
            nickname: ''
        })
    };

    return (
        <div>
            <input name="name" onChange={onChange} value={name} placeholder="이름" />
            <input name="nickname" onChange={onChange} value={nickname} placeholder="닉네임" />
            <button onClick={onReset}>초기화</button>
            <div>
                <b>값: </b>
                {name} ({nickname})
            </div>
        </div>
    );
}