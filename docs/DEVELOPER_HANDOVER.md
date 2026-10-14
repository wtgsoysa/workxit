# Developer handover

## Architecture

Static HTML, CSS and JavaScript with no package installation or compilation. Edit the files under `dist/` directly. The export preserves the source bytes at the commit in SOURCE_VERSION.json.

| File | Purpose |
| --- | --- |
| dist/index.html | Page structure, content, service experience, projects and scheduling interface |
| dist/style.css | Brand styling, responsive layout and later refinement overrides |
| dist/app.js | Service-selection experience, business perspectives, overview, dialogs and plan export |
| dist/connections.js | Tangora project showcase, image navigation and connections between page experiences |
| dist/scheduler.js | Multi-step scheduling preview, contact validation and calendar-draft download |
| dist/scheduling-core.mjs | Timezone conversion, validation and calendar generation helpers |
| dist/meeting-config.js | Legacy public placeholders; the current scheduler does not consume them |
| dist/assets/ | WORKX IT logos, platform logos, project screenshots and retained artwork |

Keep the service identifiers website, redesign and digital aligned across the service experience and scheduling topics. Some internal perspective identifiers remain owner, team and client; inspect the displayed content before changing an identifier. Later CSS rules override earlier ones, so search all occurrences of a selector before editing.

## Brand and content

Maintain WORKX IT's navy/orange identity and use the supplied logo variants consistently. The business provides website development and digital transformation to cleaning-business owners and management. Service copy must describe those capabilities accurately.

The Tangora showcase uses saved images and external project links. Update both when the project changes. The older clarity.png asset is retained even where unused.

## Browser requirements

Use current browsers supporting native dialog, JavaScript modules, Intl timezone formatting, Blob downloads and crypto.randomUUID. Use HTTPS in production; localhost supports local development.

Google Fonts is loaded externally for DM Sans and Manrope. Internet access is needed for those font downloads. If a fully offline site is required, obtain and self-host appropriately licensed font files and update the stylesheet.

## Checks

From the extracted package root, with Node.js installed:
```sh
node tests/service-experience.cjs
node tests/project-showcase.cjs
node tests/scheduling-core.mjs
```

These checks exercise selected JavaScript behavior and helpers. They do not replace real browser, responsive-layout, keyboard or live-integration testing. See VERIFICATION.md.

