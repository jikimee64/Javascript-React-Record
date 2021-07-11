console.log(!undefined);
console.log(!null)
console.log(!0)
console.log(!'')
console.log(!NaN)

//개선전
const value = { a : 1};
const truthy = value ? true : false;

//개선후
const value = { a: 1 };
const truthy = !!value;