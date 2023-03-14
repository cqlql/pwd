
const { contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('electron', {
  fetch: (options) => {
    return ipcRenderer.invoke('fetch', options)
  },
  // 能暴露的不仅仅是函数，我们还可以暴露变量
})
