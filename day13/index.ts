const nextTime = (lines: string[]): number => {
  const time = Number(lines[0]);
  const buses = lines[1].split(',').filter(x => x!=='x').map(id => Number(id));

  const nextTime = buses.map(bus => {return {bus, time: (bus-time%bus)+time}}).sort((a,b) => a.time-b.time)[0];
  return (nextTime.time-time)*nextTime.bus;
}

type timeSlot = {
  bus: number,
  offset: number,
}

const getTimeSlots = (line: string): timeSlot[] => {
  const buses = line.split(',').map(x => Number(x));
  var times: timeSlot[] = [{
    bus: buses[0],
    offset: 0
  }]; 
  let i = 1;
  buses.reduce((left,right, idx) => {
    if(isNaN(right)) {
      i++;
      return left;
    } else {
      times.push({
        bus: right,
        offset: i
      });
      i++
      return right;
    }
  })
  return times;
}

function ChineseRemainderTheorem(num: number[], rem: number[]): number {
  let sum = 0;
  const prod = num.reduce((a, c) => a * c);
  console.log(prod)
 
  for (let i = 0; i < num.length; i++) {
    const [ni, ri] = [num[i], rem[i]];
    const p = Math.floor(prod / ni);
    sum += ri * p * mulInv(p, ni);
  }
  return sum % prod;
}


function mulInv(a: number, b: number): number {
  const b0 = b;
  let [x0, x1] = [0, 1];
 
  if (b === 1) {
    return 1;
  }
  while (a > 1) {
    const q = Math.floor(a / b);
    [a, b] = [b, a % b];
    [x0, x1] = [x1 - q * x0, x0];
  }
  if (x1 < 0) {
    x1 += b0;
  }
  return x1;
}

const main = async () => {
  const text = await Deno.readTextFile("./day13/example.txt");  
  const lines = text.split('\n');
  const timeSlots = getTimeSlots(lines[1]);
  console.log(timeSlots)
}
main()