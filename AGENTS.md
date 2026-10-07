<!-- modforge-doc
authority: entrypoint
load: always
purpose: single repository-wide coding-agent start point
-->
# Tarkov Companion — repository working instructions

Start with `docs/production/PROJECT.md`, `CURRENT_STATE.md`, `WORK_QUEUE.md`,
`BUGS.md`, `DECISIONS.md`, and `.modforge/PROJECT_STATE.md` when present. Then load
only the technical documentation relevant to the active task. Check Git status before
editing and preserve unrelated work.

Work from an explicit task/bug or owner request. Preserve existing architecture, make
the smallest correct change, define validation before editing, and report exact files,
checks, remaining risks, and anything still requiring human/live verification.

ModForge coordinates state/workflows/handoffs. The assigned coding tool owns technical implementation inside the approved task/architecture boundaries; ModForge does not compete with it. Heavy architecture/cross-system work should route to Codex (or the strongest approved coding tool), while bounded budget work can route to OpenCode. Do not create work merely to stay busy, broaden scope silently, or claim completion without evidence.

Usage/model exhaustion is a resumable interruption, not a project-state change. Do not mark work complete or silently enable paid usage because a quota ends; preserve Git diff/tests/evidence and resume from canonical task state with an approved capable model.

Debug/console logs are on-demand diagnostic evidence. Do not preload giant logs; inspect the smallest relevant recent slice only when the active runtime/test failure requires it.
