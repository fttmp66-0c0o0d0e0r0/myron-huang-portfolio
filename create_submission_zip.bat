@echo off
chcp 65001 >nul
echo ===================================================================
echo  Ting-Yen (Myron) Huang (黃婷琰) - HW#1 作業壓縮包打包工具
echo  學號: M1461035
echo ===================================================================
echo.
echo 正在檢查作業繳交必備文件...
if not exist "docs\reflection_M1461035.pdf" (
    echo [提示] 正在重新生成 Reflection PDF...
    python scratch\generate_pdf.py
)

echo [提示] 正在建立嚴格符合命名規定的 hw1_M1461035.zip ...
python scratch\package_submission.py

echo.
echo ===================================================================
echo  打包完成！
echo  檔案位置: hw1_M1461035.zip
echo  檔名已嚴格遵守作業規定: hw1_studentID.zip (免除 10%% 扣分)
echo ===================================================================
echo.
pause
