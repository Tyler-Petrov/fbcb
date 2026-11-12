#!/usr/bin/env sh
# T3 Code sources this from the worktree root (`. scripts/worktree-setup.sh`),
# so it stays POSIX and leaves the calling shell alone: no set -e, cd, or exit.
case "$(git branch --show-current)" in
    main | master)
        echo "You can't set up a worktree on main" >&2
        false
        ;;
    *)
        pnpm install && echo "Worktree ready: run \`pnpm dev\` for this worktree's dev server."
        ;;
esac
