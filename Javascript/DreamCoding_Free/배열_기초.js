'use strict';

const arr1 = new Array();
const arr2 = [1, 2]; // 이걸로 써라;

const fruits = ['사과', '바나나'];


for(let fruit of fruits){
    console.log(fruit);
}

console.clear();

fruits.forEach( (value, index) => {
    console.log(value);
    console.log(index);
});

// unshift : 앞에서부터 데이터를 넣는 것

// shift : 앞에서부터 데이터가 빠지게 것

// unshift, shift는 push, pop보다 엄청 느림

// splice : 지정된 위치에서 데이터 삭제 가능
fruits.push('포도');
fruits.push('딸기');
fruits.push('복숭아');
fruits.push('레몬');

//fruits.splice(1); //1부터 끝까지 지움
console.log(fruits);
fruits.splice(1, 2); //1부터 2개만끝까지 지움
console.log(fruits);

fruits.splice(1, 1, '수박', '새우깡'); //1부터 한개지우고 그자리부터 뒤에 추가한게 집어넣음

const fruits2 = ['배고파', '나두'];
const newFruits = fruits.concat(fruits2);
cosole.log(newFruits)


console.clear();

fruits.indexOf()


