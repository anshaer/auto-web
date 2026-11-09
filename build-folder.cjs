'use strict';
const fs=require('node:fs'),path=require('node:path');
function build(source,destination,platform=process.platform){
 const mac=platform==='darwin';
 if(!fs.existsSync(path.join(source,mac?'Electron.app/Contents/MacOS/Electron':'electron.exe')))throw Error('Matching Electron runtime not found');
 fs.mkdirSync(destination,{recursive:true});fs.cpSync(source,destination,{recursive:true,dereference:false,verbatimSymlinks:true});
 const target=path.join(destination,mac?'Electron.app/Contents/Resources/app':'resources/app');fs.mkdirSync(target,{recursive:true});
 for(const name of ['main.cjs','preload.cjs','index.html','assets'])fs.cpSync(path.join(__dirname,name),path.join(target,name),{recursive:true});
 fs.writeFileSync(path.join(target,'package.json'),JSON.stringify({name:'voxel-character-app',version:'1.4.0',main:'main.cjs'}));
 fs.writeFileSync(path.join(destination,'START-HERE.txt'),mac?'Open Electron.app. App page: Electron.app/Contents/Resources/app/index.html\n':'Run electron.exe. Keep all files together. Page: resources/app/index.html\r\n');
 console.log('Folder app ready:',destination);
}
if(require.main===module)build(path.join(path.dirname(require.resolve('electron/package.json')),'dist'),path.join(__dirname,'dist','VoxelCharacter'));
module.exports=build;
