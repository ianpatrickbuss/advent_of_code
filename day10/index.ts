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

const getPossibilityMap = (adapters: number[]): [NumArrMap, NumArrMap] => {
  const diffMap: Map<number,number[]> = new Map(adapters.map(a => [a,[]]));
  const permMap: NumArrMap = new Map();
  for(let L = 0; L<adapters.length; L++){
    const curr = adapters[L];
    const target = diffMap.get(curr) 
    if(!target) throw new Error('Something went terribly wrong grabbing the target');
    let right = 1;
    while(right<=3) {
      if(diffMap.has(curr+right)) {
        target.push(right)
        diffMap.set(curr,target)
      }
      right++;
    }
    if(target.length>1) {
      permMap.set(curr,target)
    }
  }
  return [diffMap, permMap];
}


const reverseMap = (map: NumArrMap): NumArrMap => {
  const weakList: WeakList[] = []
  map.forEach((diffs,key) => {
    weakList.push([key,diffs])
  })
  weakList.sort((a,b) => b[0]-a[0])
  const reverseMap: NumArrMap = new Map(weakList.map(set => [set[0],set[1]]))
  return reverseMap;
}

const getPaths = (diffMap: NumArrMap, permMap: NumArrMap): NumArrMap => {
  const result: NumArrMap = new Map();
  const rMap = reverseMap(permMap);
  var count = 0;
  diffMap.forEach((diff,key) => {
    const rightMap = rMap;
    const keys = rightMap.keys();
    let rKey = keys.next().value;
    while(rKey && rKey>key){
      console.log({key,rKey})
      rKey = keys.next().value
      count++;
    }
  })
  console.log(count)
  return result;
}

const getPermutations = (adapters: number[], permMap: NumArrMap): number => {
  var count = 1;
  const permutations = [adapters];
  // Reverse the Possible Paths
  const rMap = reverseMap(permMap);
  // Iterate Over Each Number
  for(let idx = 0; idx<adapters.length; idx++) {
    const num = adapters[idx];
    // Does this number have multiple paths?
    const diffs = permMap.get(num);
    if(diffs) {
      // Take the current segment 
      const segement = adapters.slice(idx);
      const leftMap = permMap;
      // Go to the end of the list till the map is expended
      while(diffs.length>0) {
        // diffs.forEach()
        rMap.forEach((rDiffs,key) => {
          if(key>num) {

          }
        })
      }
    }
  }
  return count;
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


const main = async () => {
  const text = await Deno.readTextFile("./day10/input.txt");
  const lines = text.split('\n').map(n=>toNum(n)).sort((a,b)=>a-b);
  console.log(lines)
  const part1 = countDifferences(lines)
  // console.log(part1)
  const [numMap,permMap] = getPossibilityMap(lines)
  console.log(permMap)
}

main()