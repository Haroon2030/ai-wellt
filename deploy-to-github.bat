@echo off
echo ========================================
echo          GitHub Pages Deployment
echo ========================================

echo.
echo ملاحظة: تأكد من تثبيت Git أولاً
echo.

echo خطوات رفع الملفات إلى GitHub:
echo.
echo 1. افتح موجه الأوامر (Command Prompt) كمدير
echo 2. انتقل إلى مجلد المشروع:
echo    cd C:\xampp\htdocs\smart-wallet-ai
echo.
echo 3. تهيئة Git (إذا لم يكن مُهيأً):
echo    git init
echo    git remote add origin [رابط المستودع]
echo.
echo 4. إضافة الملفات:
echo    git add .
echo.
echo 5. إنشاء commit:
echo    git commit -m "Update site for GitHub Pages"
echo.
echo 6. رفع الملفات:
echo    git push origin main
echo.
echo ========================================
echo          ملفات مهمة تم إنشاؤها:
echo ========================================
echo.
echo ✓ .nojekyll - لتجنب معالجة Jekyll
echo ✓ index.html - الصفحة الرئيسية
echo ✓ css/style.css - الأنماط المحدثة
echo ✓ js/script.js - النصوص البرمجية
echo.
echo تأكد من:
echo - رفع جميع المجلدات (css, js, images)
echo - وضع الملفات في الجذر الرئيسي للمستودع
echo - تفعيل GitHub Pages من Settings → Pages
echo.
echo ========================================
echo   بعد الرفع، انتظر 5-10 دقائق للنشر
echo ========================================

pause
