{
//비구조화 할당시 기본값 설정
    const object = {a: 1};

    function print({a, b = 2}) {
        console.log(a);
        console.log(b);
    }

    print(object);
}

{
    const object = { a : 1};
    const {a,b = 2} = object;

    console.log(a); // 1
    console.log(b); // 2
}

{
    //비구조화 할당시 이름 바꾸기
    const animal ={
        name : '멍멍이',
        type: '개'
    };
    // 'animal 객체 안에 있는 name 을 nickname 이라고 선언하겠다.' 라는 의미
    const {name : nickname} = animal.name;
    console.log(nickname);
}

{
    //배열 비구조화 할당
    const array = [1];
    const [one, two = 2] = array;

}

{
    //깊은 값 비구조화 할당
    const deepObject = {
        state : {
            information: {
                name: 'velopert',
                languages: ['korean', 'enlgish', 'chiness']
            }
        },
        value : 5
    }

    // name, languages, value 값들을 밖으로 꺼내주고 싶다면 어떻게 해야 할까요?
    // 이럴땐 두가지 해결 방법이 있는데요, 첫번째는 비구조화 할당 문법을 두번 사용하는 것입니다.

    const {name, languages} = deepObject.state.information;
    const {value} = deepObject;

    //key 이름으로 선언된 값이 존재하다면, 바로 매칭시켜주는 문법
    const extracted = {
        name,
        languages,
        value
    };
    console.log(extracted);
}

//둘중 편한방법쓰기 : 벨로퍼는 따로뺴는거 추천

{
    // 한번에 모두 추출하는 방법
    const deepObject = {
        state: {
            information: {
                name: 'velopert',
                languages: ['korean', 'english', 'chinese']
            }
        },
        value: 5
    };

    const {
        state: {
            information: {name, languages}
        },
        value
    } = deepObject;

    const extracted = {
        name,
        languages,
        value
    };
    console.log(extracted);
}
