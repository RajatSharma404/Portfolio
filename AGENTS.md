<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:git-commit-policy -->
# Git Commit & Push Policy
- **NO AUTO-COMMITS**: Never automatically stage, commit, or push git changes during development, bug fixing, refactoring, or file edits.
- **EXPLICIT TRIGGER ONLY**: Git commits and pushes must ONLY be executed when the user explicitly triggers `/commit` or runs the `commit` skill.
- **INDIVIDUAL FILE COMMITS**: When the `/commit` skill is run, files must be committed and pushed 1-by-1 to record individual GitHub activity for each file.
<!-- END:git-commit-policy -->
