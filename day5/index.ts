const calcSeatID = (row: number,column: number): number => {
  return row*8 + column
}

// FBFBBFRLR
// plane has 128 rows 0-127
// F lower half 0-63
// B upper half 32-63
// F lower half 32-47
// B upper half 40-47
// B upper half 44-47
// F 44-45
// F 44
// 7 columns 
// R 4-7
// L 4-5
// R 5


const findRowAndColumn = (pass: string): number => {
  
  let row = 0;
  let rowHead = 127;
  let column = 0;
  let columnHead = 7;
  
  const formula = (r: number, h: number) => h-(h-r)/2

  const upper = (p:number,h:number): number => Math.ceil(formula(p,h));
  const lower = (p:number,h:number): number => Math.floor(formula(p,h));

  pass.split('').forEach(letter => {
    if(letter === 'F') {
      rowHead = lower(row,rowHead)
    }
    if(letter === 'B') {
      row = upper(row,rowHead)
    }
    if(letter === 'R') {
      column = upper(column,columnHead)
    }
    if(letter === 'L') {
      columnHead = lower(column,columnHead)
    }
  })
  return calcSeatID(row,column)
}


const main = async () => {
  
  const text = await Deno.readTextFile("./day5/input.txt");
  
  const lines = text.split('\n');
  const res = lines.map(line => {
    return findRowAndColumn(line)
  })

  const seats = res.sort((a,b) => a-b);
  let c = 0;
  while(c<seats.length) {
    c++;
    const missing = !seats.includes(c);
    if(missing) {
      console.log(c)
    }
  }
}

main()