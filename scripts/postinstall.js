// scripts/postinstall.js
setTimeout(() => {
  const cyan = "\x1b[36m";
  const green = "\x1b[32m";
  const magenta = "\x1b[35m";
  const bold = "\x1b[1m";
  const reset = "\x1b[0m";

  const banner = `${bold}${cyan}
███████╗ █████╗ ██████╗ ██╗███████╗███████╗███╗   ██╗██████╗ ██╗   ██╗██████╗ 
██╔════╝██╔══██╗██╔══██╗██║██╔════╝██╔════╝████╗  ██║██╔══██╗██║   ██║╚════██╗
███████╗███████║██████╔╝██║███████╗█████╗  ██╔██╗ ██║██║  ██║██║   ██║ █████╔╝
╚════██║██╔══██║██╔══██╗██║╚════██║██╔══╝  ██║╚██╗██║██║  ██║╚██╗ ██╔╝██╔═══╝ 
███████║██║  ██║██║  ██║██║███████║███████╗██║ ╚████║██████╔╝ ╚████╔╝ ███████╗
╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚═╝  ╚═══╝╚═════╝   ╚═══╝  ╚══════╝
${reset}`;

  console.log(`${green}🚀 Setup Complete!!${reset}\n`);

  console.log(`${cyan}📦 How to use:${reset}\n`);

  console.log(`👉  ${bold}npm install${reset}            – Run this once to install backend and frontend deps`);
  console.log(`▶️   ${bold}npm start${reset}              – Start both backend (NestJS) and frontend (Next.js) dev servers`);
  console.log(`🧪 ${bold}npm test${reset}               - Run backend tests and frontend linting`);
  console.log(` `);
  console.log(`📦  ${bold}Install a package:${reset}     npm run install:pkg <package-name>`);
  console.log(`    You’ll be asked if it's for frontend or backend\n`);

  console.log(`💡  ${bold}Example:${reset} npm run install:pkg zod\n`);

  console.log(`🛑  Ctrl + C               – Stop all processes`);
  console.log(`📘  Run again: ${bold}npm run help${reset}\n`);

  console.log(`${magenta}Happy coding! 💻${reset}`);
  console.log(banner);
}, 100);
