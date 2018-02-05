const spawncommand = require('spawncommand')
const { devDependencies, dependencies } = require('./package.json');

(async () => {
  const keys = Object.keys({ ...devDependencies, ...dependencies })
    .map(s => `${s}@latest`)

  const proc = spawncommand('yarn', ['upgrade', ...keys])
  console.log(proc.spawnCommand)

  proc.stdout.pipe(process.stdout)
  proc.stderr.pipe(process.stderr)

  const { stdout, stderr, code } = await proc.promise
})()