// https://ko.javascript.info/property-accessors

let obj = {
    get propName(){
        //getter, obj.propName을 실행할 때 실행되는 코드
    },
    set propName(value){
        //console.log(`내가바로 setter : ${value}`)
        // setter, obj.propName = value를 실행되는 코드
    }
}

obj.propName = 2;
//console.log(obj.propName);

//=====================================================

let user = {
    name: "John",
    surname: "Smith",

    get fullName(){
        return `${this.name} ${this.surname}`;
    }
};

//console.log(user.fullName); // John Smith

//=====================================================

/**
 * 이렇게 getter와 setter 메서드를 구현하면 객체엔 fullName이라는
 * '가상’의 프로퍼티가 생깁니다. 가상의 프로퍼티는 읽고 쓸 순 있지만 실제로는 존재하지 않습니다.
 */
let user2 = {
    name: "John",
    surname: "Smith",

    get fullName(){
        return `${this.name} ${this.surname}`;
    },

    set fullName(value){
        // ★
        [this.name, this.surname] = value.split(" ");
    }
};

// 주어진 값을 사용해 set fullName이 실행됩니다.
user2.fullName = "Alice Cooper";

//console.log(user.name); // Alice
//console.log(user.surname); // Cooper

//=====================================================

let user = {
    name: "John",
    surname: "Smith"
};

/**
 * 객체에서 직접 새 속성을 정의하거나 객체의 기존 속성을 수정하고 객체를 반환
 *  for...in 루프 또는 Object.keys 메서드 안쓰고 추가 세부 정보를 기본값에서 변경
 * https://runebook.dev/ko/docs/javascript/global_objects/object/defineproperty
 *
 * defineProperty에 설명자 get과 set을 전달하면 fullName을 위한 접근자를 만들 수 있습니다.
 */
Object.defineProperties(user, 'fullName', {
    get(){
        return `${this.name} ${this.surname}`
    },

    set(){
        [this.name, this.surname] = value.split(" ");
    }
});

console.log(user.fullName); // John Smith

for(let key in user) console.log(key); // name, surname

//=====================================================

//한 프로퍼티에 get과 value를 동시에 설정하면 에러가 발생합니다.
Object.defineProperties({}, 'prop', {
    get(){
        return 1;
    },
    value: 2
});

//=====================================================

/**
 * user의 이름은 _name에 저장되고, 프로퍼티에 접근하는 것은 getter와 setter를 통해 이뤄집니다.
 기술적으론 외부 코드에서 user._name을 사용해 이름에 바로 접근할 수 있습니다.
 그러나 밑줄 "_" 로 시작하는 프로퍼티는 객체 내부에서만 활용하고,
 외부에서는 건드리지 않는 것이 관습입니다.
 * @type {{name}}
 */
let user = {
    get name(){
        return this._name;
    },

    // 실제 값은 별도의 프로퍼티 _name에 저장됩니다.
    set name(value){
        if(value.length < 4){
            alert("입력하신 값이 너무 짧습니다. 네 글자 이상으로 구성된 이름을 입력하세요.");
            return;
        }
        this._name = value;
    }
};

user.name = 'Pete';
alert(user.name); // Pete

user.name = ""; // 너무 짧은 이름을 할당하려 함

//=====================================================

function User(name, age){
    this.name = name;
    this.age = age;
}

let john = new User("John", 25);
alert(john.age); // 25

//=====================================================
//age 대신 birth를 저장해야한다면?
//기존의 age를 다 birthday로 수정해야함
//age를 남겨도 상관없음, 기존 코드는 그대루 두고
//age를 위한 getter를 추가해서 문제를 해결하자
function User(name, birthday){
    this.name = name;
    this.birthday = birthday;
}

let john = new User('John', new Date(1992, 6, 1));

//=====================================================

function User(name, birthday){
    this.name = name;
    this.birthday = birthday;

    //age는 현재 날짜와 생일을 기준으로 계산
    Object.defineProperties(this, "age", {
        get(){
            let todayYear = new Date().getFullYear();
            return todayYear  - this.birthday.getFullYear();
        }
    });
}

let john = new User("John", new Date(1992, 6, 1));

console.log( john.birthday ); // birthday를 사용할 수 있습니다.
console.log( john.age );      // age 역시 사용할 수 있습니다.
