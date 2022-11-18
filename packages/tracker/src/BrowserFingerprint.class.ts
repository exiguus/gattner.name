import MurmurHash3 from './Murmurhash3.class'

declare global {
  interface Navigator {
    deviceMemory: number
  }
  interface WebGLBuffer {
    numItems: number
    itemSize: number
  }
  interface WebGLProgram {
    vertexPosAttrib: number
    offsetUniform: WebGLUniformLocation | null
    vertexPosArray: number
  }
}

/**
 * getBrowserFingerprint
 *  https://github.com/damianobarbati/get-browser-fingerprint#readme
 * @param {object.hardwareOnly} boolean - if true, only hardware info will be collected (default: false)
 * @param {object.enableWebgl} boolean - if true, webgl info will be collected (default: true)
 * @param {object.debug} boolean - if true, debug info will be collected (default: false)
 * @returns number
 */
export default class BrowserFingerprint {
  murmurHash3 = new MurmurHash3()

  constructor() {
    this.getCanvasId()
    this.getWebglId()
    this.getWebglId()
    this.getBrowserId()
  }

  result = () => this.murmurHash3.result()

  getBrowserInfo() {
    const devicePixelRatio = +parseInt(window.devicePixelRatio.toString())

    const {
      appName,
      appCodeName,
      appVersion,
      cookieEnabled,
      deviceMemory,
      doNotTrack,
      hardwareConcurrency,
      language,
      languages,
      maxTouchPoints,
      platform,
      product,
      productSub,
      userAgent,
      vendor,
      vendorSub,
    } = window.navigator

    const { width, height, colorDepth, pixelDepth } = window.screen
    const timezoneOffset = new Date().getTimezoneOffset()
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const touchSupport = 'ontouchstart' in window

    const data = JSON.stringify({
      appCodeName,
      appName,
      appVersion,
      colorDepth,
      cookieEnabled,
      deviceMemory,
      devicePixelRatio,
      doNotTrack,
      hardwareConcurrency,
      height,
      language,
      languages,
      maxTouchPoints,
      pixelDepth,
      platform,
      product,
      productSub,
      timezone,
      timezoneOffset,
      touchSupport,
      userAgent,
      vendor,
      vendorSub,
      width,
    })

    return JSON.stringify(data, null, 4)
  }

  getBrowserId = () => this.murmurHash3.hash(this.getBrowserInfo())

  getCanvasId = () => {
    try {
      const canvas = document.createElement('canvas')
      const ctx = canvas?.getContext('2d')
      if (!ctx) return null
      const text =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`~1!2@3#4$5%6^7&8*9(0)-_=+[{]}|;:',<.>/?"
      ctx.textBaseline = 'top'
      ctx.font = "14px 'Arial'"
      ctx.textBaseline = 'alphabetic'
      ctx.fillStyle = '#f60'
      ctx.fillRect(125, 1, 62, 20)
      ctx.fillStyle = '#069'
      ctx.fillText(text, 2, 15)
      ctx.fillStyle = 'rgba(102, 204, 0, 0.7)'
      ctx.fillText(text, 4, 17)

      const result = canvas.toDataURL()

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      return this.murmurHash3.hash(result)
    } catch {
      return null
    }
  }

  getWebglId = () => {
    try {
      const canvas = document.createElement('canvas')
      const ctx = canvas?.getContext('webgl')
      if (!ctx) return null
      canvas.width = 256
      canvas.height = 128

      const f =
        'attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}'
      const g =
        'precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}'
      const h = ctx.createBuffer()

      ctx.bindBuffer(ctx.ARRAY_BUFFER, h)

      const i = new Float32Array([-0.2, -0.9, 0, 0.4, -0.26, 0, 0, 0.7321, 0])

      if (!h) return null
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      ctx.bufferData(ctx.ARRAY_BUFFER, i, ctx.STATIC_DRAW)
      h.itemSize = 3
      h.numItems = 3

      const j = ctx.createProgram()
      const k = ctx.createShader(ctx.VERTEX_SHADER)

      if (!j || !k) return null
      ctx.shaderSource(k, f)
      ctx.compileShader(k)

      const l = ctx.createShader(ctx.FRAGMENT_SHADER)

      if (!l) return null
      ctx.shaderSource(l, g)
      ctx.compileShader(l)
      ctx.attachShader(j, k)
      ctx.attachShader(j, l)
      ctx.linkProgram(j)
      ctx.useProgram(j)

      j.vertexPosAttrib = ctx.getAttribLocation(j, 'attrVertex')
      j.offsetUniform = ctx.getUniformLocation(j, 'uniformOffset')

      ctx.enableVertexAttribArray(j.vertexPosArray)
      ctx.vertexAttribPointer(
        j.vertexPosAttrib,
        h.itemSize,
        ctx.FLOAT,
        !1,
        0,
        0
      )
      ctx.uniform2f(j.offsetUniform, 1, 1)
      ctx.drawArrays(ctx.TRIANGLE_STRIP, 0, h.numItems)

      const n = new Uint8Array(canvas.width * canvas.height * 4)
      ctx.readPixels(
        0,
        0,
        canvas.width,
        canvas.height,
        ctx.RGBA,
        ctx.UNSIGNED_BYTE,
        n
      )

      const result = JSON.stringify(n).replace(/,?"[0-9]+":/g, '')

      ctx.clear(
        ctx.COLOR_BUFFER_BIT | ctx.DEPTH_BUFFER_BIT | ctx.STENCIL_BUFFER_BIT
      )

      return this.murmurHash3.hash(result)
    } catch {
      return null
    }
  }

  getWebglInfo = () => {
    try {
      const ctx = document.createElement('canvas').getContext('webgl')
      if (!ctx) return ''
      return {
        VERSION: ctx.getParameter(ctx.VERSION),
        SHADING_LANGUAGE_VERSION: ctx.getParameter(
          ctx.SHADING_LANGUAGE_VERSION
        ),
        VENDOR: ctx.getParameter(ctx.VENDOR),
        SUPORTED_EXTENSIONS: ctx.getSupportedExtensions(),
      }
    } catch {
      return ''
    }
  }
}

export { BrowserFingerprint }
