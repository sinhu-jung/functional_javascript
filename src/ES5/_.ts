function _map(list: any[], mapper: Function) { 
    var new_list:any[] = [];
    _each(list, function(val:any){
        new_list.push(mapper(val));
    })
    return new_list;
}

function _filter(list: any[], predi: Function) {
    var new_list:any[] = [];
    _each(list, function(val:any) {
        if(predi(val)) new_list.push(val);
    })
    return new_list;
}

// each 함수를 이용하여 filter와 map에 있는 중복된 반복문을 함수로 만들어 사용
function _each(list:any[], iter:Function) {
    for(var i = 0; i < list.length; i++) {
        iter(list[i]);
    }

    return list;
}


export {
    _filter,
    _map
}