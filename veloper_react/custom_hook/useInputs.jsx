/**
 * 커스텀 훅 : input을 관리하는 코드같이 반복되는 로직을 쉽게 재사용 가능
 * 커스텀 훅 같은 경우 보통 use라는 키워드로 시작하는 파일을 만듬
 */

import {useState, useCallback} from "react";

const useInputs = (initialForm) => {
    const [form, setForm] = useState(initialForm);
    //change
    const onChange = useCallback(() => {
        const {name, value} = e.target;
        // 객체 리터럴 표현을 반환하기 위해서는 함수 본문(body)을 괄호 속에 넣음:
        // ex) params => ({foo: bar})
        setForm(form => (
            {...form, [name]:value}
        ));
    }, []);
    const reset = useCallback(() => setForm(initialForm),[initialForm]);
    return [form, onChange, reset]; //컴포넌트에서 사용하고 싶은 값들을 반환
}