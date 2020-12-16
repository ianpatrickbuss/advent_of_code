const tobaggin = (lines: string[]): number => {
  // for each line:
  // index = line #*multipler
  // see if that character at that index is `#`
  const travel = (multipler:number) => {
    let trees = 0;
    for(let n = 0; n<lines.length; n++) {
      if((multipler*n)%1!==0) {
        continue;
      }
      let line = lines[n];
      let pos = Math.floor(n*multipler)%(line.length);
      let char = line[pos];
      let path = line.slice(0,pos) + (char==='#' ? 'X' : 'O') +line.slice(pos+1);
      char === '#' ? trees++ : null; 
      console.log(`%c${path}`,'color: ' + (char === "#" ? 'red' : 'green'));
    }
    return trees;
  }
  
  let slopes = [1,3,5,7,.5];
  let res = 1;
  let treesPerSlope = [0,0,0,0,0]
  for(let s = 0; s<slopes.length; s++) {
    console.group('Slope: ' + slopes[s])
    let trees = travel(slopes[s])
    treesPerSlope[s] = trees;
    res *= trees;
    console.log('trees: ' + trees)
    console.groupEnd()
  }
  return res;
}

const main = async () => {
  
  const text = await Deno.readTextFile("./day3/input.txt");
  
  const lines = text.split('\n');
  const res = tobaggin(lines);
  console.log(res)
}

main()