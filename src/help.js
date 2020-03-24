import chalk from 'chalk';

const menus = {
  main: `
${chalk.greenBright('task [command] <options>')}
  ${chalk.blueBright('list')} ................ show task list
  ${chalk.blueBright('upload')} ............. upload unsync data from localdb to remote db
  ${chalk.blueBright('update')}.............. set task status to complete/incomplete; Options: c/i <taskid>
  ${chalk.blueBright('version, v')} .............. show package version
  ${chalk.blueBright('help, h')} ................. show help menu for a command
`,
}

export async function help(args) {
  const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0]
  console.log(menus[subCmd] || menus.main)
}