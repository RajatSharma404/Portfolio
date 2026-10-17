#!/usr/bin/env node

/**
 * commit_one_by_one.mjs
 * 
 * Stages, commits, and pushes changed files one by one to git remote
 * to ensure individual commit tracking for every modified or new file.
 */

import { execSync } from 'child_process';
import path from 'path';

function run(cmd, options = {}) {
  try {
    return execSync(cmd, { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'], ...options }).trim();
  } catch (error) {
    const stderr = error.stderr ? error.stderr.toString().trim() : '';
    const stdout = error.stdout ? error.stdout.toString().trim() : '';
    throw new Error(`Command failed: ${cmd}\n${stderr || stdout || error.message}`);
  }
}

function getCurrentBranch() {
  try {
    return run('git branch --show-current') || run('git rev-parse --abbrev-ref HEAD');
  } catch {
    return 'main';
  }
}

function getChangedFiles() {
  // Use -uall to list individual files inside untracked directories
  // Do not trim raw output globally, as lines with leading space (e.g. " M file") would lose their first space!
  const rawStatus = execSync('git status --porcelain -uall', { encoding: 'utf-8' });
  if (!rawStatus) return [];

  const lines = rawStatus.split(/\r?\n/).filter(l => l.length >= 4);
  const files = [];

  for (const line of lines) {
    const status = line.slice(0, 2);
    let filePath = line.slice(3).trim();

    // Handle quoted paths (e.g., paths with special chars)
    if (filePath.startsWith('"') && filePath.endsWith('"')) {
      filePath = filePath.slice(1, -1);
    }

    // Handle renamed files (e.g. R old -> new)
    if (filePath.includes(' -> ')) {
      filePath = filePath.split(' -> ')[1].trim();
    }

    files.push({
      status: status.trim(),
      path: filePath.replace(/\\/g, '/')
    });
  }

  return files;
}

function generateCommitMessage(fileInfo) {
  const { status, path: filePath } = fileInfo;
  const fileName = path.basename(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const dir = path.dirname(filePath).replace(/\\/g, '/');

  // Determine type of change
  const isDeleted = status.includes('D');
  const isNew = status.includes('?') || status.includes('A');

  if (isDeleted) {
    return `chore(clean): remove ${fileName}`;
  }

  // Specific file rules
  if (fileName === 'package.json' || fileName === 'package-lock.json') {
    return 'chore(deps): update project dependencies';
  }
  if (fileName === 'AGENTS.md' || fileName === 'GEMINI.md') {
    return 'chore(agent): update agent instructions and policies';
  }
  if (dir.includes('.agents/skills')) {
    const skillName = dir.split('.agents/skills/')[1]?.split('/')[0] || 'skills';
    return `chore(${skillName}): ${isNew ? 'add' : 'update'} ${fileName}`;
  }
  if (ext === '.md') {
    return `docs: update ${fileName}`;
  }
  if (ext === '.css' || ext === '.scss') {
    return `style: update styles in ${fileName}`;
  }
  if (dir.includes('src/components/sections')) {
    const sectionName = fileName.replace(/\.[^/.]+$/, '').replace(/-section$/, '');
    return `${isNew ? 'feat' : 'refactor'}(sections): ${isNew ? 'add' : 'update'} ${sectionName} section`;
  }
  if (dir.includes('src/components')) {
    const compName = fileName.replace(/\.[^/.]+$/, '');
    return `${isNew ? 'feat' : 'refactor'}(components): ${isNew ? 'add' : 'update'} ${compName} component`;
  }
  if (dir.includes('src/app/api')) {
    const apiName = dir.split('src/app/api/')[1] || fileName;
    return `feat(api): update ${apiName} endpoint`;
  }
  if (dir.includes('src/content')) {
    return `feat(content): update ${fileName}`;
  }
  if (dir.includes('scripts')) {
    return `chore(scripts): update ${fileName}`;
  }

  // Fallback conventional message
  const action = isNew ? 'add' : 'update';
  return `feat(${dir === '.' ? 'root' : path.basename(dir)}): ${action} ${fileName}`;
}

async function main() {
  console.log('🚀 Checking git status for individual file commits...');

  const files = getChangedFiles();
  if (files.length === 0) {
    console.log('✅ Working tree is clean. Nothing to commit.');
    return;
  }

  const branch = getCurrentBranch();
  console.log(`📦 Found ${files.length} changed file(s) to commit and push on branch "${branch}".\n`);

  let successCount = 0;
  let failedCount = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const index = i + 1;
    const msg = generateCommitMessage(file);

    console.log(`[${index}/${files.length}] Processing: ${file.path}`);
    console.log(`     Commit Message: "${msg}"`);

    try {
      // 1. Stage only this file
      run(`git add -A -- "${file.path}"`);

      // 2. Commit this file
      run(`git commit -m "${msg.replace(/"/g, '\\"')}"`);

      // 3. Push immediately
      console.log(`     Pushing to origin/${branch}...`);
      run(`git push origin "${branch}"`);

      console.log(`     ✅ Successfully committed & pushed!\n`);
      successCount++;
    } catch (err) {
      console.error(`     ❌ Error on ${file.path}: ${err.message}\n`);
      failedCount++;
      // Stop or continue? Let's ask or continue
      console.error(`Stopping sequence due to error to prevent desync.`);
      break;
    }
  }

  console.log('----------------------------------------------------');
  console.log(`🎉 Finished! Successfully committed and pushed: ${successCount} file(s).`);
  if (failedCount > 0) {
    console.log(`⚠️ Encountered errors on ${failedCount} file(s).`);
  }
}

main().catch(err => {
  console.error('Fatal error running commit script:', err);
  process.exit(1);
});
