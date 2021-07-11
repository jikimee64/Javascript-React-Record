//객체 생성자 : 함수를 통해 새로운 객체를 만들고 그 안에 넣고 싶은 값 혹은
//함수들을 구현하게 해줌
{
    function Animal(type, name, sound){
        this.type = type;
        this.name = name;
        this.sound = sound;
        this.say = function(){
            console.log(this.sound);
        };
    }

    const dog = new Animal('개', '멍멍이', '멍멍');
    const cat = new Animal('고양이', '야옹이', '야옹');

    // new 할떄마다 say라는 함수가 계속 만들어지고 있음
    // 함수의 내용은 똑같은데 계속 생성이되서 비효율적
    // 프로토타입 사용

    dog.say();
    cat.say();
}
//=====================================================
//프로토타입 : 객체 생성자로 무언가를 만들었을떄 그객체들간에 공유할 수 있는 함수가 값
{
    function Animal(type, name, sound) {
        this.type = type;
        this.name = name;
        this.sound = sound;
    }

//바깥으로 꺼내서 재사용하는 개념
    Animal.prototype.say = function () {
        console.log(this.sound);
    }
    Animal.prototype.sharedValue = 1;

    const dog = new Animal('개', '멍멍이', '멍멍');
    const cat = new Animal('고양이', '야옹이', '야옹');

    dog.say();
    cat.say();

    console.log(dog.sharedValue);
    console.log(cat.sharedValue);
}

//=====================================================
// 객체 생성자 사용하기
{
    function Animal(type, name, sound) {
        this.type = type;
        this.name = name;
        this.sound = sound;
    }

    Animal.prototype.say = function(){
        console.log(this.sound);
    };
    Animal.prototype.sharedValue = 1;

    function Dog(name, sound){
        Animal.call(this, '개', name, sound);
    }

    function Cat(name, sound){
        //첫번째 인자에는 this 를 넣어주어야 하고,
        // 그 이후에는 Animal 객체 생성자 함수에서 필요로 하는 파라미터를 넣기기    Animal.call(this, '고양이', name, sound);
    }

    //프로토타입 공유
    Dog.prototype = Animal.prototype;
    Cat.prototype = Animal.prototype;

    const dog = new Dog('멍멍이', '야옹');
    const cat = new Cat('야옹이', '야옹');

    dog.say();
    cat.say();
}

//=====================================================
//프로토타입말고 클래스를사용한 상속구현
{
    class Animal {
        constructor(type, name, sound){
            this.type = type;
            this.name = name;
            this.sound = sound;
        }
        //메서드를 만들면 자동으로 프로토타입으로 등록
        say(){
            console.log(this.sound);
        }
    }

    const dog = new Animal('개', '멍멍이', '멍멍');
    const cat = new Animal('고양이', '야옹이', '야옹');

    dog.say();
    cat.say();
}

//=====================================================
{
    class Animal {
        constructor(type, name, sound) {
            this.type = type;
            this.name = name;
            this.sound = sound;
        }
        say() {
            console.log(this.sound);
        }
    }

    class Dog extends Animal {
        constructor(name, sound) {
            super('개', name, sound);
        }
    }

    class Cat extends Animal {
        constructor(name, sound) {
            super('고양이', name, sound);
        }
    }

    const dog = new Dog('멍멍이', '멍멍');
    const cat = new Cat('야옹이', '야옹');

    dog.say();
    cat.say();

}