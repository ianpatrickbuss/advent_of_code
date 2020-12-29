const toNum = (str: string): number => Number.parseInt(str,10);

const main = async () => {
  var res = 0;
  const text = await Deno.readTextFile("./day8/input.txt");
  const lines = text.split('\n');

  const commands: number[] = [];
  lines.forEach((line,idx) => {
    const [command, val] = line.split(' ');
    if(command ==='jmp' || command==='nop') {
      commands.push(idx);
    }
  })
  const doItAgain = (C: number): number => {
    const positions = new Set();
    var acc = 0;
    for(let L = 0; L<lines.length; L++) {
      if(positions.has(L)) {
        throw new Error(`Looped at ${L}`)
      }
      positions.add(L)
      let [command, val] = lines[L].split(' ');
      const num = toNum(val);
      console.log(L, lines[L])
      if(L===C) {
        console.log('command ->',command)
        command = command === 'jmp' ? 'nop' : 'jmp';
        continue;
      }
      if(command === 'jmp') {
        L += num-1;
        continue;
      }
      if(command === 'acc') {
        acc += num;
        continue;
      }
    }
    return acc;
  }
  let iterations = 0;
  for(let idx = 0; idx<commands.length; idx++) {
    const C = commands[idx];
    iterations++;
    try {
      res = doItAgain(C);
      break;
    } catch(e) {
      continue;
    }
  }
  console.log('THE ANSWER IS', res, 'AND IT TOOK',iterations,'ITERATIONS')
}

main()