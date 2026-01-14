# Repository Guidelines

## Project Structure & Module Organization
- `index.html` is the browser entry point; keep script/style tags scoped and minimal.
- `game/game.js` is for gameplay rules and state handling; keep rendering concerns out of this module.
- `render/render.js` and `render/style.css` handle canvas/UI rendering and styling; add images or sounds under `render/assets/` if needed.
- `server/main.py` is a Python backend stub; add API or websocket endpoints here and document any runtime flags.
- Keep prototypes or notes in short markdown files near their code; avoid root-level clutter.

## Build, Run, and Development Commands
- Quick local preview: `python3 -m http.server 8000` from the repo root, then open `http://localhost:8000`.
- When extending the Python backend: create a virtual env (`python3 -m venv .venv && source .venv/bin/activate`) before installing deps or running scripts.
- If you introduce Node tooling, check in a `package.json` and prefer `npm run <task>` scripts (e.g., `npm run dev`, `npm test`) over raw commands.

## Coding Style & Naming Conventions
- Use 4-space indentation across HTML, JS, and Python to match existing files.
- JavaScript: modern ES syntax, `const`/`let`, `camelCase` for functions/vars, `PascalCase` for classes; keep modules small and pure.
- CSS: kebab-case class names; co-locate component styles in `render/style.css` and avoid inline styles.
- Python: follow PEP 8, `snake_case` names, and type hints where practical.

## Testing Guidelines
- No automated suite yet; add focused tests alongside new code (`tests/*.spec.js` for JS, `server/tests/test_*.py` for Python) and wire them to `npm test` or `pytest`.
- Manual smoke check every change: run the local server, verify rendering, controls, and basic interactions on desktop and at least one mobile viewport.
- Document any new debug shortcuts or reproduction steps in the PR description.

## Commit & Pull Request Guidelines
- Commits: one logical change per commit, subject in imperative mood under 72 chars (e.g., `Add canvas renderer scaffolding`); keep messages factual.
- Pull requests: explain what/why, list manual/automated tests run, include screenshots or short clips for UI changes, and note new configs/assets or breaking changes. Link related issues when available.

## Security & Configuration Tips
- Never commit secrets or tokens; store them in untracked `.env.local` files and read them from the Python server layer when needed.
- Keep client URLs and feature flags centralized (one place in `render/` for front-end constants, one place in `server/` for server config) to simplify audits.
