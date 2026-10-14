# WORKX IT — complete website handover

Exported 14 October 2026. Start here.

This package contains the complete existing static website, all tracked assets, the available Git history, regression checks and handover documentation. WORKX IT develops websites and digital business solutions, primarily for Australian cleaning-business owners and management.

## What is included

- `dist/`: editable website source and all local assets. This is also the production output; there is no build step.
- `deploy-ready.zip`: only the website files, ready for a compatible static host.
- `source-history.bundle`: all nine commits on the existing main branch.
- `tests/`: code-level regression checks, runnable with Node.js.
- `docs/`: hosting, Git, development, assets and booking integration guidance.
- `SOURCE_VERSION.json`: exact source commit and export status.
- `MANIFEST.sha256`: checksums for all other package files.
- `.openai/hosting.json`: the existing managed hosting configuration, included for completeness.

## Run locally

Install Python 3 if needed, extract the complete ZIP, and open a terminal inside this folder.

Windows:
```sh
py -3 -m http.server 8080 --bind 127.0.0.1 --directory dist
```

macOS / Linux:
```sh
python3 -m http.server 8080 --bind 127.0.0.1 --directory dist
```

Open http://127.0.0.1:8080 in your browser. Press Ctrl+C in the terminal to stop. Use a local HTTP server rather than double-clicking index.html, because the website uses JavaScript modules. Python's server is for local review, not production hosting.

## Before going live

The website and scheduling interface are frontend code. Meeting times are illustrative. It does not reserve appointments, send email or invitations, create Zoom/Teams meetings, or place WhatsApp calls. See `docs/BOOKING_INTEGRATION.md` before enabling real bookings.

No backend or database has been built, so none is included. Account passwords, access tokens, hosting accounts and domain ownership are not part of a source-code export.

For hosting and future changes, read `docs/HOSTING_AND_GIT.md`. For file roles and checks, read `docs/DEVELOPER_HANDOVER.md` and `docs/VERIFICATION.md`.

