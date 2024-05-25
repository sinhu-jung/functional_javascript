// 지연 평가를 시작 시키고 유지 시키는 함수
// 1. map
// 2. filter, reject

// 끝을 내는 함수
// 1. take
// 2. some, every, find

var mi = 0;
var fi = 0;

// 지연평가를 넣게 되면 마지막에 take로 5개를 얻을 때 까지만 loop를 돌고 나머지는 loop를 돌지 않음
/**
 * 지연평가가 가능한 이유는 순수 함수이기 때문인데 
 * 순수 함수는 어느 시점에 어떻게 평가순서를 바꿔서 평가를 해도 
 * 즉 시점과 다르게 항상 동일한 결과를 만들 수 있기 때문에 지연평가가 가능하다.
 */
_.go(
    _.range(100),
    L.map(function(val) {
        ++mi;
        return val * val;
    }),
    L.filter(function(val) {
        ++fi;
        return val % 2;
    }),
    L.take(5),
    console.log
);

console.log(mi, fi);