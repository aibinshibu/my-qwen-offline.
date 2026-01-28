
const CACHE_NAME = 'qwen-bio-v2';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './assets/index.js',
    './assets/worker.js',
    './assets/single-thread/wllama.wasm',
    'https://huggingface.co/aibinshibuc/my-qwen-offline/resolve/main/qwen-bio-q4_k_m.gguf'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request))
    );
});
