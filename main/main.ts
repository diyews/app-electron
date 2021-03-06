// Modules to control application life and create native browser window
import { app, BrowserWindow, session } from 'electron';
import { setCookies } from './cookies';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: BrowserWindow;

global.__isDev = !process.mainModule.filename.includes('app.asar');

function createWindow() {
  setCookies();

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true,
      nativeWindowOpen: true,
    },
    frame: false,
  });

  // and load the index.html of the app.
  if (global.__isDev) {
    mainWindow.loadFile('./render/src/index.html');
    const pathReg = /.*?\/render\/src\/((?!index\.html)(.*))/;
    session.defaultSession.webRequest.onBeforeRequest({ urls: ['file:///*'] }, (detail, cb) => {
      const res: any = {};
      const matched = detail.url.match(pathReg);
      if (matched) {
        res.redirectURL = `http://localhost:4200/${matched[1]}`;
      }
      cb(res);
    });
  } else {
    mainWindow.loadFile('render-release/index.html');
  }

  mainWindow.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
    if (url.match(/(^http)|(^\/\/)/)) {
      Object.assign(options, {
        frame: true,
      });
      options.webPreferences = Object.assign(options.webPreferences || {}, {
        nodeIntegration: false,
        devTools: true,
      });
      event.preventDefault();
      (event as any).newGuest = new BrowserWindow(options);
      // (event as any).newGuest.removeMenu();
    }
  });

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
