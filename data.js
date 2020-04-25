const data = require(__dirname + '/source/data/data.json')
const fs = require('fs');

const tempPoints = {};
const dates = {}
const ssic = {}

const result = [];

for (var i=0; i < data.length; i++){

    data[i].s = (function(){

        let result = [];

        for (var e = 0; e < data[i].s.length; e++ ){
            if (data[i].s[e] && data[i].s[e] !== 'null') result.push(new Number(data[i].s[e]) + 0 );
        }

        return result;

    })()

    data[i].p = (function(){

        let accuracy = 4;

        let result = [

            new Number(data[i].p[0].toFixed(accuracy)) + 0,
            new Number(data[i].p[1].toFixed(accuracy)) + 0

        ];

        return result

    })()

    data[i].d = (function(){

        let current = new Number(data[i].d) + 0

        return current - 1887;

    })()

    if (!tempPoints[ data[i].p[0] + ' ' + data[i].p[1] ]) {
        tempPoints[ data[i].p[0] + ' ' + data[i].p[1] ] = {};
    }    

    if (!tempPoints[ data[i].p[0] + ' ' + data[i].p[1] ][data[i].d]) {
        tempPoints[ data[i].p[0] + ' ' + data[i].p[1] ][data[i].d] = {};
    }    

    if (data[i].s[0] && !tempPoints[ data[i].p[0] + ' ' + data[i].p[1] ][data[i].d][data[i].s[0]]) {
        tempPoints[ data[i].p[0] + ' ' + data[i].p[1] ][data[i].d][data[i].s[0]] = null
    }
    
    if (data[i].s[1] && !tempPoints[ data[i].p[0] + ' ' + data[i].p[1] ][data[i].d][data[i].s[1]]) {
        tempPoints[ data[i].p[0] + ' ' + data[i].p[1] ][data[i].d][data[i].s[1]] = null
    }

}

for (var i in tempPoints) {

    var ssicByPoint = {}

    for (var d in tempPoints[i]){

        for (var s in tempPoints[i][d]){
            ssicByPoint[s] = s;
        }
        
        tempPoints[i][d] = (function(){

           var arr = []
            
           for (var c in ssicByPoint) {
               arr.push(new Number(c)+0) 
               ssic[c] = c;
           }

           return arr;

        })()

    }

}

for (var i in tempPoints) {

    var point = [];

    var p = (function(){
        return [

            new Number(i.split(' ')[0]) + 0,
            new Number(i.split(' ')[1]) + 0
        ]
    })()

    point.push(p)
    point[1] = []

    for (var e in tempPoints[i]){

        var date = new Number(e) + 0;

        var numbers = []

        for (var n in tempPoints[i][e]) {

            let code = ((tempPoints[i][e][n] + '').length < 5 ) ? '0' + tempPoints[i][e][n] : tempPoints[i][e][n];

            numbers.push(code)//numbers.push(new Number(tempPoints[i][e][n]) + 0)

        }

        if (date >= 33) { //31
        dates[date] = date

        point[1].push([
            date,
            numbers
        ])

        }

    }

    result.push(point)

}

var ssicLength = 0;
for (var s in ssic){

    ssicLength++    

}

console.log(dates)
console.log(ssicLength)
console.log(result.length)

fs.writeFile(__dirname + '/source/data/data-new.json', JSON.stringify(result), function (err) {
    if (err) return console.log(err);
  });

