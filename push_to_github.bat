@echo off
chcp 65001 >nul
cd /d "C:\Users\Roku\.gemini\antigravity\scratch\myron-huang-portfolio"

echo ===================================================================
echo  Ting-Yen (Myron) Huang (黃婷琰) - HW#1 GitHub Pages 部屬工具
echo  學號: M1461035
echo ===================================================================
echo.
set /p REPO_URL="請輸入您在 GitHub 上建立的 Repository 網址 (例如 https://github.com/帳號/repo名稱.git): "
if "%REPO_URL%"=="" (
    echo [提示] 未輸入網址，程式結束。
    goto end
)

echo.
echo [1/5] 同步網址至網站程式碼與作業繳交資訊...
python scratch\sync_github_url.py "%REPO_URL%"

echo [2/5] 重新打包作業繳交壓縮檔 (hw1_M1461035.zip)...
python scratch\package_submission.py

echo [3/5] 更新檔案到桌面 (Desktop)...
copy /y "hw1_M1461035.zip" "C:\Users\Roku\Desktop\hw1_M1461035.zip" >nul
copy /y "docs\reflection_M1461035.pdf" "C:\Users\Roku\Desktop\reflection_M1461035.pdf" >nul

echo [4/5] 提交 Git 紀錄...
git remote remove origin 2>nul
git remote add origin %REPO_URL%
git branch -M main
git add index.html README.md SUBMISSION_INFO.txt
git commit -m "feat: configure live github repo and pages deployment links" 2>nul

echo [5/5] 推送程式碼至 GitHub 遠端倉庫...
git push -u origin main

echo.
echo ===================================================================
echo 恭喜！程式碼已成功推送到 GitHub！
echo.
echo 接下來只需最後 3 步在 GitHub 開啟公開網站：
echo 1. 打開您的 GitHub 倉庫頁面
echo 2. 點擊頂部的 [Settings] -> 左側選單點 [Pages]
echo 3. 在 [Build and deployment] 下方的 Branch 選擇「main」與「/ (root)」，點擊 [Save]
echo.
echo 等待約 1~2 分鐘後，上方就會出現您的公開網站網址！
echo ===================================================================
:end
pause
