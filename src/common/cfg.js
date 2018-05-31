class CfgBase {
  constructor () {
  }
}

class DevCfg extends CfgBase {
  constructor (opt) {
    super(opt)
    this.PRO = window.location.protocol
    this.IP = window.location.hostname
    this.PORT = '5000'
    this.URLPRE = ''
    this.DEV = true
  }
}

class ProCfg extends CfgBase {
  constructor (opt) {
    super(opt)
    this.PRO = window.location.protocol
    this.IP = window.location.hostname
    this.PORT = window.location.port
    this.URLPRE = ''
    this.DEV = false
  }
}
// process.env.NODE_ENV 当前坏境    ProCfg 生产、DevCfg 开发
let CFG = process.env.NODE_ENV === 'prod' ? new ProCfg() : new DevCfg()
CFG.BASEURL = `${CFG.PRO}//${CFG.IP}:${CFG.PORT}/${CFG.URLPRE}`
window.nodeHref = CFG.BASEURL
console.log(window.nodeHref)

export default CFG
