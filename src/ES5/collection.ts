import { _map, _filter, _compact,_reject ,_keys, _values, _pluck, _find, _find_index, _some, _every } from "./_";
import { _min, _max, _min_by, _max_by, _go, _get, _group_by, _count_by, _pairs } from "./_";

// 컬렉션 중심 프로그래밍
/**
 * 컬렉션은 배열과 같은 돌림직한 데이터를 다루는 것을 말함
 */

// 가장 앞에 있는 것이 각 유형별 대표 함수이며 대표함수로 나머지 함수들을 전부 구현 할 수 있다.
// 1. 수집하기 - map, values, pluck 등
// 2. 거르기 - filter, reject, compact, without 등
// 3. 찾아내기 - find, some, every 등
// 4. 접기 - reduce, min, max, group_by, count_by

type User = {id: number, name: string, age:number}
var users = [
    { id: 1, name: 'ID', age: 36 },
    { id: 2, name: 'BJ', age: 32 },
    { id: 3, name: 'JM', age: 32 },
    { id: 4, name: 'PJ', age: 27 },
    { id: 5, name: 'HA', age: 25 },
    { id: 6, name: 'JE', age: 26 },
    { id: 7, name: 'JI', age: 31 },
    { id: 8, name: 'MP', age: 23 }
];

// 컬랙션 중심 프로그래밍의 유형별 함수 만들기
// 1. 수집하기 - map
console.log(
    _map(users, function(user:User){
        return user.name;
    })
)
//  1. values
console.log(_keys(users[0]));
console.log(_values(users[0]));

//  2. pluck
console.log(_pluck(users, 'age'));

// 2. 거르기
//   1. reject - filter와는 반대로 true로 평가 되는 것을 제외 시키는 역할
console.log(
    _filter(users, function(user) {
        return user.age > 30;
    })
);

console.log(
    _reject(users, function(user) {
        return user.age > 30;
    })
);

//   2. compact - truedy 한 값만 남기는 함수
// 0과 false, null 은 사라지고 1, 2, {}만 남기는 함수 
console.log(_compact([1, 2, 0, false, null ,{}]));

// 3. 찾아내기
//   1. find
console.log(
    _find(users, function(user) {
        return user.age < 30;
    })
);

//   2. find_index
console.log(
    _find_index(users, function(user) {
        return user.age < 30;
    })
);

//   3. some
console.log(_some([1, 2, 5, 10 , 20], function(val) {
    return val > 10;
}));

//   4. every
console.log(_every([111, 222, 5, 10 , 20], function(val) {
    return val > 3;
}));


// 4. 접기
//   1. min, max, min_by, max_by
console.log(_min([1, 2, 4, 10, 5, -4]));
console.log(_max([1, 2, 4, 10, 5, -4]));

console.log(_min_by([1, 2, 4, 10, 5, -4], Math.abs));
console.log(_max_by([1, 2, 4, 10, 5, -4, -11], Math.abs));

console.log(
    _max_by(users, function(user){
        return user.age;
    })
);

_go(
    users,
    _filter(user => user.age >= 30),
    _min_by(_get('age')),
    _get('name'),
    console.log
)


//   2. group_by, push
_go(
    users,
    _group_by(user => user.age),
    console.log
);

_go(
    users,
    _group_by(user => user.age - user.age % 10),
    console.log
)

_go(
    users,
    _group_by(user => user.name[0]),
    console.log
)

//   3. count_by, inc
console.log(
 _count_by(users, user => user.age));

 console.log(
    _count_by(users, user => user.age - user.age % 10)
 );

 _go(
    users,
    _count_by(user => user.name[0]),
    console.log
);

 // each 개선하기 
 console.log(_pairs(users[0]));
 console.clear();

 _go(
    users,
    _count_by(user => user.age - user.age % 10),
    _map((count, key) => `<li>${key}대는 ${count}명 입니다.</li>`),
    list => '<ul>' + list.join('') + '</ul>',
    function(html) {
        var doc = document.getElementById('app');
        doc.innerHTML = html;
    }
 );