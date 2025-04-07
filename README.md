# p5.woff2
An addon to support woff2 fonts in p5.js 2.0

## Usage

Add a script tag to your sketch:
```html
<script src="https://unpkg.com/p5.woff2@0.0.3/lib/p5.woff2.js"></script>
```

On OpenProcessing, add a custom library with this URL:
```
https://unpkg.com/p5.woff2@0.0.3/lib/p5.woff2.js
```

## How it works

I've included the WASM Brotli decompressor from `wawoff2` on NPM, with some slight modifications to get it to import easily in the browser.

With it, I patch the p5.Font implementation in p5.js 2.0 to decompress font files with this decompressor if a woff2 font is loaded.

## Development

Install dependencies with `npm install`.

Running `npm run build` will run rollup from the `src/` directory and create the final bundle in the `lib/` directory.
