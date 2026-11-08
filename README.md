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

## v1.2 透明視窗、圖示與macOS
- 開啟角色JSON移至設定的「畫面設定 → 角色檔案」。左鍵點角色開設定。
- 桌面視窗啟用原生透明、無邊框；在畫面設定選透明後可透出桌面，選純色則顯示所選顏色。透明區仍屬視窗，不是滑鼠穿透模式。
- 透明視窗固定初始尺寸1100×850，關閉原生縮放；角色本身可滾輪縮放。開設定後拖曳「角色設定」列移動視窗；列內提供最小化與結束按鈕。
- 立方體圖示為透明底SVG／PNG／ICO，位於assets。執行中Windows視窗與工作列使用PNG，macOS使用Dock圖示。Windows EXE及macOS Finder中的官方Electron圖示保持原貌。
- 應用名稱跟隨HTML document.title；目前角色JSON export.tabTitle及動畫會更新它。這是頁籤／視窗標題，不是收藏書籤。無標題列時可在工作列／系統切換介面看到名稱。
- 同一Actions執行產生Windows、macOS Apple Silicon、macOS Intel三項Artifacts。M1/M2/M3/M4等選AppleSilicon；Intel Mac選Intel。macOS的Artifact內另有ZIP，請再解壓縮，保留.app結構及權限。
- macOS補入攝影機用途說明，並重新作本機ad-hoc簽章，沒有Apple Developer ID簽章或公證，因此不保證Gatekeeper放行。首次使用鏡頭需允許權限。
- macOS更換頁面：Electron.app → 顯示套件內容 → Contents/Resources/app/index.html。修改套件內容會影響資源簽章，建議由GitHub重新建置整包。
- 背景防節流設定維持。尚未在Windows/macOS實機測試透明顯示、鏡頭及Dock／工作列圖示；Actions實際建置結果以執行紀錄為準。
