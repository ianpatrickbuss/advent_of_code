/* 
  All decisions are based on the number of occupied seats adjacent to a given seat (one of the eight positions immediately up, down, left, right, or diagonal from the seat).
*/

// Store the rows as an array
// Each row is an array of seats
// For each row look at each seat
// Each seat needs to be adjusted by the following rules:

/* 
  - If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
  - If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
  - Otherwise, the seat's state does not change.
  - Floor (.) never changes; seats don't move, and nobody sits on the floor.
*/

const shouldChangeSeat = (seatNum: number, rowNum: number, rows: string[][]): boolean => {
  // Calculate Ranges
  var seatsOccupied = 0;
  var empty = rows[rowNum][seatNum]==='L' ? true : false;
  let pos = 0;
  const row = rows[rowNum];
  pos = 1;
  console.log('left')
  while(true){
    const seatCompare: string | undefined = rows[rowNum][seatNum-pos];
    if(!seatCompare) {
      break;
    }
    if(seatCompare==='.') {
      pos++;
      continue;
    } else if(seatCompare==='#') {
      seatsOccupied++;
      break;
    } else if(seatCompare==='L') {
      break;
    }
  }
  pos = 1;
  console.log('right')
  while(true){
    const seatCompare: string | undefined = rows[rowNum][seatNum+pos];
    if(!seatCompare) {
      break;
    }
    if(seatCompare==='.') {
      pos++;
      continue;
    } else if(seatCompare==='#') {
      seatsOccupied++;
      break;
    } else if(seatCompare==='L') {
      break;
    }
  }
  pos = 1;
  console.log('up-left')
  while(true){
    if(rowNum-pos<0) {
      break;
    }
    const seatCompare: string | undefined = rows[rowNum-pos][seatNum-pos];
    if(!seatCompare) {
      break;
    }
    if(seatCompare==='.') {
      pos++;
      continue;
    } else if(seatCompare==='#') {
      seatsOccupied++;
      break;
    } else if(seatCompare==='L') {
      break;
    }
  }
  pos = 1;
  console.log('up-right')
  while(true){
    if(rowNum-pos<0) {
      break;
    }
    const seatCompare: string | undefined = rows[rowNum-pos][seatNum+pos];
    if(!seatCompare) {
      break;
    }
    if(seatCompare==='.') {
      pos++;
      continue;
    } else if(seatCompare==='#') {
      seatsOccupied++;
      break;
    } else if(seatCompare==='L') {
      break;
    }
  }
  pos = 1;
  console.log('down-left')
  while(true){
    if(rowNum+pos>rows.length-1) {
      break;
    }
    const seatCompare: string | undefined = rows[rowNum+pos][seatNum-pos];
    if(!seatCompare) {
      break;
    }
    if(seatCompare==='.') {
      pos++;
      continue;
    } else if(seatCompare==='#') {
      seatsOccupied++;
      break;
    } else if(seatCompare==='L') {
      break;
    }
  }
  pos = 1;
  console.log('down-right')
  while(true){
    if(rowNum+pos>rows.length-1) {
      break;
    }
    const seatCompare: string | undefined = rows[rowNum+pos][seatNum+pos];
    if(!seatCompare) {
      break;
    }
    if(seatCompare==='.') {
      pos++;
      continue;
    } else if(seatCompare==='#') {
      seatsOccupied++;
      break;
    } else if(seatCompare==='L') {
      break;
    }
  }
  pos = 1;
  console.log('down')
  while(true){
    if(rowNum+pos>rows.length-1) {
      break;
    }
    const seatCompare: string | undefined = rows[rowNum+pos][seatNum];
    if(!seatCompare) {
      break;
    }
    if(seatCompare==='.') {
      pos++;
      continue;
    } else if(seatCompare==='#') {
      seatsOccupied++;
      break;
    } else if(seatCompare==='L') {
      break;
    }
  }
  pos = 1;
  console.log('up')
  while(true){
    if(rowNum-pos<0) {
      break;
    }
    const seatCompare: string | undefined = rows[rowNum-pos][seatNum];
    if(!seatCompare) {
      break;
    }
    if(seatCompare==='.') {
      pos++;
      continue;
    } else if(seatCompare==='#') {
      seatsOccupied++;
      break;
    } else if(seatCompare==='L') {
      break;
    }
  }
  /* 
    - If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
    - If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
    - Otherwise, the seat's state does not change.
    - Floor (.) never changes; seats don't move, and nobody sits on the floor.
  */

  // console.log({seatNum, rowNum, seatsOccupied, empty}, rows[rowNum][seatNum])
  if(empty && seatsOccupied===0) {
    return true; 
  } else if(empty && seatsOccupied>0) {
    return false
  } else if(!empty && seatsOccupied>=5) {
    return true;
  } else {
    return false;
  }
}

const loadPlane = (rows: string[][]): string[][] => {
  const preboard = [...rows.map(row => [...row])];
  preboard.forEach((row, rowNum) => {
    for (let seatNum = 0; seatNum < row.length; seatNum++) {
      const seat = row[seatNum];
      if(seat === '.') {
        continue;
      }
      if(seat === 'L') {
        const decision = shouldChangeSeat(seatNum,rowNum,preboard)
        rows[rowNum][seatNum] = decision ? '#' : seat;
      }
      if(seat === '#') {
        const decision = shouldChangeSeat(seatNum,rowNum,preboard )
        rows[rowNum][seatNum] = decision ? 'L' : seat;
      }
    }
  })
  return rows;
}

const count = (str: string) => {
  const re = /#/gm
  return ((str || '').match(re) || []).length
}

const arrayToString = (arr: string[][]): string => arr.map(row => row.join('')).join('\n')

const main = async () => {
  var arrangedSeats: string; 
  const text = await Deno.readTextFile("./day11/input.txt");
  
  const rows = text.split('\n').map(row => row.split(''));
  const changedSeats = loadPlane(rows);
  while(true) {
    const prev = changedSeats.map(row => row.join('')).join('\n');
    const curr = arrayToString(loadPlane(changedSeats));
    if(prev===curr) {
      arrangedSeats=curr;
      break;
    }
  }
  console.log(count(arrangedSeats))
}
main()