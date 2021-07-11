'use strict'

//프로미스를 계속 체이닝 하면 복잡할수도있음
//async - await를 쓰면 동기식처럼 가독성 증가(간편하게 사용가능)
//프로미스가 맞는경우도 있고 async - await로 변화해야 깔끔한 경우도 있음

//1. promise
{
    function fetchUser() {
        return new Promise((resolve, reject) => {
            //do network request in 10 secondes...(가정)
            //resolve나 reject를 호출하지 않으면 계속 pending 상태
            resolve('ellie');
        })
    }

    const user = fetchUser();
    console.log(user);
}
//2.async
{
    //async와 await는 promise를 감싸고 있는 신테릭 슈걸
    //promise를 return 함
    async function fetchUser() {
        return 'ellie';
    }
}

//3.await
{
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function getApple() {
        //delay가 끝날떄가지 기다려줌, 3초있따가 사과를 리턴
        await delay(1000);
        return '🍕';
    }

    async function getBanana() {
        //3초 있따가 바나나를 리턴
        await delay(1000);
        return '🍔';
    }

    //promise버전
    function getBanana2() {
        return delay(1000)
            .then(() => '🍳')
    }

    //promise버전
    function pickFruits() {
        //콜백 지옥;
        return getApple()
            .then(apple => {
                return getBanana()
                    .then(banana => `${apple} + ${banana}`);
            })
    }

    pickFruits().then(console.log);

    //async 버전
    //문제좀 : 두개의 async-await을 병렬로 처리해야함,안그러면 1초+1초 = 2초걸림
    async function prickFruits2() {
        //try-catch로 에러처리
        const apple = await getApple();
        const banana = await getBanana();
        return `${apple} + ${banana}`
    }

    //개선버전
    //병렬적으로 실행(이건 더러운 코드)
    async function pickFruits3(){
        const applePromise = getApple(); //만들자마자 비동기함수가 실행이됨
        const bananaPromise = getBanana(); //만들자마자 비동기함수가 실행이됨
        const apple = await applePromise;
        const banana = await bananaPromise;
        return `${apple}  +${banana}`;
    }

    //개선버전2(프로미스 API 이용)
    function pickAllFruits(){
        return Promise.all([getApple(), getBanana()])
            //배열을 전달
            .then(fruits => fruits.join(' + '));
    }
    pickAllFruits().then(console.log);

    function pickOnlyOne(){
        //배열의 값들중 가장먼저 리턴하는 아이 하나만 리턴
        return Promise.race([getApple(), getBanana()]);
    }
    pickOnlyOne().then(console.log);

}