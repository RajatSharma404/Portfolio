---
name: commit
description: >-
  Stages, commits, and pushes changed files individually (one file per commit and push)
  to maximize GitHub commit history. Trigger this skill ONLY when the user explicitly asks to
  commit changes, runs "/commit", or requests to push all files 1 by 1. Never commit or push
  automatically outside of this skill.
---

# /commit — File-by-File Commit & Push Skill

This skill commits and pushes changes **one file at a time**, creating a separate git commit and pushing it to GitHub for every modified, created, or deleted file. This increases GitHub contribution activity and maintains fine-grained commit history.

---

## 🛑 Golden Rule: No Automatic Commits

1. **Never commit automatically**: During standard feature development, debugging, code audits, or refactoring, **NEVER** run `git commit` or `git push`.
2. **Explicit trigger only**: Commits and pushes must **ONLY** be initiated when the user explicitly triggers this skill via `/commit` or specifically instructs to commit/push the changes.

---

## 📋 Execution Workflow

When the user runs `/commit` or asks to commit changes, follow these steps:

### Step 1 — Check Git Status
Run git status to identify all changed and untracked files:
```powershell
git status --porcelain -uall
```
> [!NOTE]
> The `-uall` flag is critical because it forces git to list individual files within untracked folders rather than just the directory name, allowing each file to get its own individual commit and push.

- If there are **no changes**, inform the user:
  > "Working tree is clean. There are no changes to commit."
- If changes exist, proceed to Step 2.

---

### Step 2 — Run the One-by-One Commit & Push Sequence

You can execute the automated runner script or perform the sequence directly:

#### Option A: Run the Automated Script (Recommended)
Execute the bundled Node runner script:
```powershell
node .agents/skills/commit/scripts/commit_one_by_one.mjs
```
*(Or via PowerShell script: `powershell -ExecutionPolicy Bypass -File .agents/skills/commit/scripts/commit_one_by_one.ps1`)*

#### Option B: Step-by-Step Direct Execution
For each file in the changed list:
1. **Stage only that single file**:
   ```powershell
   git add -A -- "<path/to/file>"
   ```
2. **Craft a Conventional Commit Message** tailored to the file:
   - Components: `feat(components): update <component-name>` or `fix(...)`
   - Sections: `feat(sections): update <section-name>`
   - Styles: `style: update styles in <file>`
   - API Routes: `feat(api): update <route-name> endpoint`
   - Content: `feat(content): update <file>`
   - Documentation: `docs: update <file>`
   - Config / Dependencies: `chore(deps): update dependencies` or `chore(config): ...`
   - Deleted file: `chore(clean): remove <file>`
3. **Commit the single file**:
   ```powershell
   git commit -m "<message>"
   ```
4. **Push immediately to the remote**:
   ```powershell
   git push origin <current-branch>
   ```
5. Move to the next file and repeat until all changed files are committed and pushed.

---

### Step 3 — Report Completion

Present a structured summary table showing:
- File path
- Commit message
- Status (✅ Committed & Pushed)

Example format:
```markdown
### 🚀 Commit & Push Summary

| # | File | Commit Message | Status |
|---|------|----------------|--------|
| 1 | `src/components/dino-game.tsx` | `feat(components): update dino-game component` | ✅ Pushed |
| 2 | `src/content/code-raw-content.ts` | `feat(content): update code-raw-content` | ✅ Pushed |
```
