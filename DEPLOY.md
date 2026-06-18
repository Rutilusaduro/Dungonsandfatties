# GitHub Pages Deployment

This project is configured to deploy automatically to GitHub Pages.

## Automatic Deployment

The GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically:
1. Builds the project when you push to `main` or `master`
2. Uploads the built files to GitHub Pages
3. Deploys the site

**Your game will be live at:** `https://Rutilusaduro.github.io/Dungonsandfatties/`

## GitHub Pages Setup

The workflow requires GitHub Pages to be enabled:

1. Go to your repository settings
2. Navigate to **Pages** (under "Code and automation")
3. Under "Source", select **Deploy from a branch**
4. Select the branch as **gh-pages** (the workflow will create this)

## Manual Deployment

If you prefer to deploy manually:

```bash
npm run build
```

This creates a `dist/` folder with the production build. You can then:
- Push the `dist/` folder to the `gh-pages` branch
- Or use any static hosting service

## Testing Locally

To test the production build locally:

```bash
npm run build
npm run preview
```

Open `http://localhost:4173/Dungonsandfatties/` to test.

## Troubleshooting

- **Blank page**: Check browser console for errors. Ensure the base path in `vite.config.js` is correct.
- **Resources 404**: Check that `base: '/Dungonsandfatties/'` is set in vite.config.js
- **Workflow not running**: Ensure GitHub Actions is enabled in repository settings
