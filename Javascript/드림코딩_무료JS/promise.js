'use strict'

// Promise : js안에 내장되어있는 Object, 콜백함수대신 유용하게 쓰임
// 두가지 포인트
// 1.state(상태) : 진행중인지 or (성공,실패)중인지
// 2.프로듀싱과 컨슈머의 차이
//state: 우리가 지정한 작업이 수행중 : pending
//성공하면 fulfilled or 문제가발생하면 rejected 상태
//Producer : 원하는 기능을 수행해서 해당하는 데이터를 만듬,
//Consumer : 원하는 데이터를 소비

//1.Producer
const promise = new Promise((resolve, reject) => {
    // doing some heavy work (network, read files)
    // 시간이 좀 걸리는 작업은 비동기로 실행하는게 좋음
    //★프로미스가 만들어지는 순간 우리가 전달한 execute(resolve)가 자동으로 실행이됨
    //★네트워크요청을 사용자가 버튼을 눌렀을때 해야되는경우라면
    //이런식으로 작성하면 안됨(불필요한 네트워크 일어남)
    console.log('doing something...');
    setTimeout(() => {
        //resolve('ellie');
        reject(new Error('no network'));
    }, 1000);
});

//2.consumer :then,catch,finally
//value는 resolve의 콜백함수에서 전달된값(ellie)
promise
    .then((value) => { //then 은 똑같은 promise를 리턴하기 때문에 메소드체이닝 가능
        console.log(value);
    })
    .catch(error => {
        console.log(error);
    })
    .finally(() => {
        console.log('finally')
    })

//3.Promise 체이닝
const fetchNumber = new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000);
});

fetchNumber
    .then(num => num * 2)
    .then(num => num * 3)
    .then(num => {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(num - 1), 1000);
        });
    })
    .then(num => console.log(num));

//4.에러 핸들링
const getHen = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve('🍕'), 1000);
    });

const getEgg = hen =>
    new Promise((resolve, reject) => {
        // setTimeout(() => resolve(`${hen} => 🍔`), 1000);
        setTimeout(() => reject(new Error(`${hen} => 🍔`)), 1000);
    });

const cook = egg =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(`${egg} => 🍟`), 1000);
    });

getHen()
    .then(hen => getEgg(hen)) //.then(getEgg)로 써도됨,한가지만받아서 전달하는 경우만
    .catch(error => {
        return '🌭'; //에러가 나면 달걀대신 빵으로 대체해서 리턴(빵구 처리)
    })
    .then(egg => cook(egg))  //.then(cook)로 써도됨
    .then(meal => console.log(meal))
    .catch(error => console.log(error));


//5. 콜백헬을 이쁘게 작성하기
{
    class UserStorage {
        loginUser(id, password) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (
                        (id === 'ellie' && password === 'dream') ||
                        (id === 'coder' && password === 'academy')
                    ) {
                        resolve(id);
                    } else {
                        reject(new Error('not found'));
                    }
                }, 2000);
            });
        }

        getRoles(user) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (user === 'ellie') {
                        resolve({name: 'ellie', role: 'admin'});
                    } else {
                        reject(new Error('no access'));
                    }
                }, 1000)
            });
        }
    }

    const userStorage = new UserStorage();
    const id = prompt('enter your id');
    const password = prompt('enter your password');
    userStorage
        .loginUser(id, password)
        .then(user => userStorage.getRoles(user))
        .then(userWithRole => {
            console.log(`Hello ${userWithRole.name}, you have a ${userWithRole.role} role`)
        })
        .catch(error => console.log(error));
}