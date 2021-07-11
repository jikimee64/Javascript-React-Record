{
    //콜백 지옥
    //숫자 n을 파라미터로 받아와서 다섯번에 걸쳐 1초마다 1씩 더해서 출력하는 작업
    function increaseAndPrint(n, callback){
        setTimeout(() => {
            const increased = n + 1;
            console.log(increased);
            if(callback){
                callback(increased);
            }
        }, 1000);
    }

    increaseAndPrint(0, n => {
        increaseAndPrint(n, n => {
            increaseAndPrint(n, n => {
                increaseAndPrint(n, n => {
                    increaseAndPrint(n, n => {
                        console.log('끝!');
                    });
                });
            });
        });
    });
    /*결과
    * 1
    * 2
    * 3
    * 4
    * 5
    * 끝*/
}