
//성능적으로는 Immer 를 사용하지 않은 코드가 조금 더 빠르다는 점 입니다.

//sample1
//setTodo 함수에 업데이트를 해주는 함수를 넣음으로써
//만약 useCallback 을 사용하는 경우 두번째 파라미터인 deps 배열에 todo 를 넣지 않아도 되게 되지요.
const [todo, setTodo] = useState({
    text: 'Hello',
    done: false
});

const onClick = useCallback(() => {
    setTodo(todo => ({
        ...todo,
        done: !todo.done
    }));
}, []);

//첫번째 파라미터 생략 => 반환값은 새로운 상태가 아닌 상태를 업데이트 해주는 함수가 됨
const updater = produce(draft => {
    draft.done = !draft.done;
});

const nextTodo = updater(todo);

console.log(nextTodo);

//최종
const onClick2 = useCallback(() => {
    setTodo(
        produce(draft => {
            draft.done = !draft.done;
        })
    );
}, []);

