
## v1.1-netlify-forms (rollback checkpoint)
- Netlify Forms working: hidden registration + runtime attribute injection
- Pages include <EmailJsFormBridge /> (Home + Contact)
- Success redirect -> /thank-you
- Build: `npm install && npm run build` (Publish dir: `out`)
- Env: `NETLIFY_NEXT_PLUGIN_SKIP=1` (no Next runtime)
- Redirects: canonical host + `/*  /index.html 200`
- Rollback:
  git switch --detach v1.1-netlify-forms
  # or start a branch
  git switch -c hotfix-from-v1.1 v1.1-netlify-forms

## v1.2-content-refresh
- Copy/formatting updates only
- Build: `npm install && npm run build` (Publish: `out`)
- Netlify config unchanged (static export, no netlify.toml, SPA fallback)
- Rollback: `git switch --detach v1.2-content-refresh`
