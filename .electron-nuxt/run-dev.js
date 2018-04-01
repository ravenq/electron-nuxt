process.env.NODE_ENV = 'development'
const path = require('path')
const electron = require('electron')
const {
  spawn
} = require('child_process')

const {
  Nuxt,
  Builder
} = require('nuxt')

const config = require('../nuxt.config.js')
const nuxt = new Nuxt(config)
const builder = new Builder(nuxt)

Promise.resolve()
  .then(() => builder.build())
  .then(() => nuxt.listen())
  .then(() => startElectron())

function startElectron () {
  const electronProcess = spawn(electron, ['--inspect=5858', path.join(__dirname, 'main.js')])
  electronProcess.stdout.on('data', (data) => {
    console.log(data.toString())
  })

  electronProcess.stderr.on('data', (data) => {
    console.log(data.toString())
  })

  electronProcess.on('close', (code) => {
    Promise.resolve()
      .then(() => builder.unwatch())
      .then(() => nuxt.close())
  })
}
