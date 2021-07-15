/* 생성자 함수 방식으로 인스턴스를 생성 */
function Circle(radius){
    // 이 시점에는 생성자 함수 자신이 생성할 인스턴스를 가리키는 식별자를 알 수 없다.
    // 따라서, 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 특수한 식별자인 this가 필요하다
    //????.radius = radius;
}

Circle.prototype.getDiameter = function (){
    // 이 시점에는 생성자 함수 자신이 생성할 인스턴스를 가리키는 식별자를 알 수 없다.
    // return 2 * ????.radius;
}

//생성자 함수로 인스턴스를 생성하려면 먼저 생성자 함수를 정의해야 한다.
const circle = new Circle(5);