'use strict';

//js는 기본이 동기
//호이스팅 : var나 function이 제일 위로 올라가는것

{
//대표적인 비동기
    console.log(1);
//브라우저 API, 브라우저에 먼저 요청을 보냄, 응답을 기다리지 않고 바로 콘솔로그로 넘어감
    setTimeout(() => {
        console.log(2);
    }, 1000);
    console.log(3);
}

//==================================================
{
    setTimeout((callback) => {
        console.log(2);
        //1초가 지난다음 전해준 함수를 콜해줘
        callback();
    }, 1000);
}

// 동기 콜백
{
    //함수의 선언은 호이스팅 됨
    function printImmediately(print) {
        print();
    }

    printImmediately(() => console.log('hello'))
}

//비동기 콜백
{
    function printWithDelay(print, timeout) {
        setTimeout(print, timeout);
    }

    printWithDelay(() => console.log('callback'), 2000);
}

//==================================================

//콜백 지옥
{
    class UserStorage {
        loginUser(id, password, onSuccess, onError) {
            setTimeout(() => {
                if (
                    (id === 'ellie' && password === 'dream') ||
                    (id === 'coder' && password === 'academy')
                ) {
                    onSuccess(id);
                } else {
                    onError(new Error('not found'));
                }
            }, 2000);
        }

        getRoles(user, onSuccess, onError) {
            setTimeout(() => {
                if (user === 'ellie') {
                    onSuccess({name: 'ellie', role: 'admin'});
                } else {
                    onError(new Error('no access'));
                }
            }, 1000)

        }
    }
}

// (id,pass)입력 후 로그인 시도 => 로그인 성공 후 id 받아옴 => 받아온 id를 이용해 역할을 요청해서 받아옴
// => 성공적으로 역할이 받아와진다면 이름과 역할이 들어있는걸 출력
const userStorage = new UserStorage();
const id = prompt('enter your id');
const password = prompt('enter your password');
userStorage.loginUser(
    id,
    password,
    (user) => {
        userStorage.getRoles(
            user,
            userWithRole => {
                alert(`Hello ${userWithRole.name}, you have a ${userWithRole.role} role`);
            },
            (error) => {
                console.log(error)
            }
        )
    },
    (error) => {
        console.log(error)
    }
);













