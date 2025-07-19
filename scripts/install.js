const { execSync } = require("child_process");
const readline = require("readline");

// ANSI colors
const cyan = (text) => `\x1b[36m${text}\x1b[0m`;
const yellow = (text) => `\x1b[33m${text}\x1b[0m`;
const green = (text) => `\x1b[32m${text}\x1b[0m`;
const red = (text) => `\x1b[31m${text}\x1b[0m`;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const pkg = process.argv.slice(2).join(" ");

if (!pkg) {
  console.error(red("❌ Please specify a package to install, e.g. `npm run install:pkg axios`"));
  process.exit(1);
}

console.log(cyan("Install package in:"));
console.log(`${yellow("[1]")} backend`);
console.log(`${yellow("[2]")} frontend`);

rl.question(cyan("Enter choice [1 or 2]: "), (choice) => {
  let target = "";

  switch (choice.trim()) {
    case "1":
      target = "backend";
      break;
    case "2":
      target = "frontend";
      break;
    default:
      console.error(red("❌ Invalid choice. Enter 1 for backend or 2 for frontend."));
      rl.close();
      process.exit(1);
  }

  console.log(green(`📦 Installing '${pkg}' in ${target}/...`));
  try {
    execSync(`npm install ${pkg} --prefix ${target}`, { stdio: "inherit" });
  } catch (error) {
    console.error(red(`❌ Failed to install '${pkg}' in ${target}`));
  } finally {
    rl.close();
  }
});
