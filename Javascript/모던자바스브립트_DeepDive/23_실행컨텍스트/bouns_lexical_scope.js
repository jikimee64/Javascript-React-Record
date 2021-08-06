/**
 * 렉시컬 스코프란 함수가 선언이 되는 위치에 따라서 상위 스코프가 결정되는 스코프
 * 함수가 선언이 될 때 스코프가 생성
 */

let a= "global";

function foo(){
    let x = "local";
    bar();
}

function bar(){
    console.log(x);
}
foo(); //global
bar(); //global ★, 선언될 당시 전역 스코프에 있기 때문에 전역변숭니 x를 참조
