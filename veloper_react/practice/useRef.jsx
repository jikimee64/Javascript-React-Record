import React, {useRef, useState} from 'react'

export default function InputSample() {

    /**
     * useRef의 또다른 용도
     *
     * 컴포넌트 내부에서 조회 및 수정이 가능한 변수를 관리하는 용도
     * 값이 변경이 되어도 컴포넌트 리렌더링에 관여하지 않는다.
     * 일반적인 컴포넌트는 상태를 바꾸는 함수를 호출
     * -> 랜더링 이후에 업데이트 된 상태를 조회하는 반면
     * useRef는 관리하고 있는 변수를 설정 이후 바로 조회가 가능하다.
     *
     * 위 용도를 통한 다양한 관리 사례
     * 비동기 이벤트를 통해 생성된 고유값 (ex: id값)
     * 외부 라이브러리를 통해 생성된 인스턴스
     * scroll 위치
     */
    const nextId = useRef(4);
    const onCreate = () => {
        nextId.current += 1;
    }



    return (
        <div>

        </div>
    );
}