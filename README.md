# 3D格子角色：資料夾免安裝版 v1.1

使用官方Electron執行檔及其原始DLL等檔案，不重製、不改名、不改圖標、不用ASAR、不製作單檔自解壓EXE。GitHub Actions複製runtime後驗證electron.exe的SHA256與原檔一致，並列出其簽章狀態。這能保留官方檔案的原有簽章，但不能保證每台Windows的智慧型應用程式控制都放行。

## 上傳GitHub
把本資料夾裡的檔案覆蓋至儲存庫根目錄，包含.github/workflows/build.yml。提交至main即開始建置；也可Actions → Build portable Windows app → Run workflow。

完成後在該次執行下方Artifacts下載VoxelCharacter-Windows-folder。完整解壓縮，執行electron.exe；不要只拿出EXE，也不要在ZIP裡直接執行。其他DLL、resources、locales等資料夾需保持完整。

## 更換網頁
關閉應用程式後，替換解壓縮資料夾內resources/app/index.html，再執行electron.exe。
保留resources/app/main.cjs及package.json。換入其他網頁時，其需要的JS、圖片等資源也需放在正確相對路徑。

## 角色與偵測
左上開啟角色JSON；左鍵點角色開設定，右鍵旋轉、滾輪縮放。保留面部及頭部偵測、手動四肢、透明背景及畫面設定。鏡頭辨識首次需要網路下載模型。

背景節流關閉與防止應用休眠設定保留。這不能保證鎖屏、系統休眠或GPU資源不足時仍有固定FPS。

本地開發：npm install → npm start。Windows建置：npm run dist。
本包是GitHub建置原始碼，尚未在Windows實際建置或確認SAC放行。

© 2026–2030 anshaer.com
