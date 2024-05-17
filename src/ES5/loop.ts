import { _filter, _map } from "./_";

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
type User = {id: number, name: string, age:number}

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