// Modules to control application life and create native browser window
const { app, ipcMain, BrowserWindow } = require("electron");
const path = require("path");
const router = require('./router')

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    },
  });

  mainWindow.menuBarVisible = false 

  ipcMain.handle("fetch", (_, options) => {
    let { url, data, params } = options;
    return new Promise((resolve, reject) => {
      router.data[url](
        {
          body: data,
          query: params,
        },
        {
          send (data) {
            resolve({
              data
            })
          },
        }
      );
    });
  });

  mainWindow.loadFile("index.html");

  
  // ctrl+f 搜索功能，未实现
  // const contents = mainWindow.webContents
  // globalShortcut.register('CommandOrControl+F', () => {
  //   contents.findInPage('apple')
  // });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });  
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});



