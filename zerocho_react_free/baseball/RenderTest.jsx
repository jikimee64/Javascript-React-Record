import React, { PureComponent } from 'react';

class RenderTest extends PureComponent {
    state = {
        counter: 0,
        string: 'hello',
        number: 1,
        boolean: true,
        object: {},
        array: [],
        array2: [ {inside: [3]}], //이런구조 비추, PureComponent가 판단하기 어려워 함
    };

    //nextContext 개념
    //A -> B -> C -> D -> E -> F -> G
    //A에서 G까지 순차적으로 props를 넘겨주면 사이에 있는 컴포넌트들도 props를 가짐
    //허나, props를 가지고있으면 쓸데없이 렌더링될 위험이 있음
    //A에서 G로 바로 props를 주는방법 : contextapi
    //conextapi를 응용한게 리덕스

    //최적화 연습
    //어떤 경우에 렌더링 해야하지 명시
    //뀌는게 없으면 렌더링 X
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(this.state.counter !== nextState.counter) {
            return true; //렌더링 O
        }
        return false; //렌더링 X
    }
    //위가 복잡하다면 PureComponent 사용
    //PureComponent란 shouldComponentUpdate를 알아서 구현함
    //state가 바뀌었는지 안바뀌었는지 판단
    //단점 : 객체나 배열형식(참조관계)일 경우 PureComponent가 판단하기 어려워함

    onClick = () => {
        this.setState( {
            array: [...this.state.array, 1], //이게원칙!!(새로운 배열 가져옴)
            object: {...this.state.object}, //이게원칙!!(새로운 객체 가져옴)
        })
    };

    //setState만 호출해도 렌더링이 다시 일어남
    render() {
        console.log('렌더링', this.state);
        return ( <di>
            <button onClick={this.onClick}>클릭</button>
        </di>)
    }
}

export default RenderTest;