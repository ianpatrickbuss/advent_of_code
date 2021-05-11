type NumArrMap = Map<number,number[]>
type WeakList = [number,number[]];

const toNum = (str: string): number => Number(str);

const countDifferences = (adapters: number[]): number[] => {
  const differences = [0,0,0]
  for(let L = 0; L<adapters.length; L++){
    const diff = adapters[L+1]-adapters[L];
    if(diff<4 && diff>0){
      differences[diff-1]++;
    }
  }
  return differences;
}


/**
  * 1, 4, 5, 6, 7, 10, 11, 12, 15, 16, 19,
  * 1, 4, 5, 7, 10, 11, 12, 15, 16, 19, 
  * 1, 4, 6, 7, 10, 11, 12, 15, 16, 19,
  * 1, 4, 7, 10, 12, 15, 16, 19,
  * 1, 4, 7, 10, 11, 12, 15, 16, 19,
  * 1, 4, 5, 6, 7, 10, 12, 15, 16, 19,
  * 1, 4, 5, 7, 10, 12, 15, 16, 19,
  * 1, 4, 6, 7, 10, 12, 15, 16, 19,
*/

var count = 0;
const traverse = (lines: number[],i: number): void => {
  var size = lines.length;
  console.log(i,count)
  if(i>=size) {
    return;
  }
  if(i === (size - 1)) {
    count++;
    return;
  }
  if(i <= (size - 2) && (lines[i+1]-lines[i]) <= 3) {
      traverse(lines,i+1);
  }
  if(i <= (size - 3) && (lines[i+2]-lines[i]) <= 3) {
      traverse(lines,i+2);
  }
  if(i <= (size - 4) && (lines[i+3]-lines[i]) <= 3) {
      traverse(lines,i+3);
  }
}

const main = async () => {
  const text = await Deno.readTextFile("./day10/input.txt");
  const lines = text.split('\n').map(n=>toNum(n)).sort((a,b)=>a-b);
  console.log(lines)
  const part1 = countDifferences(lines)
  
  console.log('well slap me silly me the answer is:', count)
}

main()
