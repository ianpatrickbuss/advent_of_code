const cycle = (arr: unknown[],curr: number,by:number) => (curr+by+arr.length)%arr.length

class Ship {
  xPos: number;
  yPos: number;
  wayPoint: {
    x: number;
    y: number;
  }
  constructor(){
    this.xPos = 0;
    this.yPos = 0;
    this.wayPoint = {
      x: 10,
      y: 1
    }
  }

  public move(dir: string, distance: number): void {
    this.xPos += this.wayPoint.x*distance;
    this.yPos += this.wayPoint.y*distance;
  }

  public adjustWaypoint(dir: string, distance: number): void {
    if(dir==='E') {
      this.wayPoint.x += distance;
    }
    if(dir==='W') {
      this.wayPoint.x -= distance;
    }
    if(dir==='N') {
      this.wayPoint.y += distance;
    }
    if(dir==='S') {
      this.wayPoint.y -= distance;
    }
  }

  private turnRight (degrees: number): void {
    const {x,y} = this.wayPoint;
    switch(degrees) {
      case 90:
        this.wayPoint = {
          x: y,
          y: -x
        }
      break;
      case 180:
        this.wayPoint = {
          x: -x,
          y: -y
        }
      break
      case 270:
        this.wayPoint = {
          x: -y,
          y: x
        }
      break;
    }
  }

  private turnLeft (degrees: number): void {
    const {x,y} = this.wayPoint;
    switch(degrees) {
      case 90:
        this.wayPoint = {
          x: -y,
          y: x
        }
      break;
      case 180:
        this.wayPoint = {
          x: -x,
          y: -y
        }
      break
      case 270:
        this.wayPoint = {
          x: y,
          y: -x
        }
      break;
    }
  }

  public turn(dir: string, degrees:number): void {
    if(dir==='L'){
      this.turnLeft(degrees);
    }
    if(dir==='R'){
      this.turnRight(degrees);
    }
  }
  
  public manhattanDistance(): number {
    return Math.abs(this.xPos) + Math.abs(this.yPos);
  }
}


const main = async () => {
  
  const text = await Deno.readTextFile("./day12/input.txt");
  
  const directions: [string,number][] = text.split('\n').map(line => [line[0],Number(line.slice(1))]);

  const theShip = new Ship();
  directions.forEach(([heading,val]) => {
    if(heading==='L' || heading==='R'){
      theShip.turn(heading, val)
    } else if(heading==='F') {
      theShip.move(heading,val)
    } else {
      theShip.adjustWaypoint(heading,val);
    }
  })
  console.log(theShip.manhattanDistance())
}

main()