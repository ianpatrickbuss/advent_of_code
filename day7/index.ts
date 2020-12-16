const bagMap: Map<string, string[]> = new Map();

const bagRegX = /(\d)|(bags)|(bag)|(\.)/g

const graphIt = (line: string): void => {
  const graph = line.split('contain');
  const head = graph[0].replace(bagRegX,'').trim();
  if(graph[1].includes('no other')) {
    return;
  }
  const nodes = graph.slice(1).map(node => {
    return node.split(',').map(bag => {
      return bag.replace(bagRegX,'').trim()
    })
  }).flat();
  bagMap.set(head,nodes);
}

const eligibleBags = new Set();

const main = async () => {

  const text = await Deno.readTextFile("./day7/input.txt");
  const lines = text.split('\n');
  const bagsWithGold: string[] = [];
  const bagsWithoutGold: string[] = [];
  lines.forEach(line => {
    if(line.includes('shiny gold')){
      bagsWithGold.push(line);
    } else {
      bagsWithoutGold.push(line)
    }
  })
  const rules = [...bagsWithGold,...bagsWithoutGold];
  rules.forEach(graphIt)
  bagMap.forEach((bags: string[],head: string) => {
    let eligible = false;
    for(let i = 0; i<bags.length; i++) {
      const bag = bags[i];
      if(eligibleBags.has(bag)) {
        eligible = true;
        break
      }
    }
    if(bags.includes('shiny gold') || eligible){
      eligibleBags.add(head);
    }
  })

  
  console.log(eligibleBags.size)  
  // console.group('bagMap')
  // bagMap.forEach((bag,head) => {
  //   console.log(`${head} => ${bag}`);
  // })
  // console.groupEnd();
  // console.log('-------');
  // console.group('bags:')
  // eligibleBags.forEach((val) => {
  //   console.log(val)
  // })
  // console.groupEnd()
}

main()