const React = require('react');
const {useState, useRef} = React; //구조할당

const Gugudan = () => {
    //컴포넌트 안에 꼭 넣어줘야함
    //비구조화 할당(=구조분해 = 변수자리에 객체나 배열 사용) 문법
    const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
    const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null);

    //이렇게 해도 되는데 setState할때 불편
    //this.setState와는 다르게 일일이 바꿔줘야함
    const [state, setState] = React.useState({
        value: '',
        result: ''
    })

    const onChangeInput = (e) => {
        setValue(e.target.value);
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (parseInt(value) === first * second) {
            //이전값을 사용하고싶을때 함수방식으로 사용 가능
            setResult((prevResult) => {
                return '정답: ' + value
            })
            setResult('정답 : ' + value);
            setFirst(Math.ceil(Math.random() * 9));
            setFirst(Math.ceil(Math.random() * 9));
            setValue('');
            inputRef.current.focus(); //current 붙여야됨
        } else {
            setResult('땡');
            setValue('');
            inputRef.current.focus(); //current 붙여야됨
        }
    }

    //state를 바뀌면 함수자체가 재실행되서 조금 느릴 수도 있다(어쩔수없음)
    //setState를 4개써서 렌더링이 4번일어나는게 아님
    //비동기라서 렌더링 한번만일어남 -> 리액트가 setState를 모아서 한번만 렌더링 함
    console.log('렌더링');
    //React.Fragment의 간략한 표현 : <> </>
    return (
        <>
            <div>{first} 곱하기 {second}는?</div>
            <form onSubmit={onSubmitForm}>
                <input ref={inputRef} onChange={onChangeInput} type="text"/>
                <button>입력!</button>
            </form>
            <div id="result">{result}</div>
        </>
    );
}

module.exports = Gugudan;