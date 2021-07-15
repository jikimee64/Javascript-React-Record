'use strict'
//es8 문법
{
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

//async를 사용하면 해당 함수는 결과값으로 promise를 반환
    async function process() {
        console.log('안녕하세요!');
        await sleep(1000); //1초 쉬고
        console.log('반갑습니다.');
    }

    process().then(() => {
        console.log('작업이 끝났어요!');
    })
}

{
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    //async 함수에서 에러를 발생시킬 때는 throw를 사용
    async function makeError() {
        await sleep(1000);
        const error = new Error();
        throw error;
    }

    //에러를 잡아낼때는 try/catch문
    async function process() {
        try {
            await makeError();
        } catch (e) {
            console.error(e);
        }
    }

    process();
}

{
    function sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const getDog = async () => {
        await sleep(1000);
        return '멍멍이';
    }

    const getRabbit = async () => {
        await sleep(500);
        return '토끼';
    }

    const getTurtle = async () => {
        await sleep(3000);
        return '거북이';
    };

    async function process(){
        const dog = await getDog();
        console.log(dog);
        const rabbit = await getRabbit();
        console.log(rabbit);
        const turtle = await getTurtle();
        console.log(turtle);

        //동시작업실행
        //하나라도 실패하면 모든게 실패한것으로 간주
        const results = await Promise.all([getDog(), getRabbit(), getTurtle()]);
        console.log(results);
    }

    // 배열 비구조화 할당 문법
    async function process2() {
        const [dog, rabbit, turtle] = await Promise.all([
            getDog(),
            getRabbit(),
            getTurtle(),
        ]);
        console.log(dog);
        console.log(rabbit);
        console.log(turtle);
    }

}