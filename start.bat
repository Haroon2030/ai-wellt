@echo off
echo ========================================
echo    المحفظة الذكية بالذكاء الاصطناعي
echo         بنك البلاد - هاكاثون 2025
echo ========================================
echo.

echo جاري تشغيل المشروع...
echo.

REM Check if XAMPP is running
tasklist /FI "IMAGENAME eq httpd.exe" 2>NUL | find /I /N "httpd.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo ✓ XAMPP Apache يعمل بالفعل
) else (
    echo × XAMPP Apache غير مُشغل
    echo يرجى تشغيل XAMPP Control Panel وتفعيل Apache
    pause
    exit /b 1
)

echo.
echo ========================================
echo المشروع جاهز للعرض!
echo ========================================
echo.
echo الصفحة الرئيسية:
echo http://localhost/smart-wallet-ai/
echo.
echo صفحة العرض التوضيحي:
echo http://localhost/smart-wallet-ai/demo.html
echo.
echo ========================================
echo          المميزات المتاحة
echo ========================================
echo.
echo ✓ تصميم متجاوب وعصري
echo ✓ أنيمشنز ثلاثية الأبعاد
echo ✓ مستشار مالي ذكي تفاعلي
echo ✓ مساعد صوتي باللغة العربية
echo ✓ اقتراحات منتجات ذكية
echo ✓ خلفيات متحركة بـ Three.js
echo ✓ تجربة مستخدم متكاملة
echo.
echo ========================================
echo        معلومات المطور
echo ========================================
echo.
echo المطور: المهندس هارون الأهدل
echo التخصص: مطور واجهات أمامية
echo الخبرات: React, Vue.js, JavaScript, AI
echo للتواصل: 0591076092
echo.
echo المشروع: المحفظة الذكية بالذكاء الاصطناعي
echo البنك: بنك البلاد
echo التقنيات: HTML5, CSS3, JavaScript, Three.js
echo التاريخ: يناير 2025
echo جميع الحقوق محفوظة للمهندس هارون الأهدل
echo.

REM Try to open the browser
echo فتح المتصفح...
timeout /t 2 /nobreak >nul

start http://localhost/smart-wallet-ai/

echo.
echo تم فتح المشروع في المتصفح!
echo.
echo للتنقل بين الصفحات:
echo - الصفحة الرئيسية: عرض شامل للمشروع
echo - صفحة العرض التوضيحي: تجربة تفاعلية
echo.
echo اضغط أي زر للإغلاق...
pause >nul
