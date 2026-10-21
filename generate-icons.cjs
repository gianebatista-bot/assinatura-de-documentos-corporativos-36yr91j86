const fs = require('fs')
const path = require('path')
const zlib = require('zlib')

// Minimal pure Node.js PNG encoder for uncompressed RGBA pixel buffers
function createPNG(width, height, rgbaBuffer) {
  // PNG signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])

  // IHDR chunk
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8 // 8-bit depth
  ihdr[9] = 6 // color type 6: RGBA
  ihdr[10] = 0 // compression
  ihdr[11] = 0 // filter
  ihdr[12] = 0 // interlace

  const ihdrChunk = makeChunk('IHDR', ihdr)

  // Scanlines with filter byte 0
  const scanlines = Buffer.alloc(height * (1 + width * 4))
  let scanOffset = 0
  let pixelOffset = 0

  for (let y = 0; y < height; y++) {
    scanlines[scanOffset++] = 0 // No filter
    rgbaBuffer.copy(scanlines, scanOffset, pixelOffset, pixelOffset + width * 4)
    scanOffset += width * 4
    pixelOffset += width * 4
  }

  const deflated = zlib.deflateSync(scanlines, { level: 9 })
  const idatChunk = makeChunk('IDAT', deflated)
  const iendChunk = makeChunk('IEND', Buffer.alloc(0))

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk])
}

function makeChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii')
  const len = data.length
  const chunk = Buffer.alloc(8 + len + 4)
  chunk.writeUInt32BE(len, 0)
  typeBuf.copy(chunk, 4)
  data.copy(chunk, 8)

  const crcPayload = Buffer.concat([typeBuf, data])
  const crc = zlib.crc32(crcPayload)
  chunk.writeUInt32BE(crc, 8 + len)
  return chunk
}

// Simple 2D software renderer for PRAFESTA App Icon
function renderPrafestaIcon(size, isMaskable) {
  const buf = Buffer.alloc(size * size * 4)

  function setPixel(x, y, r, g, b, a = 255) {
    if (x < 0 || x >= size || y < 0 || y >= size) return
    const idx = (y * size + x) * 4
    if (a >= 255) {
      buf[idx] = r
      buf[idx + 1] = g
      buf[idx + 2] = b
      buf[idx + 3] = 255
    } else if (a > 0) {
      const alpha = a / 255
      const bgAlpha = (buf[idx + 3] / 255) * (1 - alpha)
      const outAlpha = alpha + bgAlpha
      if (outAlpha > 0) {
        buf[idx] = Math.round((r * alpha + buf[idx] * bgAlpha) / outAlpha)
        buf[idx + 1] = Math.round((g * alpha + buf[idx + 1] * bgAlpha) / outAlpha)
        buf[idx + 2] = Math.round((b * alpha + buf[idx + 2] * bgAlpha) / outAlpha)
        buf[idx + 3] = Math.round(outAlpha * 255)
      }
    }
  }

  // Draw background gradient (slate-900 to rose-950)
  for (let y = 0; y < size; y++) {
    const t = y / size
    // from #0f172a (15, 23, 42) to #881337 (136, 19, 55)
    const bgR = Math.round(15 + (136 - 15) * (t * 0.9))
    const bgG = Math.round(23 + (19 - 23) * t)
    const bgB = Math.round(42 + (55 - 42) * t)

    for (let x = 0; x < size; x++) {
      if (!isMaskable) {
        // Rounded squircle corner
        const cornerR = size * 0.22
        let inside = true
        if (x < cornerR && y < cornerR) {
          const dx = cornerR - x
          const dy = cornerR - y
          if (dx * dx + dy * dy > cornerR * cornerR) inside = false
        } else if (x > size - cornerR && y < cornerR) {
          const dx = x - (size - cornerR)
          const dy = cornerR - y
          if (dx * dx + dy * dy > cornerR * cornerR) inside = false
        } else if (x < cornerR && y > size - cornerR) {
          const dx = cornerR - x
          const dy = y - (size - cornerR)
          if (dx * dx + dy * dy > cornerR * cornerR) inside = false
        } else if (x > size - cornerR && y > size - cornerR) {
          const dx = x - (size - cornerR)
          const dy = y - (size - cornerR)
          if (dx * dx + dy * dy > cornerR * cornerR) inside = false
        }

        if (inside) {
          setPixel(x, y, bgR, bgG, bgB, 255)
        } else {
          setPixel(x, y, 0, 0, 0, 0)
        }
      } else {
        // Full bleed for maskable
        setPixel(x, y, bgR, bgG, bgB, 255)
      }
    }
  }

  // Center white card badge
  const cardMarginX = isMaskable ? size * 0.18 : size * 0.12
  const cardMarginY = isMaskable ? size * 0.2 : size * 0.16
  const cardW = size - cardMarginX * 2
  const cardH = size - cardMarginY * 2
  const cardRadius = size * 0.08

  for (let y = Math.floor(cardMarginY); y <= Math.ceil(cardMarginY + cardH); y++) {
    for (let x = Math.floor(cardMarginX); x <= Math.ceil(cardMarginX + cardW); x++) {
      let inside = true
      const left = cardMarginX + cardRadius
      const right = cardMarginX + cardW - cardRadius
      const top = cardMarginY + cardRadius
      const bottom = cardMarginY + cardH - cardRadius

      if (x < left && y < top) {
        const d = (left - x) ** 2 + (top - y) ** 2
        if (d > cardRadius ** 2) inside = false
      } else if (x > right && y < top) {
        const d = (x - right) ** 2 + (top - y) ** 2
        if (d > cardRadius ** 2) inside = false
      } else if (x < left && y > bottom) {
        const d = (left - x) ** 2 + (bottom - y) ** 2
        if (d > cardRadius ** 2) inside = false
      } else if (x > right && y > bottom) {
        const d = (x - right) ** 2 + (bottom - y) ** 2
        if (d > cardRadius ** 2) inside = false
      }

      if (inside) {
        // White card background
        setPixel(x, y, 255, 255, 255, 255)
      }
    }
  }

  // Draw Heart/Bowl ribbon in Rose Red (#e11d48)
  const centerX = size / 2
  const heartCenterY = isMaskable ? size * 0.38 : size * 0.36
  const scale = size / 512

  for (let py = -45; py <= 60; py += 0.5) {
    for (let px = -55; px <= 55; px += 0.5) {
      // Heart formula approximation
      const nx = px / 42
      const ny = (py - 10) / 42
      const val = (nx * nx + ny * ny - 1) ** 3 - nx * nx * (ny * ny * ny)
      if (val <= 0) {
        const screenX = Math.round(centerX + px * scale * 1.05)
        const screenY = Math.round(heartCenterY + py * scale * 1.05)
        setPixel(screenX, screenY, 225, 29, 72, 255) // #e11d48
      }
    }
  }

  // Small inner white highlight
  for (let py = -25; py <= 30; py += 0.5) {
    for (let px = -25; px <= 25; px += 0.5) {
      const nx = px / 20
      const ny = (py - 5) / 20
      const val = (nx * nx + ny * ny - 1) ** 3 - nx * nx * (ny * ny * ny)
      if (val <= 0) {
        const screenX = Math.round(centerX + px * scale * 1.05)
        const screenY = Math.round(heartCenterY + py * scale * 1.05)
        setPixel(screenX, screenY, 255, 255, 255, 255)
      }
    }
  }

  // Bottom Pill Bar for "PRAFESTA DOCS"
  const pillY = isMaskable ? size * 0.58 : size * 0.56
  const pillW = size * (isMaskable ? 0.44 : 0.52)
  const pillH = size * 0.08
  const pillX = centerX - pillW / 2
  const pillRadius = pillH / 2

  for (let y = Math.floor(pillY); y <= Math.ceil(pillY + pillH); y++) {
    for (let x = Math.floor(pillX); x <= Math.ceil(pillX + pillW); x++) {
      let inside = true
      const l = pillX + pillRadius
      const r = pillX + pillW - pillRadius
      const cy = pillY + pillRadius
      if (x < l) {
        if ((l - x) ** 2 + (cy - y) ** 2 > pillRadius ** 2) inside = false
      } else if (x > r) {
        if ((x - r) ** 2 + (cy - y) ** 2 > pillRadius ** 2) inside = false
      }
      if (inside) {
        setPixel(x, y, 15, 23, 42, 255) // slate-900 pill
      }
    }
  }

  // Return generated buffer
  return createPNG(size, size, buf)
}

// Generate all required icons in public/icons/
const iconsDir = path.resolve(__dirname, 'public/icons')
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true })
}

fs.writeFileSync(path.join(iconsDir, 'icon-192x192.png'), renderPrafestaIcon(192, false))
fs.writeFileSync(path.join(iconsDir, 'icon-512x512.png'), renderPrafestaIcon(512, false))
fs.writeFileSync(path.join(iconsDir, 'icon-maskable-192x192.png'), renderPrafestaIcon(192, true))
fs.writeFileSync(path.join(iconsDir, 'icon-maskable-512x512.png'), renderPrafestaIcon(512, true))
fs.writeFileSync(path.join(iconsDir, 'apple-touch-icon.png'), renderPrafestaIcon(180, false))

console.log('Icons generated successfully.')
