const getEligibleBags = (lines: string[]): Set<string> => {
  const eligibleBags: Set<string> = new Set();

  const getHead = (line: string): string => line.split('contain')[0].replace(/(bags)|(bag)/,'').trim();
  
  const findHeads = (head: string): string[] => lines.filter(rule => {
    const contain = new RegExp(`(${head})`);
    const startWith = new RegExp(`^(${head})`);
    return contain.test(rule) && !startWith.test(rule)
  }).map(rule => getHead(rule));

  lines.forEach(line=> {
    if(line.includes('shiny gold') && !/^(shiny gold)/.test(line)) {
      const head = getHead(line);
      eligibleBags.add(head);
      findHeads(head).forEach(bag => [
        eligibleBags.add(bag)
      ]);
    }
  })

  eligibleBags.forEach(bag => {
    findHeads(bag).forEach(b => {
      eligibleBags.add(b)
    });
  })
  
  return eligibleBags;
}

const getNumberOfNestedBags = (term: string,lines: string[]): number => {
  var res = 0;
  for(let L = 0; L<lines.length; L++) {
    const line = lines[L];
    const regex = new RegExp(`^(${term})`);
    if(regex.test(line) && /\d+/.test(line)) {
      const numbers = line.match(/\d+/g);
      if(!numbers) break; 
      const sum = numbers.map(num => Number.parseInt(num,10)).reduce((L,R) => L+R)
      res += sum;
      line.split('contain')[1].split(',').forEach(bag => {
        const head = bag.replace(/(bags)|(bag)|\d+|\./g,'').trim();
        const digits = /\d+/.exec(bag);
        let multipler = 1;
        if(digits) {
          multipler = Number.parseInt(digits[0],10);
        }
        res += multipler*getNumberOfNestedBags(head,lines);
      })
    }
  }
  return res;
}

const main = async () => {
  const text = await Deno.readTextFile("./day7/input.txt");
  const lines = text.split('\n');
  const part1 = getEligibleBags(lines); 
  console.log(part1)
  const part2 = getNumberOfNestedBags('shiny gold',lines);
  console.log(part2)
}

main()