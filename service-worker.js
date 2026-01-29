const CACHE_NAME = 'qwen-bio-cdn-v1'; // Changed name to force update
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    
    // 1. Cache the CDN Engine Files
    'https://cdn.jsdelivr.net/npm/@wllama/wllama/esm/index.js',
    'https://cdn.jsdelivr.net/npm/@wllama/wllama/esm/single-thread/wllama.wasm',
    'https://cdn.jsdelivr.net/npm/@wllama/wllama/esm/worker.js',

    // 2. Cache Your Model (Paste your Hugging Face Link here)
    'https://huggingface.co/YOUR_USERNAME/YOUR_REPO/resolve/main/qwen-bio-q4_k_m.gguf'
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
