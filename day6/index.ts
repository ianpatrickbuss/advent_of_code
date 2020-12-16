type Answers = string[]

const linesToGroups = (lines: string[]): string[][] => {
  const groups: Answers[] = [];
  let group: string[] = []
  lines.forEach(line => {
    if(line.length>0) {
      group.push(line);
    } else {
      groups.push(group);
      group = []
    }
  })
  return groups
}

const sumOfAnswers = (group: string[]): number => {
  
  if(group.length===1) return group[0].length;
  

  const answerMap = new Map();

  group.forEach(person => {
    person.split('').forEach(answer => {
      const a = answerMap.has(answer) ? answerMap.get(answer) : 0;
      answerMap.set(answer,a+1);
    });
  })

  let sum = 0;
  answerMap.forEach((num,answer) => {
    num === group.length ? sum++ : null; 
  })
  return sum;
}

const main = async () => {
  
  const text = await Deno.readTextFile("./day6/input.txt");
  
  const lines = text.split('\n');
  const groups = linesToGroups(lines);
  const res = groups.map(sumOfAnswers).reduce((l,r) => l+r);
  console.log(res);
}

main()