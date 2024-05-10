const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the 'public' directory. Place this at the top to ensure these files are accessible.
app.use(express.static('public'));

// Serve static files for the minigame
app.use('/minigame', express.static(path.join(__dirname, 'minigame')));

// Serve index.html from the 'public' directory for the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve the minigame index.html explicitly (optional, if more control is needed)
app.get('/minigame', (req, res) => {
    res.sendFile(path.join(__dirname, 'minigame', 'index.html'));
});

// Proxy configuration to handle all other paths
const rootProxy = createProxyMiddleware({
    target: 'http://www.allansdiscord.com:30000',
    changeOrigin: true,
    ws: true, // Ensure WebSocket connections are proxied.
    logLevel: 'debug',
    // Ensure that the proxy does not interfere with the root path or the minigame path
    pathFilter: (pathname, req) => !['/', '/minigame'].includes(pathname),
});

// Apply the proxy to all paths not explicitly handled
app.use('/', rootProxy);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
