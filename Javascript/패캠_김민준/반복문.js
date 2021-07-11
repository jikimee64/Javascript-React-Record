// for..or
// 배열에 관한 반복문을 돌리기 위해서 만들어진 반복문입니다.
// 사실 이 구문은 배워놔도 사용 할 일이 별로 없습니다.
// 보통 배열을 반복할때에는 배열의 내장함수를 많이 사용합니다. 그래도 알아는 둡시다.
let numbers = [10, 20, 30, 40, 50];
for(let number of numbers){
    console.log(number);
}

//=====================================================

const doggy = {
    name: '멍멍이',
    sound: '멍멍',
    age : 2
};

console.log(Object.entries(doggy)); //[[키, 값], [키, 값]] 형태의 배열로 변환
console.log(Object.keys(doggy)); //[키, 키, 키] 형태의 배열로 변환
console.log(Object.values(doggy)); //[값, 값, 값] 형태의 배열로 변환

for(let key in doggy){
    console.log(`${key}: ${doggy[key]}`);
}