# biblioteca-digitale-pw
Project Work per Laurea Triennale in Informatica per le aziende digitali L-31 - A.A 2026-2027

## Avvio in locale

Requisiti: Python 3.13 e Node.js con npm. Per il frontend usa Node.js
20.19 o successivo della serie 20, 22.13 o successivo della serie 22,
oppure Node.js 24 o successivo. Node.js 16 non è compatibile con Vite.

### 1. Backend

Dalla cartella `backend/`:

```powershell
python -m venv .venv
.\.venv\Scripts\pip install -r requirements.txt
```

Crea il file `backend/.env` copiando `backend/.env.example` e imposta:

- `ADMIN_EMAIL` e `ADMIN_PASSWORD`: credenziali dell'account amministratore.
- `SECRET_KEY`: una chiave casuale, generabile con
  `.\.venv\Scripts\python.exe -c "import secrets; print(secrets.token_urlsafe(32))"`.

Avvia il server (API su `http://localhost:8000`):

```powershell
.\.venv\Scripts\uvicorn app.main:app --reload
```

Il database SQLite (`backend/biblioteca.db`) viene creato automaticamente al primo avvio, insieme alle tabelle.
Se il database è vuoto, il backend importa in automatico libri ed eventi di esempio da `frontend/src/data/`.
Per rieseguire l'importazione manualmente, con il backend fermo: `.\.venv\Scripts\python.exe seed_catalog.py`.

### 2. Frontend

Dalla cartella `frontend/`, in un altro terminale:

```powershell
node --version
npm install
npm run dev
```

Se usi nvm per Windows e hai già installato Node.js 22.21.1, selezionalo
con `nvm use 22.21.1` prima di avviare il frontend. Se il terminale continua
a mostrare una versione diversa, riaprilo e verifica `node --version`.

L'app è disponibile su `http://localhost:5173`. Se il backend gira su un indirizzo diverso da `http://localhost:8000`, imposta la variabile `VITE_API_URL` in `frontend/.env`.
