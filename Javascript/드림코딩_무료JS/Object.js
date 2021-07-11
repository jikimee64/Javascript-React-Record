const ellie = { name: 'ellie', age: 4};

print(ellie);

function print(person){
    console.log(person.name);
    console.log(person.age);
}

// 미친 짓
ellie.hasJob = true;

// 미친 짓 2
delete ellie.hasJob;

ellie.name // 평소에는 닷을 써라

ellie['name'] //정확하게 어떤 키가 필요한지 모를때(런타임에 결정될때) 사용
function printValue(obj, key){
    console.log(obj, ellie[key]);
}

const person1 = {name: 'bob', age: 2};
const person2 = {name: 'steve', age: 3};
const person3 = {name: 'dave', age: 4};
//const person4 = makePerson('ellie', 30);

const person5 = new Person('ellie', 30);

// Object를 생성하는 것은 함수명은 대문자로 시작 makePerson(X)
function Person(name, age){
    // return {
    //     // name: name,
    //     // age: age,
    //     //키와 value가 같으면 하나 생략 가능
    //     name,
    //     age,
    // };

    // this = {}; //new 하면 생략된것
    this.name = name;
    this.age = age;
    // reutrn this;

}

// 해당하는 키가 object에 있는지..
console.log('name' in ellie);
console.log('age' in ellie);
console.log('random' in ellie);

// for..in vs for..of
console.clear(); // 이전 것들 다 지움
for(key in ellie){
    console.log(key);
}

// for (value of iterable){
const array = [1, 2, 4, 5];

// 값 출력
for(value of array){
    console.log(value);
}


const user = {name : 'ellie', age: '20'};
const user2 = user;
user2.name = 'coder';
console.log(user);


const user3 = {};
for(key in user){
    user3[key] = user[key];
}
console.clear();
console.log(user3);


const user4 = Object.assign({}, user);
console.log(user4);


const fruit1 = {color: 'red'};
const fruit2 = {color: 'blue', size: 'bih'};
// 오른쪽에서 왼쪽으로 덮어씀
const mixed = Object.assign({}, fruit1, fruit2);
console.log(mixed.color);
console.log(mixed.size);






