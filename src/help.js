import chalk from 'chalk';

const menus = {
  main: `
${chalk.greenBright('task [command] <options>')}
  ${chalk.blueBright('list')} ............... show task list
  ${chalk.blueBright('upload')} ............. upload unsync data from locatedb to remote db
  ${chalk.blueBright('update')}.............. set task status to complete/incomplete; Options: c/i <taskid>
  ${chalk.blueBright('version')} ............ show package version
  ${chalk.blueBright('help')} ............... show help menu for a command
`,
}

export async function help(args) {
  const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0]
  console.log(menus[subCmd] || menus.main)
}