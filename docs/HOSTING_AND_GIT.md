# Hosting and future changes

## Deploy the website

Use a static host. The web root is the CONTENTS of dist, with index.html at its root. deploy-ready.zip contains exactly those website files. Do not publish this complete handover package: it contains internal documentation and Git history.

Typical settings:
- Framework: none / static.
- Build command: none.
- Output directory: dist.
- Serve .mjs files with a JavaScript MIME type.
- Enable HTTPS.

For a simple Cloudflare Pages Direct Upload deployment, open Workers & Pages, create an application, choose the drag-and-drop flow, upload deploy-ready.zip, and deploy. Direct Upload projects cannot later switch to native Git integration; create a Git-integrated project from the start if that is your intended update workflow. Consult the provider's current dashboard instructions.

After verifying the hosted preview, add your domain in the hosting dashboard and follow its exact DNS records. Purchase and retain the domain and hosting accounts under your control. Do not guess DNS values. Verify HTTPS and both preferred domain variants.

The existing .openai/hosting.json identifies the current managed Site. Independent static hosts do not need it. Do not reuse its project identity to create a different managed Site. The existing Site was owner-private at export; this ZIP does not change its visibility.

## Start a repository containing the full handover

Create an empty private repository in your own Git service account. From this extracted folder:
```sh
git init -b main
git add .
git commit -m "Import WORKX IT website and handover"
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main
```

Replace YOUR_REPOSITORY_URL with your repository's real URL. The supplied .gitignore excludes generated ZIPs, the history bundle, local logs and environment files. Keep the original ZIP as a backup.

## Restore the existing nine-commit history

Instead of starting a new history, run this from the extracted folder:
```sh
git clone --branch main source-history.bundle workx-it-history
cd workx-it-history
git remote remove origin
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main
```

The bundle restores the website's original main history. Handover docs and tests added for this export are not in those historical commits; copy them from this package and commit them if desired. The temporary bundle origin is replaced with your own repository. No account authentication or managed Git credentials are included.

## Make future changes

1. Create a branch, for example `git switch -c update-homepage`.
2. Edit the files under dist.
3. Run the documented checks and review the site locally on desktop and mobile.
4. Commit the change and push your branch.
5. Review a hosting preview, merge into main and deploy.
6. If a published change causes a problem, use your host's rollback or revert the relevant Git commit and redeploy.

You can return with this repository or updated source files for further changes. Keep your Git repository as the current source of truth.

## Official references

- https://developers.cloudflare.com/pages/get-started/direct-upload/
- https://git-scm.com/docs/git-bundle
- https://docs.python.org/3/library/http.server.html

