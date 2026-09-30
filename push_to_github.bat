@echo off
chcp 65001 >nul
echo ===================================================================
echo  Ting-Yen (Myron) Huang - HW#1 GitHub Pages Deployment Helper
echo ===================================================================
echo.
set /p REPO_URL="請輸入您在 GitHub 上建立的 Repository 網址 (例如 https://github.com/您的帳號/repo名稱.git): "
if "%REPO_URL%"=="" goto end

echo.
echo [1/3] 設定遠端倉庫 origin...
git remote remove origin 2>nul
git remote add origin %REPO_URL%

echo [2/3] 確認主分支為 main...
git branch -M main

echo [3/3] 推送程式碼至 GitHub...
git push -u origin main

echo.
echo ===================================================================
echo 恭喜！程式碼已成功推送到 GitHub！
echo.
echo 接下來只需最後 3 步開啟 GitHub Pages 公開網站：
echo 1. 打開您的 GitHub 倉庫頁面
echo 2. 點擊頂部的 [Settings] -> 左側選單點 [Pages]
echo 3. 在 [Build and deployment] 下方的 Branch 選擇「main」與「/ (root)」，點擊 [Save]
echo.
echo 等待 1~2 分鐘後，上方就會出現您的公開網站網址：
echo https://您的GitHub帳號.github.io/您的repo名稱/
echo ===================================================================
:end
pause
