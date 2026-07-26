---
name: rtk
description: >
  Prefer RTK (Rust Token Killer) for shell commands so bash output is filtered
  before it hits the LLM context. Sources: https://github.com/rtk-ai/rtk
---

# RTK — Rust Token Killer

Token-optimized CLI proxy for shell commands. Filters and compresses command output (up to ~90% less bash noise).

## Rule

When `rtk` is on PATH, **always** prefix supported shell commands with `rtk` instead of running them raw.

Examples:

```bash
rtk git status
rtk git diff
rtk git log -n 10
rtk ls src/
rtk grep "pattern" src/
rtk find "*.ts" .
rtk npm test
rtk vitest
rtk docker ps
rtk gh pr list
```

## Meta commands

```bash
rtk gain              # Show token savings
rtk gain --history    # Command history with savings
rtk discover          # Find missed RTK opportunities
rtk proxy <cmd>       # Run raw (no filtering) when full output is needed
```

## Fallback

- If `rtk` is missing or a command fails only under RTK, run the raw command (or `rtk proxy <cmd>`).
- Cursor built-in Read/Grep/Glob tools do not go through RTK; prefer Shell + `rtk` when you need compact listings/searches.
- Do not invent RTK subcommands. If unsure, use `rtk proxy <cmd>` or the raw command.

## Install (human)

Windows: download `rtk-x86_64-pc-windows-msvc.zip` from releases, put `rtk.exe` on PATH, then:

```bash
rtk init -g --agent cursor
```

Verify: `rtk --version` then `rtk gain`.
