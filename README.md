# 3D格子角色應用

開啟角色JSON，保留原角色頁的面部／頭部偵測、手動四肢與畫面設定。左上開啟角色，左鍵點角色顯示設定，右鍵旋轉、滾輪縮放。

## GitHub自動產生免安裝EXE
1. 將本資料夾內所有檔案（包含.github/workflows/build.yml）上傳至GitHub儲存庫根目錄。
2. 在Actions選擇Build portable Windows app → Run workflow。
3. 完成後在該次執行的Artifacts下載VoxelCharacter-Windows-portable。
4. 解壓縮後執行EXE，無須安裝。未簽章EXE可能顯示Windows安全提示，請自行確認來源。

也可推送v開頭tag觸發建置。這份交付未替你上傳GitHub，也尚未在Windows實際建置EXE；建置結果以Actions為準。

## 背景運作
Electron關閉背景計時器與renderer節流，並請求防止應用休眠；桌面模式不因visibilitychange自動停止鏡頭。這能降低失焦、被遮住及最小化造成的降速；不能保證鎖屏、作業系統休眠或GPU資源不足時仍維持固定FPS。一般瀏覽器頁仍保留背景停止鏡頭行為。

網頁index.html也能單獨使用；瀏覽器版仍受瀏覽器背景節流規則限制。鏡頭辨識首次需網路下載MediaPipe；本包未將辨識模型離線內嵌。JSON只有本機讀取。

本機開發：npm install，再npm start。建置：npm run dist。

© 2026–2030 anshaer.com
