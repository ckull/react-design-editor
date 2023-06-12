export const RGB2CMYK = function (r: any, g: any, b: any, normalized: any) {
  var c = 1 - r / 255
  var m = 1 - g / 255
  var y = 1 - b / 255
  var k = Math.min(c, Math.min(m, y))

  c = (c - k) / (1 - k)
  m = (m - k) / (1 - k)
  y = (y - k) / (1 - k)

  if (!normalized) {
    c = Math.round(c * 10000) / 100
    m = Math.round(m * 10000) / 100
    y = Math.round(y * 10000) / 100
    k = Math.round(k * 10000) / 100
  }

  c = isNaN(c) ? 0 : c
  m = isNaN(m) ? 0 : m
  y = isNaN(y) ? 0 : y
  k = isNaN(k) ? 0 : k

  return {
    c: c,
    m: m,
    y: y,
    k: k,
  }
}
