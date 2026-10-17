# commit_one_by_one.ps1
# Stages, commits, and pushes each changed/untracked file individually.

$ErrorActionPreference = "Stop"

Write-Host "[*] Checking git status for individual file commits..." -ForegroundColor Cyan

# Fetch untracked and modified files
$statusLines = git status --porcelain -uall
if (-not $statusLines) {
    Write-Host "[OK] Working tree is clean. Nothing to commit." -ForegroundColor Green
    exit 0
}

# Determine current branch
$branch = git branch --show-current
if (-not $branch) {
    $branch = "main"
}

$files = @()
foreach ($line in ($statusLines -split "`r?`n")) {
    if ($line.Length -lt 4) { continue }
    $statusCode = $line.Substring(0, 2).Trim()
    $filePath = $line.Substring(3).Trim().Trim('"')
    if ($filePath -match " -> ") {
        $filePath = ($filePath -split " -> ")[1].Trim()
    }
    $files += [PSCustomObject]@{
        Status = $statusCode
        Path = $filePath.Replace('\', '/')
    }
}

Write-Host "[*] Found $($files.Count) changed file(s) to commit and push on branch '$branch'." -ForegroundColor Yellow
Write-Host ""

$successCount = 0
$index = 0

foreach ($file in $files) {
    $index++
    $filePath = $file.Path
    $fileName = Split-Path $filePath -Leaf
    $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
    $status = $file.Status

    # Generate message
    $msg = "feat: update $fileName"
    if ($status -like "*D*") {
        $msg = "chore(clean): remove $fileName"
    } elseif ($fileName -eq "package.json" -or $fileName -eq "package-lock.json") {
        $msg = "chore(deps): update project dependencies"
    } elseif ($fileName -in @("AGENTS.md", "GEMINI.md")) {
        $msg = "chore(agent): update agent instructions and policies"
    } elseif ($filePath -like "*.agents/skills/*") {
        $msg = "chore(skill): update skill configuration"
    } elseif ($ext -eq ".md") {
        $msg = "docs: update $fileName"
    } elseif ($ext -in @(".css", ".scss")) {
        $msg = "style: update styles in $fileName"
    } elseif ($filePath -like "*src/components/sections*") {
        $msg = "feat(sections): update $fileName"
    } elseif ($filePath -like "*src/components*") {
        $msg = "feat(components): update $fileName"
    } elseif ($filePath -like "*src/app/api*") {
        $msg = "feat(api): update $fileName"
    } elseif ($filePath -like "*src/content*") {
        $msg = "feat(content): update $fileName"
    } elseif ($filePath -like "*scripts*") {
        $msg = "chore(scripts): update $fileName"
    }

    Write-Host "[$index/$($files.Count)] Processing: $filePath" -ForegroundColor Cyan
    Write-Host "     Message: '$msg'"

    try {
        git add -A -- "$filePath"
        git commit -m "$msg"
        Write-Host "     Pushing to origin/$branch..." -ForegroundColor DarkGray
        git push origin "$branch"
        Write-Host "     [OK] Committed and pushed!" -ForegroundColor Green
        $successCount++
    } catch {
        Write-Host "     [ERROR] Failed on $filePath - $_" -ForegroundColor Red
        break
    }
    Write-Host ""
}

Write-Host "----------------------------------------------------"
Write-Host "[OK] Finished! Successfully committed and pushed: $successCount file(s)." -ForegroundColor Green
