let Brotli

// This is hacky, we should figure out a way to do this better with a bundler
const loadedBrotli = (async function() {
  const brotliScript = await fetch('https://unpkg.com/wawoff2@2.0.1/build/decompress_binding.js').then(res => res.text())
  const runBrotli = new Function(`
    ${brotliScript};
    return Module;
  `);
  Brotli = runBrotli();
}());

function woff2(p5, fn) {
  const oldParseFontData = fn.parseFontData;
  fn.parseFontData = async function(path) {
    const info = await fetch(path, {
      method: 'HEAD'
    });
    const typeHeader = info.headers.get('content-type');
    const isWoff2 = typeHeader && typeHeader.startsWith('font/woff2');
    
    if (isWoff2) {
      await loadedBrotli;
      const compressedData = await (await fetch(path)).arrayBuffer()
      const decompressedData = Uint8Array.from(Brotli.decompress(compressedData));
      const result = await oldParseFontData.call(this, decompressedData);
      return result;
    } else {
      return oldParseFontData.call(path);
    }
  }
}

if (typeof p5 !== undefined) {
  p5.registerAddon(woff2);
}
