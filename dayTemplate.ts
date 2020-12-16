const main = async () => {
  
  const text = await Deno.readTextFile("./day4/input.txt");
  
  const lines = text.split('\n');
  const res = newPasswordPolicy(lines);
  console.log(res);
}

main()