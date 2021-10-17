import React, { PureComponent } from 'react';

/**
 * 반복문의 경우 따로뺴면 성능도 좋음
 */
class TryClass extends PureComponent {
    constructor(props) {
        super(props);
        //다른 동작 가능
        //함수나 생성자로 하는 경우에는 정밀한 컨트롤이 필요할때...
        this.state = {
            result: this.props.result,
            try: this.props.try,
        }
    }

    //이건 클래스형에만 있는것
    //렌더링 커스텀하게 할려면 이거랑 Component
    shouldComponentUpdate(nextProps, nextState, nextContext) {

    }

    //props : 부모한테 받은 유산
    render() {
        const { tryInfo } = this.props;
        return(
            <li>
                <div>{tryInfo.try}</div>
                <div>{tryInfo.result}</div>
            </li>
        )
    }
}

export default TryClass;

/**
 * 차이점으로 import는 정적 임포트, require는 동적 임포트라는 차이가 더 있네요.
 * import는 항상 파일 상단에, require는 파일 아무데서나 쓸 수 있습니다.
 */
//default는 한번만 쓸 수 있음, module.exports랑 역할이 비슷
//export default TryClass; // 사용법 : import TryClass

//여러개 사용 가능
//export const hello = 'hello'; //import { hello }

//const든 default는 같이 사용 가능
//import TryClass, { hello}

//요약 노드에서는 require 쓰고, 리액트에서는 import랑 export 쓴다고 생각
//import는 바벨이 require로 바꿔줌