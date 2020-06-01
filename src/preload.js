const { remote } = require('electron');

const preloaded = remote.getCurrentWindow();

window.preloaded = preloaded;
