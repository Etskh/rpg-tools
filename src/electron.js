const { app, BrowserWindow, protocol, Menu } = require("electron");
const path = require("path");

function isDevelop() {
    return process.env.NODE_ENV === "development";
}


function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        contextIsolation: true,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    if(!isDevelop()) {
        Menu.setApplicationMenu(null);
    }

    protocol.interceptFileProtocol("file", (request, callback) => {
        const url = request.url.substr(7);    /* all urls start with 'file://' */
        return {
            path: path.normalize(`${__dirname}/${url}`),
        };
    }, (err) => {
        if (err) {
            console.error("Failed to register protocol");
        }
    });

    if(process.env.NODE_ENV === "development") {
        win.loadURL("http://localhost:9000");
    }
    else {
        win.loadFile("public/index.html");
    }
}

app.whenReady().then(createWindow);


app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
