function sum() {
  var total = 0
  for (let i = 0; i < arguments.length; i++) {
    total = total + arguments[i];
    
  }
  console.log(total)
}

sum(1,7,9)
sum(12)
sum(7,10,8,15)
sum(1,7,15,25,5,10)