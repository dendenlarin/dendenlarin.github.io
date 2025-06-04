# Trello Clone Service

This simple service provides a minimal backend for the Trello-like board page in the root of this repository. It stores board data in a JSON file and exposes a small HTTP API. The location of this file can be changed with the `BOARD_FILE` environment variable.

## Endpoints

- `GET /api/board` – retrieve the entire board structure as JSON.
- `POST /api/board` – replace the board data. Expects JSON body with lists and cards.

## Usage

```bash
cd trello-service
npm install
npm start
```

The service runs on port `3001` by default (override with `PORT`) and serves the static files from the repository root so you can open `http://localhost:3001/board.html` in your browser.
