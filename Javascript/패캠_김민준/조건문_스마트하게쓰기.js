{
    //개선전
    function isAnimal(text) {
        return (
            text === '고양이' || text === '개' || text === '거북이' || text === '너구리'
        )
    }

    //개선후
    function isAnimal2(text) {
        const animals = ['고양이', '개', '거북이', '너구리'];
        return animals.includes(name);
    }

    console.log(isAnimal2('개')); // true
    console.log(isAnimal2('노트북')); // false
}

{
    function getSound(animal) {
        if (animal === '개') return '멍멍!';
        if (animal === '고양이') return '야옹~';
        if (animal === '참새') return '짹짹';
        if (animal === '비둘기') return '구구 구 구';
        return '...?';
    }

    console.log(getSound('개')); // 멍멍!
    console.log(getSound('비둘기')); // 구구 구 구

    //이렇게 특정 값에 따라 반환해야 하는 값이 다른 조건이
    // 여러가지 있을 때는 객체를 활용하면 좋습니다.
    function getSound2(animal){
        const sounds = {
            개: '멍멍!',
            고양이: '야옹~',
            참새: '짹짹',
            비둘기: '구구 구 구'
       }
       return sounds[animal] || '...?';
    }
    console.log(getSound('개'));
    console.log(getSound('비둘기'));

    //값에 따라 실행해야 하는 코드 구문이 다를 때
    function makeSound(animal){
        const tasks = {
            개() {
                console.log('멍멍');
            },
            고양이() {
                console.log('고양이');
            },
            비둘기() {
                console.log('구구 구 구');
            }
        }
        if(!tasks[animal]){
            console.log('...?');
            return;
        }
        tasks[animal]();
    }
    getSound('개');
    getSound('비둘기');

}