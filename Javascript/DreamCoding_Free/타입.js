// use this for Valina JS
'use strict';

// 2. Variable
// let (added in ES6)
var globalName = 'ss';
{
    let name = 'ellie';
    console.log(name);
    name = 'hello';
    console.log(name);
}

// var
// var hoisting
console.log(age);
var age;
age = 4;


// variable types
// primitive, single item : number, string, boolean, null, undefien, symbol
// object, box container
// function, first-class function

//js는 number하나면 숫자는 끝
//js는 타입이 동적으로 결정되서 어떤 숫자든 넣으면 끝
const count = 17; // integer
const size = 17.1; //decimal number
console.log(`value: ${count}, type: ${typeof count}`);
console.log(`value: ${size}, type: ${typeof size}`);


// number - special numeric values: infinity, -infinity, NaN
const infinity = 1 / 0;
const negativeInfinity = -1 / 0;
const nAn= 'not a number' / 2;
console.log(infinity);
console.log(negativeInfinity);
console.log(nAn);

//string
const char = 'c';
const brendan = 'brendan';
const greeting = 'hello ' + brendan;
console.log(`value: ${greeting}, type: ${typeof greeting}`);
const helloBob = `hi ${brendan}!`; //template literals (string)
console.log(`value: ${helloBob}, type: ${typeof helloBob}`);


// symbol, create unique identifiers for objects
const symbol1 = Symbol('id');
const symbol2 = Symbol('id');
console.log(symbol1 === symbol2);

const gSymbol1 = Symbol.for('id');
const gSymbol2 = Symbol.for('id');
console.log(gSymbol1 === gSymbol2);

// 5. Dynamic typing: dynamically typed language
let text = 'hello';
console.log(`value: ${text}, type: ${typeof text}`);
text = 1;
console.log(`value: ${text}, type: ${typeof text}`);
text = '7'  + 5; //5를 string 으로 변환
console.log(`value: ${text}, type: ${typeof text}`);
text = '8' / '2'; //둘다 number로 인식
console.log(`value: ${text}, type: ${typeof text}`);