const { app, BrowserWindow } = require('electron');
const path = require('path');
let win;

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 600,
        height: 600,
        backgroundColor: '#ffffff',
        icon: `file://${__dirname}/dist/assets/logo.png`,
        webPreferences: {
            webSecurity: false,
            allowRunningInsecureContent: true,
            preload: path.join(__dirname, './preload.js'),
        },
        frame: false,
    });

    win.loadURL('https://localhost:443/');

    // win.webContents.openDevTools();

    // Event when the window is closed.
    win.on('closed', function () {
        win = null;
    });
}

// Create window on electron intialization
app.on('ready', createWindow);

app.on(
    'certificate-error',
    (event, webContents, url, error, certificate, callback) => {
        if (url.includes('localhost')) {
            // Verification logic.
            event.preventDefault();
            callback(true);
        } else {
            callback(false);
        }
    },
);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS specific close process
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    // macOS specific close process
    if (win === null) {
        createWindow();
    }
});
