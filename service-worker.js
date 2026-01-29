// Version 5 to force a clean update
const CACHE_NAME = 'qwen-bio-cdn-v5'; 

const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    
    // 1. Cache the CDN Engine Files (Version 2.3.1)
    'https://cdn.jsdelivr.net/npm/@wllama/wllama@2.3.1/esm/index.js',
    'https://cdn.jsdelivr.net/npm/@wllama/wllama@2.3.1/esm/single-thread/wllama.wasm',
    'https://cdn.jsdelivr.net/npm/@wllama/wllama@2.3.1/esm/worker.js',

    // 2. Cache YOUR Specific Model
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
