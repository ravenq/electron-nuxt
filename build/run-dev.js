const path = require('path')
const electron = require('electron')
const {
  spawn,
  spawnSync
} = require('child_process')

function startElectron() {
  const electronProcess = spawn(electron, ['--inspect=5858', path.join(__dirname, 'main.js')])
  electronProcess.stdout.on('data', (data) => {
    console.log(data.toString());
  });

  electronProcess.stderr.on('data', (data) => {
    console.log(data.toString());
  })
}

const nuxt = require('../node_modules/nuxt/bin/nuxt-dev')
nuxt.dev.then(() => {
  startElectron()
})

// const {
//   Nuxt
// } = require('nuxt-start')

// const config = require('../nuxt.config.js')
// const nuxt = new Nuxt(config)
// nuxt.listen(3000).then(() => {
//   startElectron()
// })
