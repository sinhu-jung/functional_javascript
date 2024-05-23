//@ts-nocheck

var _map = _curryr(function _map(list: any, mapper: Function) { 
    var new_list:any[] = [];
    _each(list, function(val:any){
        new_list.push(mapper(val));
    })
    return new_list;
})

var _filter = _curryr(function _filter(list: any, predi: Function) {
    var new_list:any[] = [];
    _each(list, function(val:any) {
        if(predi(val)) new_list.push(val);
    })
    return new_list;
})

  // _get을  만들어 좀 더 간단하게 만들기
  /**
   * get이라는 함수는 오브젝트에 있는 값을 안전하게 참조하는 함수로써 의미를 가진다.
   */
  var _get = _curryr(function (obj:any, key:string) {
    return obj == null ? undefined : obj[key];
  })

  // _keys 만들기
function _is_object(obj:any) {
  return typeof obj === "object" && !!obj;
}

function _keys(obj:any) {
  return _is_object(obj) ? Object.keys(obj) : [];
}

var _length = _get('length');

// each 함수를 이용하여 filter와 map에 있는 중복된 반복문을 함수로 만들어 사용
function _each(list:any, iter:Function) {
  var keys = _keys(list);

    for(var i = 0 ,len = keys.length; i < len; i++) {
        iter(list[keys[i]]);
    }

    return list;
}

// 외부 다형성
    // 1. array_like, arguments, document.querySelectorAll

    /**
     * 배열 안에 있는 map과 filter는 함수가 아니라 메서드이다.
     * 메서드는 순수 함수가 아니고 객체의 상태에 따라 결과가 달라지는 특징을 가지고 있다.
     * 메서드는 객체 지향 프로그래밍이다.
     * 메서드는 해당 클래스에 정의 되기 때문에 해당 클래스의 인스턴스에만 사용할 수 있다는 특징을 가지고 있다.
     */
    // console.log(
    //     [1, 2, 3, 4].map(function(val) {
    //       return val * 2;
    //     })
    //   );
      
    //   console.log(
    //     [1, 2, 3, 4].filter(function(val) {
    //       return val % 2;
    //     })
    //   );

    // document.querySelectorAll('*'); 해당 명령문을 출력 해보면 배열 형식으로 나오는데 
    // 이것은 배열이 아니라 array_like 객체이다.
    // 왜냐하면 이것이 배열이라면 map 이라는 함수가 안에 있어야 하지만 없다.
    // console.log(document.querySelectorAll('*'));
    
    /**
     * 아래와 같이 실행을 해보면 에러가 발생한다.
     * 따라서 메서드는 해당 클래스에 준비 돼 있지 않은 메서드는 사용할 수 없다.
     * 그래서 다형성을 지원하기가 어려운 부분이 있다.
     * 하지만 함수형 프로그래밍에서는 함수를 만들고 그 함수에 맞게 데이터를 구성해서 함수에 적용하는 프로그래밍을 하기 때문에
     * 다형성을 지원 할 수 있다. 
     */
    /*
        console.log(
            document.querySelectorAll('*').map(function(node) {
            return node.nodeName;
            });
        );
    */

    /**
     * 만들어 놓은 map으로 위의 코드를 함수형으로 변경만 해도 에러 없이 잘 돌아가는 것을 알 수 있다.
     * 따라서 객체지향은 평가의 순서가 굉장히 중요하다. 반드시 해당하는 객체가 생겨야 기능을 수행 할 수 있기 때문이다.\
     * 하지만 함수의 경우에는 함수 자체는 혼자 먼저 존재 하기 때문에 내부 데이터가 생기지 않더라도 함수 자체가 존재 하므로
     * 평가 자체가 매우 유연해 진다.
     * 이것을 이용하여 더 높은 조합성을 적용할 수 있다.
     */
    // console.log(
    //     _map(document.querySelectorAll('*'), function(node:Element) {
    //       return node.nodeName;
    //     })
    // );

  // 내부 다형성
    // 1. predi, iter, mapper
    /**
     * 아래와 같이 만들면 두 번째 함수를 콜백 함수라고 부르는 경향이 있는데
     * 함수형 프로그래밍에서는 두번 째 함수가 어떤 역할을 하는지에 따라 다양한 이름을 가질 수 있다.
     * 콜백 함수는 어떤 일들을 다 수행 한 뒤 돌려줄 때 라고 부른다.
     * 그래서 어떤 것을 예측하는 함수 predicate, 반복적으로 실행 함수 iterater, 무언가와 무언가를 맵핑 해주는 함수
     * 이렇게 각각의 역할에 맞는 보조하는 함수의 이름을 따로 불러주는 것이 좋다.
     */
    _map([1, 2, 3, 4], function(v:number) {
        return v + 10;
      });

    /**
     * 외부의 다형성은 array_like, arguments, document.querySelectorAll 같이 돌림직한 모든 객체들을 다 돌릴 수 있도록 하는 것은
     * 고차 함수의 부족 즉 _map과 _filter가 어떻게 구현 됐느냐에 따라서 결정 되지만
     * 안에서 뭔가 수행 할 수 있도록 하는 것은 보조 함수의 역할이다.
     * 그래서 내부 값에 대한 다형성은 predi, iter, mapper 와 같은 보조 함수가 책임 지고 있다.
     */

// 커링
/**
 * currying은 함수와 인자를 다루는 기법이다.
 * 함수에 인자를 하나 씩 적용하다가 필요한 인자가 모두 채워지면 함수 본체를 실행하는 기법이다.
 * javascript에서는 커링이 지원이 안 되지만 일급함수가 지원 되고 평가시점을 마음대로 다룰 수 있기 때문에
 */

    function _curry(fn:Function) {
      return function(a: any, b?: any) {
          return arguments.length == 2 ? 
          fn(a, b) : function(b: any) { return fn(a, b) };
      }
  }
  
  function _curryr(fn:Function) {
      return function(a: any, b?: any) {
          return arguments.length == 2 ? 
          fn(a, b) : function(b: any) { return fn(b, a) };
      }
  }

  // _reduce 만들기
var slice = Array.prototype.slice;
function _rest(list:any, num?: number) {
  return slice.call(list, num || 1);
}

function _reduce(list:any, iter:Function, memo?: any) {
  if(arguments.length === 2) {
    memo = list[0];
    list = _rest(list);
  }
  _each(list, function(val:any) {
    memo = iter(memo, val);
  })
  return memo;
}

// 파이프라인 만들기
// 1. pipe
/**
 * pipe는 함수들을 인자로 받아서 연속적으로 실행 시켜 주는함수를 리턴해주는 함수이다.
 */
function _pipe(...fns:any) {
  return function(arg: any) {
    return _reduce(fns, function(arg:any, fn:Function){
      return fn(arg);
    }, arg)
  }
}

// 2. go
/**
 * go는 pipe 함수인데 즉시 실행 되는 파이프 함수라고 보면 된다.
 */
function _go(arg, ...args) {
  return _pipe.apply(null, args)(arg);
}

// values
function _identity(val:any) {
  return val;
}

var _values = _map(_identity);

// pluck
function _pluck(data, key) {
  return _map(data, _get(key))
}

// reject
function _reject(data, predi) {
  return _filter(data, _negate(predi))
}

function _negate(func) {
  return function(val) {
    return !func(val);
  }
}

var _compact = _filter(_identity)

var _find = _curryr(function (list:any, predi:Function) {
  var keys = _keys(list);

    for(var i = 0 ,len = keys.length; i < len; i++) {
        var val = list[keys[i]];
         if(predi(val)) return val;
    }
});

var _find_index = _curryr(function (list:any, predi:Function) {
  var keys = _keys(list);

    for(var i = 0 ,len = keys.length; i < len; i++) {
         if(predi(list[keys[i]])) return i;
    }
});

function _some(data, predi) {
  return _find_index(data, predi || _identity) != -1;
}

function _every(data, predi) {
  return _find_index(data, _negate(predi || _identity)) == -1;
}

export {
    _filter,
    _map,
    _curry,
    _curryr,
    _get,
    _reduce,
    _pipe,
    _go,
    _each,
    _keys,
    _values,
    _pluck,
    _reject,
    _compact,
    _find,
    _find_index,
    _some,
    _every
}