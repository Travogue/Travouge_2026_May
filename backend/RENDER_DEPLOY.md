# Deploy backend on Render

## Service settings

| Setting | Value |
|---------|--------|
| Root Directory | `backend` |
| Build Command | `npm install` |
| Start Command | `npm start` |

Do **not** set `PORT` manually. Render sets it automatically.

## Environment variables (required)

In **Render Dashboard → Web Service → Environment**, add:

| Key | Example |
|-----|---------|
| `MONGO_URI` | `mongodb+srv://USER:PASS@cluster.mongodb.net/travouge?retryWrites=true&w=majority` |
| `JWT_SECRET` | long random string |
| `ADMIN_EMAIL` | optional |
| `ADMIN_PASSWORD` | optional |

Click **Save Changes**, then **Manual Deploy → Deploy latest commit**.

## Why `injected env (1)` and `Exited with status 1`

- Render found a `.env` file with only one variable, **or** `MONGO_URI` / `JWT_SECRET` were never set in the Dashboard.
- The app exits before starting because those keys are required.
- **Do not rely on `.env` on Render.** Set variables in the Dashboard.

## MongoDB Atlas

- Use a cloud `mongodb+srv://` URI (not `127.0.0.1`).
- Network Access: allow `0.0.0.0/0` for testing.
- URL-encode special characters in the password.

## Success logs

```
MongoDB connected
Server running on http://0.0.0.0:10000
```

## Security

- Do not commit `backend/.env` to GitHub.
- If `.env` was pushed, rotate Atlas password and run: `git rm --cached backend/.env`
