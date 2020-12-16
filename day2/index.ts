const logger = (val: any) => {
  console.log(val)
}

const between = (val: number, comp: number[]): boolean => {
  return val>=comp[0] && val<=comp[1]
}

const oldPasswordPolicy = (lines: string[]) => {
  let c = 0;
  for(let k = 0; k<lines.length; k++) {
    let line = lines[k];
    let [policy,char,password] = line.split(' ');
    char = char.replace(':','');
    let w: string[] = policy.split('-');
    let min: any = w[0], max: any = w[1];
    min = Number.parseInt(min,10);
    max = Number.parseInt(max,10);
    let chars = password.split('');
    chars = chars.filter(c => c===char);
    if(between(chars.length,[min,max])) {
      console.log("%c" + line + " " + chars.length,"color:green");
      c++;
    } else {
      console.log("%c" + line + " " + chars.length,"color:red");
    }
  }
  return c;
}

const newPasswordPolicy = (lines: string[]): number => {
  let c = 0;
  for(let k = 0; k<lines.length; k++) {
    let line = lines[k];
    let [policy,char,password] = line.split(' ');
    char = char.replace(':','');
    let w: string[] = policy.split('-');
    let pos1: any = w[0], pos2: any = w[1];
    pos1 = Number.parseInt(pos1,10)-1;
    pos2 = Number.parseInt(pos2,10)-1;

    let pos1Match = password[pos1] === char;
    let pos2Match = password[pos2] === char;
    if(pos1Match && !pos2Match) {
      console.log("%c" + line + " " + [pos1,pos2] + ' pos1Match && !pos2Match ' + [pos1Match,pos2Match],"color:green");
      c++;
    } else if(pos2Match && !pos1Match) {
      console.log("%c" + line + " " + [pos1,pos2] + ' pos2Match && !pos1Match ' + [pos1Match,pos2Match],"color:green");
      c++;
    } else {
     console.log("%c" + line + " " + [pos1,pos2] + ' (!pos1Match && !pos2Match)||(pos1Match && pos2Match) ' + [pos1Match,pos2Match],"color:red");
    }
  }
  return c;
}
const main = async () => {
  
  const text = await Deno.readTextFile("./day2/input.txt");
  
  const lines = text.split('\n');
  const res = newPasswordPolicy(lines);
  logger(res)
}


main()