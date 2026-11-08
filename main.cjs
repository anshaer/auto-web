const {app,BrowserWindow,powerSaveBlocker,session}=require('electron');
app.commandLine.appendSwitch('disable-renderer-backgrounding');
app.commandLine.appendSwitch('disable-background-timer-throttling');
app.commandLine.appendSwitch('disable-backgrounding-occluded-windows');
let win,block;
app.whenReady().then(()=>{
 block=powerSaveBlocker.start('prevent-app-suspension');
 session.defaultSession.setPermissionRequestHandler((contents,permission,callback)=>callback(contents===win?.webContents&&permission==='media'));
 win=new BrowserWindow({width:1100,height:850,backgroundColor:'#eee8f3',webPreferences:{backgroundThrottling:false,nodeIntegration:false,contextIsolation:true,sandbox:true}});
 win.removeMenu();win.webContents.setWindowOpenHandler(()=>({action:'deny'}));
 win.webContents.on('will-navigate',event=>event.preventDefault());
 win.loadFile('index.html',{query:{desktop:'1'}});
});
app.on('window-all-closed',()=>{if(block!==undefined&&powerSaveBlocker.isStarted(block))powerSaveBlocker.stop(block);app.quit();});
