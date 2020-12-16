type Passport = {
  [key: string]: string;
}

const between = (val: string, comp: [number,number]): boolean => {
  const num = Number.parseInt(val,10);
  if(isNaN(num)) {
    throw Error(val + " cannot be converted to a number");
  }
  return num>=comp[0] && num<=comp[1]
}

let valid = 0;
let invalid = 0;
// Take a tuple and create an object 
const objectify = (passportString: string): Passport => {
  const passport: Passport = {}
  passportString.split(' ').forEach(prop => {
    const [key,val] = prop.split(':');
    passport[key] = val;
  });
  return passport
}

const linesToPassports = (lines: string[]): Passport[] => {
  const passports: Passport[] = []
  let passport: string[] = [];
  for(let n = 0; n<lines.length; n++) {
    const line = lines[n];
    if(line.length>0) {
      passport.push(line);
    } else {
      const p = objectify(passport.join(' '));
      passports.push(p);
      // console.group(passport.join(' '));
      const v = passportValidator(p)
      v ? valid++ : invalid++;
      // console.log(`valid: ${v}`);
      // console.groupEnd()
      passport = []
    }
  }
  return passports
}

const hasRequiredFields = (passport: Passport): boolean => { 
  const keys = Object.keys(passport);
  const required = ['byr','iyr','eyr','hgt','hcl','ecl','pid'];
  // console.log(required.join(' '))
  return required.every((key: string) => keys.includes(key))
}

const checkHeight = (hgt: string): boolean => {
  const regex = /(\d+)(in|cm)/;
  if(!regex.test(hgt)) return false;
  const [h,m] = hgt.split(regex).slice(1,3);
  if(m==='cm' && between(h,[150,193])) return true;
  if(m==='in' && between(h,[59,76])) return true;
  return false;
}

const checkHairColor = (hcl: string): boolean => {
  return /#([a-f0-9]{6})/.test(hcl) && hcl.length === 7;
}

const checkEyeColor = (ecl: string): boolean => {
  return /(amb)|(blu)|(brn)|(gry)|(grn)|(hzl)|(oth)/.test(ecl) && ecl.length === 3;
}

const checkPassportId = (pid: string): boolean => {

  return /[0-9]{9}/.test(pid) && pid.length === 9
}

const passportValidator = (passport: Passport): boolean => {
  
  // Check for Required Fields
  // console.log('has required fields')
  if(!hasRequiredFields(passport)) return false

  // Check Years
  if(!between(passport.byr,[1920,2002])) return false
  // console.log('iyr', passport.iyr)
  if(!between(passport.iyr,[2010,2020])) return false
  // console.log('eyr', passport.eyr)
  if(!between(passport.eyr,[2020,2030])) return false
  
  // Check Height
  // console.log('hgt', passport.hgt)
  if(!checkHeight(passport.hgt)) return false;
  // console.log('hcl', passport.hcl)
  // Hair Color
  
  
  if(!checkHairColor(passport.hcl)) return false
  // Eye Color
  // console.log('ecl', passport.ecl)
  
  
  if(!checkEyeColor(passport.ecl)) return false;
  // Passport contains 9 digits
  // console.log('pid', passport.pid)
  
  if(!checkPassportId(passport.pid)) return false
  // console.log('pass')
  return true;
}


const main = async () => {
  
  const text = await Deno.readTextFile("./day4/input.txt");
  const lines = text.split('\n');
  // console.log(lines);
  const passports = linesToPassports(lines)
  // console.clear();
  console.log({valid,invalid, sum: passports.length});
}

main()