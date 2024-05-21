import { _filter, _map, _curry, _curryr, _get, _reduce, _pipe, _go, _each, _keys } from "./_";

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

// 1. 명령형 코드
  // 1. 30세 이상인 users를 거른다.
  var temp_users = [];
  for(var i = 0; i < users.length; i++) {
    if(users[i].age >= 30) {
        temp_users.push(users[i]);
    }
  }
  console.log(temp_users);

  // 2. 30세 이상인 users의 names를 수집한다.
  var names:string[] = [];
  for(var i = 0; i < temp_users.length; i++) {
    names.push(temp_users[i].name);
  }
  console.log(names);
  
  // 3. 30세 미만인 users를 거른다.
  var temp_users = [];
  for(var i = 0; i < users.length; i++) {
    if(users[i].age < 30){
        temp_users.push(users[i]);
    }
  }
  console.log(temp_users);

  // 4. 30세 미만인 users의 ages를 수집한다.
  var ages:number[] = [];
  for(var i = 0; i < temp_users.length; i++) {
    ages.push(temp_users[i].age);
  }
  console.log(ages);

// 2. _filter, _map으로 리팩토링
/**
 * 객체나 클래스가 아니라 함수를 이용해서 추상화 하는 것을 함수형 프로그래밍이라 한다.
 * filter와 map 같은 함수를 응용형 함수라고 한다.
 * 응용형 함수는 함수가 함수를 인자로 받아서 원하는 시점에 해당 함수가 알고 있는 인자를 적용하는식으로 프로그래밍
 * 하는 것을 말하며 적용형 프로그래밍이라고도 말한다.
 * 
 * 또한 filter와 map 같은 함수를 고차 함수라고도 한다.
 * 고차 함수는 함수를 인자로 받거나 함수를 리턴하거나 함수안에서 인자로 받은 함수를 실행하는 함수를 말한다.
 */

var over_30 = _filter(users, function(user:User){ return user.age >= 30 })
console.log(over_30);

var under_30 = _filter(users, function(user:User){ return user.age < 30 })
console.log(under_30);


var names:string[] = _map(over_30, function(user:User){return user.name});
console.log(names);

var ages:number[] = _map(under_30, function(user:User){return user.age});
console.log(ages);

// 대입문을 없애고 함수를 중첩 시키는 방식으로 변경
console.log(
    _map(
      _filter(users, function(user:User) { return user.age >= 30; }),
      function(user:User) { return user.name; }));
  
  console.log(
    _map(
      _filter(users, function(user:User) { return user.age < 30; }),
      function(user:User) { return user.age; }));
      
var add = _curry(function(a:number, b:number) {
    return a + b;
})

var add10 = add(10);
var add5 = add(5);

console.log( add10(5) );
console.log( add(5)(3) );
console.log( add5(3) );

var sub = _curryr(function(a:any, b:any) {
    return a - b;
});
console.log( sub(10, 5) );

var sub10 = sub(10);
console.log( sub10(5) );

var user1 = users[0];
console.log(user1.name);
console.log(_get(user1, "name"));
console.log(_get(users[10], "name"));

// 커링을 get에 적용하면 아래와 같이도 사용 가능함
console.log(_get('name')(user1));

var get_name = _get('name');
console.log(get_name(user1));
console.log(get_name(users[2]));
console.log(get_name(users[4]));

// map과 filter에 커링 적용하기 
console.log(
    _map(
      _filter(users, function(user:User) { return user.age >= 30; }),
      _get('name')));
  
  console.log(
    _map(
      _filter(users, function(user:User) { return user.age < 30; }),
      _get('age')));

//reduce
console.log(_reduce([1, 2, 3], function(a: any, b : any){ return a + b}, 0));

console.log(_reduce([1, 2, 3], add));

//pipe
var f1 = _pipe(
  function(a:number) { return a + 1; },
  function(a:number) { return a * 2; },
  function(a:number) { return a * a; });

console.log(f1(1));

_go(
  1,
  function(a:number) { return a + 1; },
  function(a:number) { return a * 2; },
  function(a:number) { return a * a; },
console.log);

// users에 _go 적용
console.log(
  _map(
    _filter(users, function(user:User) { return user.age >= 30; }),
    _get('name')));

console.log(
  _map(
    _filter(users, function(user:User) { return user.age < 30; }),
    _get('age')));

_go(users,
    _filter(function(user:User) { return user.age >= 30; }),
    _map(_get("name")),
    console.log
  );

_go(users,
    _filter((user:User) => user.age >= 30),
    _map(_get("age")),
    console.log
  );

// _each에 null이 들어가도 에러 안나게 처리
_each(null, console.log);
console.log(_map(null, function(v:any){ return v; }));
console.log(_filter(null, function(v:any){ return v; }));

_go(null,
  _filter(function(v:any){return v % 2}),
  _map(function(v:any){return v * v}),
  console.log
)

// _keys
console.log(_keys({name: "ID", age : 33}));
console.log(_keys([1, 2, 3, 4]));
console.log(_keys(10));
console.log(_keys(null));

// _each 외부 다형성 높이기

_each({
  13 : 'ID',
  19 : 'HD',
  29 : 'YD'
}, function(name: string) {
  console.log(name);
})

