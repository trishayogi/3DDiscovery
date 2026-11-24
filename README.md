# 3D Discovery

3D Discovery is a web design showcase centered on immersive 3D experiences. The frontend presents a featured website with visual highlights, category tags, and community ratings. Visitors can register, log in, manage their profile through the API, and use the password reset flow.

## Tech stack

- **Frontend:** React 19, Vite, React Router
- **Backend:** Node.js, Express 5
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT and bcryptjs
- **Password reset email:** Nodemailer / SMTP
- **Deployment:** Render (configuration provided in `render.yaml`)

## Project structure

```text
3DDiscovery/
├── Backend/
│   ├── config/             # MongoDB and email configuration
│   ├── models/             # Mongoose user model
│   ├── routes/             # Authentication and profile API
│   ├── Authmiddelware/     # JWT authentication middleware
│   ├── Server.js
│   └── .env.example
├── Frontend/
│   ├── public/             # Showcase images
│   ├── src/                # React pages and styles
│   └── example.env
├── render.yaml
└── render.env.example
```

## Requirements

- Node.js (Render is configured for Node `22.12.0`)
- npm
- A MongoDB database
- SMTP credentials to send password reset emails

## Run locally

Open two terminals from the repository root.

### 1. Configure and start the backend

Create `Backend/.env` from the example:

```powershell
Copy-Item Backend/.env.example Backend/.env
```

Set at least `MONGODB_URI` and `JWT_SECRET` in `Backend/.env`. To enable password reset emails, also set the SMTP values and `FRONTEND_URL` (for local development, use `http://localhost:5173`).

Then start the API:

```powershell
cd Backend
npm install
npm run dev
```

The API defaults to `http://localhost:5000`. Its health check is available at `http://localhost:5000/health`.

### 2. Configure and start the frontend

Create `Frontend/.env` from the frontend example:

```powershell
Copy-Item Frontend/example.env Frontend/.env
```

Set the API address in `Frontend/.env`:

```dotenv
VITE_API_URL=http://localhost:5000
```

Then start Vite in the second terminal:

```powershell
cd Frontend
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Available frontend routes

| Route | Page |
| --- | --- |
| `/` | 3D Discovery showcase |
| `/login` | Login |
| `/signup` | Account registration |
| `/forgotpassword` | Request a password reset email |
| `/resetpassword?token=...` | Set a new password from a reset link |

## API endpoints

All user endpoints are prefixed with `/api/users`.

| Method | Path | Description | Authentication |
| --- | --- | --- | --- |
| `POST` | `/register` | Create an account | No |
| `POST` | `/login` | Log in and receive a JWT | No |
| `POST` | `/forgot-password` | Request a password reset link | No |
| `POST` | `/reset-password` | Set a new password using a reset token | No |
| `GET` | `/profile` | Get the current user profile | Bearer token |
| `PUT` | `/profile` | Update name and email | Bearer token |
| `PATCH` | `/profile` | Update provided profile fields | Bearer token |
| `DELETE` | `/profile` | Delete the current account | Bearer token |
| `POST` | `/logout` | Logout endpoint | Bearer token |

For protected endpoints, send the login token as `Authorization: Bearer <token>`.

## Environment variables

### Backend (`Backend/.env`)

| Variable | Purpose |
| --- | --- |
| `PORT` | API port (defaults to `5000`) |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign login tokens |
| `FRONTEND_URL` | Frontend origin used to build password reset links |
| `SMTP_HOST` | SMTP server hostname |
| `SMTP_PORT` | SMTP server port (defaults to `587`) |
| `SMTP_SECURE` | Use implicit TLS (`true` or `false`) |
| `SMTP_USER` | SMTP username |
| `SMTP_PASS` | SMTP password or provider app password |
| `SMTP_FROM` | Sender email address (defaults to `SMTP_USER`) |
| `SMTP_FROM_NAME` | Sender display name |

### Frontend (`Frontend/.env`)

| Variable | Purpose |
| --- | --- |
| `VITE_API_URL` | Backend base URL; defaults to `http://localhost:5000` in the app |

Keep real credentials in local environment files or deployment settings. Do not commit `.env` files.

## Build and lint

From `Frontend/`:

```bash
npm run build
npm run lint
```

To preview a production build locally:

```bash
npm run preview
```

## Deploy to Render

The root `render.yaml` defines a Node web service for `Backend/` and a static site for `Frontend/`. In Render, create a Blueprint from this repository and provide the values marked `sync: false`, including the MongoDB URI, frontend URL, SMTP credentials, and frontend `VITE_API_URL`. The frontend static site uses an SPA rewrite to serve React Router routes.
