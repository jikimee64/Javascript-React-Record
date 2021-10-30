const [todo, setTodo] = useState({
    text: 'Hello',
    done: false
});

const onClick = useCallback(
    () => {
        setTodo(todo => ({
            ...todo,
            done: !todo.done
        }));
    },
    [input],
);
