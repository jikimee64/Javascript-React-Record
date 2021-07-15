const ironMan = {
    name: '토니 스타크',
    actor: '로버트 다우니 주니어',
    alias: '아이언맨'
};

const captainAmerica = {
    name: '스티브 로저스',
    actor: '크리스 에반스',
    alias: '캡틴 아메리카'
}

//객체 구조 분해 = 비구조화 할당
function print(hero){
// function print({ alias, name, actor }) { 이렇게도 가능
    //객체에서 값들을 추출해서 새로운 상수로 선언해 주는 것 입니다.
    const {alias, name, actor} = hero;
    const text = `${alias}(${name}) 역할을 맡은 배우는 ${actor}입니다.`;
    console.log(text);
}

print(ironMan);
print(captainAmerica);