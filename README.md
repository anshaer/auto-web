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

## Mac簽章修正
複製runtime時明確保留符號連結的原始相對目標（verbatimSymlinks:true），避免Framework內部連結被改寫成指向建置來源的絕對路徑。否則codesign可能回報unsealed contents present in the root directory of an embedded framework。攝影機用途欄位已存在的Add提示會由Set處理，不是這次中斷原因。Windows封裝方式不變。已測試多層相對連結複製及來源移除後仍可解析；Mac codesign仍須由GitHub Mac runner驗證。

## v1.3 全身動捕同步
應用頁同步製作器v16的軀幹／四肢／手肘／膝蓋追蹤，面部表情與頭部獨立維持；設定中「四肢」提供手動彎曲XYZ。未指定偵測模式的舊JSON預設全身，已有明確模式則依檔案還原。鏡頭需手動啟動；首次需網路下載面部與身體模型。

已同步髖部不可見時仍求解手臂、各肢獨立可見度與影像座標退路。鏡頭顯示綠色骨架，狀態列列出有效四肢；VMC仍僅面部／頭部，不含身體骨骼。透明視窗、JSON載入、官方Windows執行檔、Mac符號連結保留、防背景節流與立方體圖示均保留。

已有Windows資料夾應用者，可關閉程式後只替換resources/app/index.html；從本專案根目錄取index.html。若透過GitHub上傳，覆蓋根目錄檔案後會自動產生三平台新包。Mac因套件簽章，請重新建置下載整包。

此版已做HTML腳本語法及同步檢查；動捕核心沿用已通過模擬測試的製作器v16。尚未Windows/Mac真人全身追蹤與FPS實測。

## v1.4 辨識資訊面板
鏡頭影像改為狀態面板，列出左右眼、嘴型、左右眉、頭部角度與軀幹／四肢辨識狀態。鏡頭仍在背景供辨識使用，原影像與骨架疊圖不再顯示。逾時不保留有效標記；手動模式與未啟用全身分開顯示。
Windows舊資料夾版完全關閉後，可替換resources/app/index.html；這次不需換EXE。Mac需用本包重新執行GitHub Actions建置，再下載整包。此ZIP為GitHub建置原始碼，不是已編譯的EXE／app。
透明視窗、JSON載入、官方執行檔與防背景節流設定維持。程式語法及模擬核心測試通過；未做本次真人鏡頭／各平台實機驗證。

## v1.4.1 未辨識腿部姿勢保留
全身鏡頭模式下，腿部必須有有效髖／膝／踝完整鏈才更新。每個身體資料包若某腿缺少完整鏈，該腿立即停止更新，不沿用過期的軀幹相對旋轉。
有歷史時，保留最後一次有效腿部的模型世界座標上段及下段矩陣，含髖部位置與膝彎曲；沒有歷史時使用原手動／中立站姿，排除即時軀幹動捕變換。左右腳獨立處理，手部／面部繼續追蹤。這是模型座標姿勢保留，不是新增地面定位或腳底鎖定演算法。
原800ms有效期僅決定目前訊號是否有效；保留姿勢不因1200ms軀幹逾時被清掉。重新取得完整腿部資料即恢復追蹤。停止輸入、切換來源、切換偵測模式或載入角色會clearBody並清除歷史，恢復手動姿勢。
資訊欄顯示「未辨識／維持上一姿勢」或「未辨識／維持站姿」，不可把保留姿勢標成已辨識。暫態矩陣不寫回JSON與手動支點／角度。相機視角操作仍正常影響整個場景。
驗證包括隱藏雙腿但改變肩膀傾斜、單腳踝遺失、全身逾時、無歷史站姿、切換來源清除歷史及既有144組五官／彎折／鏡像測試；製作與角色頁模擬通過。參考使用者影片定位問題，未在本次重新做真人攝影機或桌面平台實測。

Windows可完全關閉後只替換resources/app/index.html；Mac需重新建置下載整包。本ZIP為GitHub Actions建置原始碼，不是已編譯EXE。

## v1.5.0 自動維持與3秒鎖定姿勢
輸入／測試分頁新增「偵測不到時維持姿勢（軀幹／四肢）」開關，預設開啟。舊JSON缺欄位亦預設開啟。追蹤不足時保留最後有效的軀幹與四肢模型世界姿勢；沒有歷史則維持手動／中立姿勢。開關關閉後，失效的身體回到手動姿勢；腿部仍不繼承無效即時軀幹而飄動。
新增鎖定範圍：全身（軀幹＋四肢）、僅四肢、軀幹、左手／手肘、右手／手肘、左腳／膝蓋、右腳／膝蓋。按「3秒後鎖定姿勢」後倒數，3秒結束才擷取當下顯示姿勢。沒有辨識資料時可鎖住手動或已保留的姿勢，不宣稱這些是新辨識結果。可分次鎖不同部位；解除鎖定會取消倒數並解除全部鎖定。
頭部與臉部不鎖定。軀幹鎖定後，頭部補償使用鎖定時的軀幹基準，避免新的身體追蹤干擾頭部。每條肢體保存上段與下段世界矩陣，含位置及彎折，不只凍結局部角度。資訊面板顯示「已鎖定」與「未辨識／維持上一姿勢」區別。
settings.holdMissingPose與settings.poseLockScope保存在JSON／輸出HTML；鎖定快照與倒數屬本次工作階段，不寫回JSON、手動支點或手動旋轉。GLB仍烘焙當下顯示姿勢。停止輸入、切換來源／偵測範圍或載入角色會清除快照與取消倒數。
實作：effectiveOverlay／effectiveBody統一挑選手動、追蹤、保留或鎖定軀幹；heldLimbs／heldTorso保存自動保持，poseLocks保存明確鎖定，後者優先。裝飾、角色模型schema與原生視窗設定不變。
已驗證：倒數未到3秒可動、以倒數結束的姿勢取樣、全身鎖定、單肢鎖定、臉部頭部持續、解除後恢復、來源變更取消倒數、自動保持開關與JSON設定。製作頁與角色頁模擬通過；未重新做真人鏡頭或各平台實測。

Windows可完全關閉後只替換resources/app/index.html；Mac需重新建置下載整包。本ZIP為GitHub Actions建置原始碼，不是已編譯EXE。
