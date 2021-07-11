const dog = {
    name: '멍멍이',
    sound : '멍멍!',
    say : function() {
        console.log(this.sound);
    }
};

const dog2 = {
    name: '멍멍이',
    sound : '멍멍!',
    say: () => {
        //동작 안함
        //function 으로 선언한 함수는 this 가 제대로 자신이 속한 객체를
        //가르키게 되는데, 화살표 함수는 그렇지 않기 때문입니다.
        console.log(this.sound);
    }
};

dog.say();
dog2.say();