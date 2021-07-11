{
    //동기작업
    function work(){
        const start = Date.now();
        for (let i = 0; i < 1000000000; i++) {}
        const end = Date.now();
        console.log(`${end} - ${start} ms`);
    }
    work();
    console.log('다른 작업');
}

{
    //비동기 작업
    function work() {
        //첫번째 파라미터에 넣는 함수를 두번째 파라미터에 넣은 시간(ms)이 흐른 후
        //호출해준다.(0을 넣어도 실제로 4ms 이후 실행)
        //setTimeout 을 사용하면 우리가 정한 작업이 백그라운드에서 수행되기 때문에
        // 기존의 코드 흐름을 막지 않고 동시에 다른 작업들을 진행 할 수 있습니다.
        setTimeout(() => {
            const start = Date.now();
            for (let i = 0; i < 1000000000; i++) {}
            const end = Date.now();
            console.log(end - start + 'ms');
        }, 0);
    }
    console.log('작업 시작!');
    work();
    console.log('다음 작업');
}


{
    //work 함수가 끝난다음 어떤 작업을 처리하고 싶다면? 콜백함수를 파라미터로 전달
    //콜백함수 : 함수 타입의 값을 파라미터로 넘겨줘서, 파라미터로 받은 함수를 특정 작입이 끝나고 호출해 주는것
    function work(callback) {
        //첫번째 파라미터에 넣는 함수를 두번째 파라미터에 넣은 시간(ms)이 흐른 후
        //호출해준다.(0을 넣어도 실제로 4ms 이후 실행)
        //setTimeout 을 사용하면 우리가 정한 작업이 백그라운드에서 수행되기 때문에
        // 기존의 코드 흐름을 막지 않고 동시에 다른 작업들을 진행 할 수 있습니다.
        setTimeout(() => {
            const start = Date.now();
            for (let i = 0; i < 1000000000; i++) {}
            const end = Date.now();
            console.log(end - start + 'ms');
            callback();
        }, 0);
    }
    console.log('작업 시작!');
    work(() => {
        console.log('작업이 끝났어요!')
    });
    console.log('다음 작업');
}

{
    //비동기 예시
/*    Ajax Web API 요청: 만약 서버쪽에서 데이터를 받와아야 할 때는, 요청을 하고 서버에서 응답을 할 때 까지
    대기를 해야 되기 때문에 작업을 비동기적으로 처리합니다.
    파일 읽기: 주로 서버 쪽에서 파일을 읽어야 하는 상황에는 비동기적으로 처리합니다.
    암호화/복호화: 암호화/복호화를 할 때에도 바로 처리가 되지 않고, 시간이 어느정도 걸리는 경우가 있기 때문에 비동기적으로 처리합니다.
    작업 예약: 단순히 어떤 작업*/
}
