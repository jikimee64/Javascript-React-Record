//spread : 펼치다, 퍼뜨리다의 의미
//이걸 사용하면 객체 혹은 배열을 펼칠 수 있다.

//기존
{
    const slime = {
        name: '슬라임'
    };

    const cuteSlime = {
        name: '슬라임',
        attribute: 'cute'
    };

    const purpleCuteSlime = {
        name: '슬라임',
        attribute: 'cute',
        color: 'purple'
    };

    console.log(slime);
    console.log(cuteSlime);
    console.log(purpleCuteSlime);
}

//개선
{
    const slime = {
        name: '슬라임'
    };

    const cuteSlime = {
        ...slime,
        attribute: 'cute'
    }

    const purpleCuteSlime = {
        ...cuteSlime,
        color: 'purple'
    }

    //배열도 가능
    const animals = ['개', '고양이', '참새'];
    const anotherAnimals = [...animals, '비둘기'];

    //여러번 가능
    const numbers = [1,2,3,4,5];
    const spreadNumbers = [...numbers, 1000, ...numbers];
    console.log(spreadNumbers); // [1, 2, 3, 4, 5, 1000, 1, 2, 3, 4, 5]
}

//rest
//spread랑 생김새는 비슷한데 역할은 매우 다름
{
    //객체에서의 예시
    const purpleCuteSlime = {
        name: '슬라임',
        attribute: 'cute',
        color: 'purple'
    };

    // rest 안에 color 값을 제외한 값이 들어있습니다.
    //rest 는 객체와 배열에서 사용 할 때는 이렇게 비구조화 할당 문법과 함께 사용됩니다.
    // 주로 사용 할때는 위와 같이 rest 라는 키워드를 사용하게 되는데요,
    // 추출한 값의 이름이 꼭 rest 일 필요는 없습니다.
    const {color, ...rest} = purpleCuteSlime;
    console.log(color); //purple
    console.log(rest); //Object {name:"슬라임", attribute:"cute"}

}

{
    //attribute 까지 없앤 새로운 객체만들기
    const purpleCuteSlime = {
        name: '슬라임',
        attribute: 'cute',
        color: 'purple'
    };

    const {color, ...cuteSLime} = purpleCuteSlime;
    console.log(color); //purple
    console.log(cuteSLime);  //Object {name:"슬라임", attribute:"cute"}

    const {attribute, ...slime} = cuteSLime;
    console.log(attribute); //cute
    console.log(slime); //Object {name:"슬라임"}
}

{
    //배열 사용예시
    const numbers = [0,1,2,3,4,5,6];

    //배열 비구조화 할당을 통하여 원하는 값을 밖으로 꺼내고, 나머지 값을 rest 안에 넣었습니다.
    const [one, ...rest] = numbers;
    console.log(one);
    console.log(rest);

    //이건 불가능
    // const numbers2 = [0, 1, 2, 3, 4, 5, 6];
    // const [..rest, last] = numbers2;
}

{
    //함수 파라미터에서의 rest
    //사용전
    function sum(a, b, c, d, e, f, g) {
        let sum = 0;
        if (a) sum += a;
        if (b) sum += b;
        if (c) sum += c;
        if (d) sum += d;
        if (e) sum += e;
        if (f) sum += f;
        if (g) sum += g;
        return sum;
    }
 //g 값이 undefined 가 되기 때문에 sum 에 더하는 과정에서 += undefined 를 하게 되면
    // 결과는 NaN 이 되버립니다. 그렇기 때문에 함수에서 하나하나 유효한 값인지 확인을 해줬지요.

    const result = sum(1, 2, 3, 4, 5, 6);
    console.log(result);
}

{
    //개선후
    function sum(...rest){
        return rest.reduce((acc, current) => acc + current, 0);
    }
    // 함수의 파라미터가 몇개가 될 지 모르는 상황에서 rest 파라미터를 사용하면 매우 유용
    const result = sum(1,2,3,4,5,6);
    console.log(result); //21
}

{
    //퀴즈
    function max(...numbers) {
        return numbers.reduce(
            // acc 이 current 보다 크면 결과값을 current 로 하고
            // 그렇지 않으면 acc 가 결과값
            (acc, current) => (current > acc ? current : acc),
            numbers[0]
        );
    }

    const result = max(1, 2, 3, 4, 10, 5, 6, 7);
    console.log(result);

}