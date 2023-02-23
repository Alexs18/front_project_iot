let json = '[{"name":"karen", "price":20.90},{"name":"mero", "price":30.20},{"name":"alex", "price":50.20} ]'

function getjson(jsonparams) {
    let getjson = JSON.parse(jsonparams);
    console.log(getjson);
    let tra = []
    let x = getjson.sort((a,b)=>{
        console.log(a);
        console.log('2');
        console.log(b);
        debugger
    })

}

getjson(json);