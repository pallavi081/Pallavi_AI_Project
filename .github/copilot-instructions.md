# Copilot instructions — Pallavi_AI_Project

This project is a simple React (Vite) frontend + FastAPI Python backend. The notes below capture the essential, discoverable facts an AI coding assistant needs to be immediately productive.

1. Project layout (big picture)
- **Frontend:** [frontend](frontend) is a Vite + React app. Entry: [frontend/src/main.jsx](frontend/src/main.jsx). UI: [frontend/src/App.jsx](frontend/src/App.jsx).
- **Backend:** [backend](backend) is a FastAPI app. Main file: [backend/main.py](backend/main.py). The backend exposes a single chat endpoint at `/chat`.

2. How the pieces communicate
- Frontend sends JSON POST to the backend `/chat` endpoint. Frontend code currently posts to `http://127.0.0.1:5000/chat` (see [frontend/src/App.jsx](frontend/src/App.jsx)).
- Backend's `main.py` runs Uvicorn on port **8000** by default (`uvicorn.run(..., port=8000)`), and returns a JSON object with key `response` (see [backend/main.py](backend/main.py)).
- Two immediate mismatches to be aware of (these cause runtime errors):
  - Port mismatch: frontend posts to port **5000** while backend listens on **8000**.
  - Response key mismatch: backend returns `{ "response": ... }` while frontend expects `response.data.reply`.

3. Quick, exact commands (run from workspace)
- Start backend (dev):
  - From `backend` folder:
  ```bash
  python main.py
  # or explicitly:
  uvicorn main:app --reload --host 0.0.0.0 --port 8000
  ```
- Start frontend (dev):
  - From `frontend` folder:
  ```bash
  npm install
  npm run dev
  ```
- Build frontend:
  ```bash
  npm run build
  ```

4. Critical, discoverable conventions and patterns
- The backend uses FastAPI + Pydantic: the expected request body is `{"message": string}` using `ChatRequest` in [backend/main.py](backend/main.py).
- The backend contains a placeholder import for `openai` and a `SYSTEM_PROMPT` string — AI-provider integration is intentionally left as a replaceable stub.
- The frontend uses `axios` to talk to the backend and Vite dev server for HMR; ESLint is configured via `package.json` scripts.

5. Integration points and where to modify
- To enable a working end-to-end flow, update either:
  - Frontend to POST to `http://127.0.0.1:8000/chat` and read `response.data.response`; OR
  - Backend to return `{ "reply": ... }` and/or listen on port 5000. Examples:
    - Fix frontend: change axios URL in [frontend/src/App.jsx](frontend/src/App.jsx) to `http://127.0.0.1:8000/chat` and use `response.data.response`.
    - Fix backend: change return value in [backend/main.py](backend/main.py) to `return {"reply": ai_response}`.

6. Debugging tips (project-specific)
- If the frontend shows "Error: Make sure your Python backend is running!": check the two mismatches above (port & response key). Confirm backend process with `uvicorn` output or `python main.py`.
- Use browser devtools (Network tab) to inspect the POST to `/chat` and the JSON response key name.

7. Files to inspect for further changes
- [backend/main.py](backend/main.py) — entrypoint, CORS, `ChatRequest`, `SYSTEM_PROMPT`, provider placeholder.
- [frontend/src/App.jsx](frontend/src/App.jsx) — UI flow, axios call, expected response shape.
- [frontend/package.json](frontend/package.json) — scripts (`dev`, `build`, `lint`) and dependencies.

8. When modifying AI integration
- Replace the openai placeholder in [backend/main.py](backend/main.py) with the chosen provider code and ensure keys/secrets are provided via secure environment variables (not checked into repo). Keep the API contract: POST `/chat` expects `{message: string}` and returns a JSON object (document which key you choose: `response` or `reply`).

9. Ask for clarifications
- If you want the assistant to modify code to make the app work end-to-end, specify whether to:
  - change the frontend to match the backend (preferred for minimal backend edits), or
  - change the backend response and/or port to match the frontend (preferred if targeting a 5000-based deployment).

---
If anything here looks wrong or incomplete, tell me which areas to expand (API contract, run scripts, or recommended code fixes) and I'll update this file.
