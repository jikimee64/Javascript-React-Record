// Q1. make a string out of an array
// Array -> String
{
    const fruits = ["apple", "banana", "orange"];
    const newFruits = fruits.join();
    console.log(`1๋ฒ : ${newFruits}`);
    // 1๋ฒ : apple,banana,orange
}

// Q2. make an array out of a string
// String -> Array
{
    const fruits = "๐, ๐ฅ, ๐, ๐";
    const result = fruits.split(",");
    console.log(result);
    //(4)ย ["๐", " ๐ฅ", " ๐", " ๐"]
}

// Q3. make this array look like this: [5, 4, 3, 2, 1]
{
    const array = [1, 2, 3, 4, 5];
    const result = array.reverse(); // ๋ฐฐ์ด์์ฒด๋ฅผ ๋ณํ์ํด(์ผํ์ฉ X)
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
    const result = array.slice(2, 5); // ๋ฐฐ์ด์ ํน์ ํ ๋ถ๋ถ์ ๋ฆฌํด, 5๋ ๋ฐฐ์ 
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
    // ์กฐ๊ฑด์ ๋ง๋๊ฑธ ์ฐพ์ผ๋ฉด ๊ทธ์๋ฆฌ์์ ๋ฉ์ถ๊ณ  return
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
    // ์ฃผ์ด์ง ํจ์์ ํ์คํธ๋ฅผ ํต๊ณผํ๋ ๋ชจ๋  ์์๋ฅผ ๋ชจ์ ์๋ก์ด ๋ฐฐ์ด๋ก ๋ฐํํฉ๋๋ค.
    const result = students.filter((student) => student.enrolled === true);
    console.log(result);
}

// Q7. make an array containing only the students' scores
// result should be: [45, 80, 90, 66, 88]
// ์ ์๋ง ๋ค์ด ์๋ ์๋ก์ด ๋ฐฐ์ด get
// ํจ์(map)๋ฅผ ๊ฑฐ์ณ ์๋ก์ด ๋ฐฐ์ด๋ก ๋ฐํ
{
    const result = students.map((student) => student.score);
    console.log(result);
}

// Q8. check if there is a student with the score lower than 50
// ๊ฒฐ๊ณผ๋ true๊ฐ ๋ฆฌํด
{
    // const result = students.includes((student) => student.score <= 50);
    // some() ๋ฉ์๋๋ ๋ฐฐ์ด ์์ ์ด๋ค ์์๋ผ๋ ์ฃผ์ด์ง ํ๋ณ ํจ์๋ฅผ ํต๊ณผํ๋์ง ํ์คํธ
    const result = students.some( (students) => students.score < 50);

    // some์ด ๋ ๊ฐ์์ ์ผ๋ฏ?
    //const reulst2 = students.every( (student) => student.score >= 50);

}

// Q9. compute students' average score
// ๋ฐฐ์ด์ ์๋ ๋ชจ๋  ๊ฐ์ ๋์ 
// reduceRight๋ ๋ฐฐ์ด์ ์ ์ผ ๋ค์์๋ถํฐ ์์
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
// ํ์๋ค์ ๋ชจ๋  ์ ์๋ฅผ string์ผ๋ก ๋ณํ
// result should be: '45, 80, 90, 66, 88'
{
    // ์ด๊ฑฐ ํ๋ฆฐ๋ฏ
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
        .sort( (a, b) => a - b) //๋ด๋ฆผ์ฐจ์์ b - a
        .join(); // join()์ผ๋ก string์ผ๋ก ๋ณํ
    console.log(result);
}