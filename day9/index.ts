const toNum = (str: string): number => Number.parseInt(str,10);

const add = (L: number, R: number): number => L+R;

const  twoNumberSum = (array: number[], targetSum: number): number[] => {
	const set: Set<number> = new Set(array.map(n => n));
	const solution = [];
	for(const num in array){
		const n = array[num];
		if(set.has(targetSum-n) && n+n!=targetSum){
			solution.push(n);
		}
	}
	return solution
}

const findTheSums = (left: number, right: number, sorted: number[], target: number): number[] | void => {
  const sliced = sorted.slice(left,right);
  const answer = sliced.reduce(add);
  if(answer===target) {
    console.log('fuckyes',sliced.sort((a,b)=>a-b)[0]+sliced.sort((a,b)=>a-b)[sliced.sort((a,b)=>a-b).length])
    return sliced;
  }
  if(answer<target){
    findTheSums(left,right+1,sorted,target);
  }
  if(answer>target){
    findTheSums(left+1,right-1,sorted,target)
  }
}

const main = async () => {
  var result = 0;
  const text = await Deno.readTextFile("./day9/input.txt");
  const lines = text.split('\n').map(n => toNum(n));
  const size = 25
  for(let i = 0; i<lines.length-size; i++) {
    const line = lines[i+size];
    const res = twoNumberSum(lines.slice(i,i+size),line)
    if(res.length<1) {
      result = line;
      const sorted = lines;
      const ahhh = findTheSums(0,1,sorted,result)
      console.log('fuck',ahhh)
      break;
    }
  }
  console.log(result)
}

main()