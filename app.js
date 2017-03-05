/**
 * Created by madhav on 5/3/17.
 */

var async = require('async');
var _ = require('underscore');
var inputArray = ["1","2","3","4","5","6"], inputNumber = 3, result = [];
inputArray.sort(function(a,b){
  return Number(a)-Number(b)
});

// async.forEach(inputArray,function(item,callback){
//   var index = inputArray.indexOf(item), count = 0, left = index-1, right = index+1, temp = [];
//   while(left >= 0 && count <= inputNumber && right < inputArray.length){
//     if(item-inputArray[left] < inputArray[right]-item){
//       temp.push(inputArray[left]);
//       left--;
//     }else{
//       temp.push(inputArray[right]);
//       right++;
//     }
//     count++;
//   }
//
//   while(count <= inputNumber && left >= 0){
//     temp.push(inputArray[left]);
//     left--;
//     count++;
//   }
//
//   while(count <= inputNumber && right < inputNumber){
//     temp.push(inputArray[right]);
//     right++;
//     count++;
//   }
//   result.push({key:item,value:temp});
//   callback()
// },function(err){
//   if(err) console.log(err);
//   else console.log(result);
// });

async.forEach(inputArray,function(item,callback){
  item = Number(item);
  var obj = {key:item, value:[]}, temp = [];
  async.forEach(inputArray,function(item2,cb){
    item2 = Number(item2);
    if(item === item2) cb();
    else{
      temp.push({"key":item2,"diff":Math.abs(item-item2)});
      cb();
    }
  },function(err){
    if(err) callback(err);
    else{
      temp.sort(function(a,b){
        if((a.diff-b.diff) === 0) return b.key-a.key;
        else return a.diff-b.diff
      });
      obj.value = _.pluck(temp,'key').slice(0,inputNumber);
      obj.value.sort();
      result.push(obj);
      callback();
    }
  });
},function(err){
  if(err) console.log(err);
  else console.log(result);
});