// Q1. make a string out of an array
// Array -> String
{
    const fruits = ["apple", "banana", "orange"];
    const newFruits = fruits.join();
    console.log(`1번 : ${newFruits}`);
    // 1번 : apple,banana,orange
}

// Q2. make an array out of a string
// String -> Array
{
    const fruits = "🍎, 🥝, 🍌, 🍒";
    const result = fruits.split(",");
    console.log(result);
    //(4) ["🍎", " 🥝", " 🍌", " 🍒"]
}

// Q3. make this array look like this: [5, 4, 3, 2, 1]
{
    const array = [1, 2, 3, 4, 5];
    const result = array.reverse(); // 배열자체를 변화시킴(일회용 X)
    console.log(result);
    console.log(array);
    // [5, 4, 3, 2, 1]
}

// Q4. make new array without the first two elements
{
    const array = [1, 2, 3, 4, 5];
    // const result = array.map( (value, index) => {
    //   const array = [];
    //   if(index >= 2){
    //       array[index] = value;
    //   }
    //   return array;
    // });
    const result = array.slice(2, 5); // 배열의 특정한 부분을 리턴, 5는 배제
    console.log(result);
}

class Student {
    constructor(name, age, enrolled, score) {
        this.name = name;
        this.age = age;
        this.enrolled = enrolled;
        this.score = score;
    }
}
const students = [
    new Student("A", 29, true, 45),
    new Student("B", 28, false, 80),
    new Student("C", 30, true, 90),
    new Student("D", 40, false, 66),
    new Student("E", 18, true, 88),
];

// Q5. find a student with the score 90
{
    // const result = students.filter(value => {
    //     if(value.score === 90){
    //       return value;
    //     }
    // });
    // 조건에 맞는걸 찾으면 그자리에서 멈추고 return
    const result = students.find((student) => student.score === 90);
    console.log(result);
}

// Q6. make an array of enrolled students
{
    // const result = students.map( (student) => {
    //  if( student.enrolled === true){
    //       return student;
    //  }
    // });
    // 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환합니다.
    const result = students.filter((student) => student.enrolled === true);
    console.log(result);
}

// Q7. make an array containing only the students' scores
// result should be: [45, 80, 90, 66, 88]
// 점수만 들어 있는 새로운 배열 get
// 함수(map)를 거쳐 새로운 배열로 반환
{
    const result = students.map((student) => student.score);
    console.log(result);
}

// Q8. check if there is a student with the score lower than 50
// 결과는 true가 리턴
{
    // const result = students.includes((student) => student.score <= 50);
    // some() 메서드는 배열 안의 어떤 요소라도 주어진 판별 함수를 통과하는지 테스트
    const result = students.some( (students) => students.score < 50);

    // some이 더 가시적일듯?
    //const reulst2 = students.every( (student) => student.score >= 50);

}

// Q9. compute students' average score
// 배열에 있는 모든 값을 누적
// reduceRight는 배열의 제일 뒤에서부터 시작
{
    const avg = students.reduce( (prev, curr, index, array) => {
        if(index === array.length - 1){
            return (prev + curr.score) / array.length;
        }
        return prev + curr.score;
    }, 0);
    console.log(avg);
}

// Q10. make a string containing all the scores
// 학생들의 모든 점수를 string으로 변환
// result should be: '45, 80, 90, 66, 88'
{
    // 이거 틀린듯
    // const result = students.map((student) => String(student.score) );
    const result = students
        .map((student) => student.score)
        .filter( (score) =>  score >= 50)
        .join();
    console.log(result);
}

// Bonus! do Q10 sorted in ascending order
// result should be: '45, 66, 80, 88, 90'
{
    const result = students.map(student => student.score)
        .sort( (a, b) => a - b) //내림차순은 b - a
        .join(); // join()으로 string으로 변환
    console.log(result);
}