@echo off
echo ===================================================
echo   GitHub Repository Connection ^& Deployment Setup  
echo ===================================================
echo.
echo Step 1: Staging and committing all local changes...
git add .
git commit -m "Initialize blog and connect to GitHub"
git branch -M main
echo.
echo Step 2: Please create a new repository on GitHub:
echo   1. Go to https://github.com/new
echo   2. Name it "shrivibhavan-blog" (or any name you prefer)
echo   3. Keep it Public or Private as you wish
echo   4. Do NOT check "Add a README", "Add .gitignore", or "Choose a license"
echo   5. Click "Create repository"
echo.
set /p repo_url="Step 3: Paste your GitHub repository HTTPS URL (e.g., https://github.com/yourusername/shrivibhavan-blog.git): "
if "%repo_url%"=="" goto error

echo Linking remote...
git remote remove origin >nul 2>&1
git remote add origin %repo_url%
echo.
echo Step 4: Pushing files to GitHub...
git push -u origin main
echo.
echo ===================================================
echo Success! Your code is now on GitHub.
echo.
echo Next, link it to Vercel for automatic deployment:
echo   1. Go to your Vercel Dashboard (https://vercel.com/dashboard)
echo   2. Select your "shrivibhavan-blog" project
echo   3. Go to Settings ^> Git
echo   4. Under "Connect Git Repository", search for and connect your new GitHub repository
echo   5. Click Save.
echo.
echo From now on, whenever you push changes to GitHub, Vercel will automatically redeploy!
echo ===================================================
pause
exit

:error
echo Error: No URL was provided. Setup aborted.
pause
