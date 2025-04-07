import Decompress from './wawoff2-decompress'

function woff2(p5, fn) {
  const oldParseFontData = fn.parseFontData;
  fn.parseFontData = async function(path) {
    const info = await fetch(path, {
      method: 'HEAD'
    });
    const typeHeader = info.headers.get('content-type');
    const isWoff2 = typeHeader && typeHeader.startsWith('font/woff2');
    
    if (isWoff2) {
      const compressedData = await (await fetch(path)).arrayBuffer()
      const decompressedData = Uint8Array.from(Decompress.decompress(compressedData));
      const result = await oldParseFontData.call(this, decompressedData);
      return result;
    } else {
      return oldParseFontData.call(this, path);
    }
  }
}

if (typeof p5 !== undefined) {
  p5.registerAddon(woff2);
}

export default woff2;
