'use strict';
const fs=require('node:fs'),path=require('node:path');
function build(source,destination){
 if(!fs.existsSync(path.join(source,'electron.exe')))throw Error('Windows Electron runtime not found');
 fs.mkdirSync(destination,{recursive:true});fs.cpSync(source,destination,{recursive:true});
 const target=path.join(destination,'resources','app');fs.mkdirSync(target,{recursive:true});
 for(const name of ['main.cjs','index.html'])fs.copyFileSync(path.join(__dirname,name),path.join(target,name));
 fs.writeFileSync(path.join(target,'package.json'),JSON.stringify({name:'voxel-character-app',version:'1.1.0',main:'main.cjs'}));
 fs.writeFileSync(path.join(destination,'START-HERE.txt'),'Run electron.exe. Keep all files together. Replace resources/app/index.html while the app is closed to update the page.\r\n');
 console.log('Folder app ready:',destination);
}
if(require.main===module)build(path.join(path.dirname(require.resolve('electron/package.json')),'dist'),path.join(__dirname,'dist','VoxelCharacter'));
module.exports=build;
