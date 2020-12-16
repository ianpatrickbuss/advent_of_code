function twoNumberSum(array: number[], targetSum: number): number[] {
  let hashMap = new Map(array.map(n => [n,n]));
  let solution: number[] = [];
  for(let num in array){
    let n = array[num];
    // console.log(n,num,solution)
    if(hashMap.has(targetSum-n) && n+n!=targetSum){
      solution.push(n);
    }
  }
  return solution
}

function threeNumberSum(array: number[], targetSum: number): number[][] {
  array.sort((a, b) => {
   if (a < b) {
     return -1;
   } else if (b > a) {
     return 1;
   }
   return 0;
 });
 var result = [];
 var rightPointer = array.length - 1;
 var leftPointer = 1;
 
 // Adjust All this
 while (array.length > 3) {
   array.reduce((left: any, curVal, idx, src: number[]) => {
     let right = src[rightPointer];
     let current = src[leftPointer];
     let sum = left + current + right;
     if (current >= right) {
       return;
     }
     if (sum < targetSum) {
       leftPointer++;
       return left;
     } else if (sum > targetSum) {
       rightPointer--;
       return left;
     } else if (sum === targetSum) {
       result.push([left, current, right]);
       rightPointer--;
       leftPointer++;
       return left;
     }
   });
   array.shift();
   rightPointer = array.length - 1;
   leftPointer = 1;
 }
 array.reduce((a, c) => a + c) === targetSum ? result.push([...array]) : null;
 return result;
}

const main = async () => {
  
  const text = await Deno.readTextFile("./day1/input.txt");
  
  const numbers = text.split('\n').map(n => Number.parseInt(n, 10)).filter(n => !isNaN(n));

  const twoNumSum = twoNumberSum(numbers,2020);
  console.log(twoNumSum)
  const threeNumSum = threeNumberSum(numbers,2020);
  console.log(threeNumSum[0].reduce((l,r) => l*r));
}

main()

