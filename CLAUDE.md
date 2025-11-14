# CLAUDE.md - AI Assistant Guide for claude-code-samples

## Repository Overview

**Purpose:** A curated collection of websites hosted on GitHub Pages, built exclusively using Claude Code.

**Current State:** This is a fresh repository with minimal structure, ready to be populated with code samples and example projects.

**License:** Apache License 2.0

---

## Repository Structure

### Current Files
```
claude-code-samples/
├── LICENSE              # Apache 2.0 license
├── README.md            # Project overview and sample listings
└── CLAUDE.md           # This file - AI assistant guide
```

### Recommended Structure for Future Samples

When adding new code samples, follow this organization pattern:

```
claude-code-samples/
├── samples/
│   ├── <project-name>/
│   │   ├── index.html
│   │   ├── css/
│   │   ├── js/
│   │   ├── assets/
│   │   └── README.md    # Project-specific documentation
│   └── ...
├── docs/                # Additional documentation
├── .github/
│   └── workflows/       # CI/CD for GitHub Pages deployment
├── LICENSE
├── README.md
└── CLAUDE.md
```

---

## Development Workflow

### Git Branch Strategy

**Current Branch:** `claude/claude-md-mhymjxedlyetudvu-015JosfK2LwypJU2r1EsZ5UL`

**Important Git Rules:**
1. Always develop on Claude-specific feature branches (format: `claude/<description>-<session-id>`)
2. Never push directly to main/master without explicit permission
3. Use descriptive commit messages following conventional commits format
4. Push with `-u` flag: `git push -u origin <branch-name>`
5. Retry network failures up to 4 times with exponential backoff (2s, 4s, 8s, 16s)

### Adding New Code Samples

When adding a new website sample:

1. **Create Directory Structure**
   ```bash
   mkdir -p samples/<project-name>/{css,js,assets}
   ```

2. **Required Files for Each Sample:**
   - `index.html` - Main entry point
   - `README.md` - Project description, features, and build info
   - Source files organized in appropriate subdirectories

3. **Update Main README.md**
   - Add the new sample to the list with:
     - Project name and description
     - Link to live GitHub Pages site
     - Link to source directory
     - Screenshot or preview (if available)

4. **Commit and Push**
   ```bash
   git add .
   git commit -m "Add <project-name> sample website"
   git push -u origin <branch-name>
   ```

---

## Code Conventions

### HTML
- Use semantic HTML5 elements
- Include proper meta tags (viewport, description, charset)
- Ensure accessibility (ARIA labels, alt text, semantic structure)
- Use consistent indentation (2 spaces recommended)

### CSS
- Organize styles logically (layout → components → utilities)
- Use CSS custom properties for theming
- Include responsive design (mobile-first approach)
- Comment complex selectors and layout logic

### JavaScript
- Use modern ES6+ syntax
- Avoid inline event handlers (use addEventListener)
- Include error handling for async operations
- Add JSDoc comments for functions

### File Naming
- Use lowercase with hyphens: `my-project-name`
- Be descriptive: `hero-section.css` not `hs.css`
- Use consistent extensions: `.html`, `.css`, `.js`

---

## GitHub Pages Configuration

### Deployment Guidelines

1. **Enable GitHub Pages:**
   - Settings → Pages → Source: Select branch (main or gh-pages)
   - Optionally configure custom domain

2. **URL Structure:**
   - Repository: `https://github.com/olishiz/claude-code-samples`
   - Live site: `https://olishiz.github.io/claude-code-samples/`
   - Sample sites: `https://olishiz.github.io/claude-code-samples/samples/<project-name>/`

3. **Build Considerations:**
   - No build step required for static HTML/CSS/JS
   - If using build tools (Sass, TypeScript), commit compiled output
   - Optionally set up GitHub Actions for automated builds

### Sample GitHub Actions Workflow

If automated deployment is needed, create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

---

## Quality Standards

### Before Adding a Sample

Ensure each sample meets these criteria:

- [ ] **Functional:** Works as intended without errors
- [ ] **Responsive:** Displays properly on mobile, tablet, and desktop
- [ ] **Accessible:** Passes basic WCAG 2.1 AA guidelines
- [ ] **Performance:** Optimized images, minified CSS/JS (for production)
- [ ] **Documentation:** README includes description, features, and usage
- [ ] **License Compliance:** All third-party resources properly attributed
- [ ] **Browser Compatibility:** Works in modern browsers (Chrome, Firefox, Safari, Edge)

### Code Review Checklist

- Valid HTML (use W3C validator)
- No console errors in browser DevTools
- All links and resources load correctly
- Images include alt text
- Reasonable load time (<3s on good connection)
- Mobile-friendly (test with browser DevTools)

---

## Common Tasks for AI Assistants

### 1. Adding a New Sample Website

```bash
# Create directory structure
mkdir -p samples/my-portfolio/{css,js,assets/images}

# Create files
touch samples/my-portfolio/index.html
touch samples/my-portfolio/css/style.css
touch samples/my-portfolio/js/main.js
touch samples/my-portfolio/README.md

# Edit files with content
# ... (use Edit or Write tools)

# Update main README.md with sample information
# ... (use Edit tool)

# Commit changes
git add samples/my-portfolio
git commit -m "Add my-portfolio sample website

- Responsive personal portfolio with modern design
- Features: smooth scrolling, contact form, project gallery
- Technologies: HTML5, CSS3, Vanilla JavaScript"

# Push to branch
git push -u origin claude/<branch-name>
```

### 2. Updating Existing Sample

```bash
# Read the existing file
# Make changes using Edit tool

# Commit with descriptive message
git add samples/<project-name>
git commit -m "Update <project-name>: <what changed>

- Change 1
- Change 2"

git push
```

### 3. Fixing Issues

When asked to fix bugs or issues:

1. **Investigate:** Read relevant files to understand the problem
2. **Reproduce:** Verify the issue exists
3. **Fix:** Make targeted changes using Edit tool
4. **Test:** Explain how to verify the fix
5. **Document:** Update README if behavior changed
6. **Commit:** Push fix with clear commit message

### 4. Creating Documentation

When asked about the codebase or samples:

1. **Explore:** Use Task tool with Explore agent to understand structure
2. **Read:** Read relevant files thoroughly
3. **Synthesize:** Provide clear, accurate explanations
4. **Reference:** Include file paths and line numbers when specific
5. **Update:** Suggest documentation improvements if gaps found

---

## Special Considerations

### Working with Static Sites

- All samples should be **static sites** (HTML/CSS/JS) that work on GitHub Pages
- No server-side code (PHP, Python, Ruby, etc.)
- External APIs should be called client-side with CORS support
- Environment variables should not contain secrets (everything is public)

### Asset Management

- Keep image file sizes reasonable (<500KB per image)
- Use modern formats (WebP with fallbacks)
- Store assets in `assets/` or `images/` directories
- Use relative paths for portability

### Third-Party Dependencies

When using libraries or frameworks:

- Prefer CDN links over local copies (reduces repo size)
- Pin versions for stability (e.g., `@3.6.0` not `@latest`)
- Document all dependencies in project README
- Ensure licenses are compatible with Apache 2.0

---

## Troubleshooting

### Common Issues

**Issue:** GitHub Pages not deploying
- **Solution:** Check Settings → Pages is enabled, correct branch selected
- Verify `index.html` exists in root or selected folder
- Check for build errors in Actions tab (if using workflows)

**Issue:** Assets not loading on GitHub Pages
- **Solution:** Use relative paths, not absolute: `./css/style.css` not `/css/style.css`
- GitHub Pages serves from subdirectory: `/claude-code-samples/`

**Issue:** Git push fails with 403
- **Solution:** Verify branch name starts with `claude/` and includes session ID
- Check network connection and retry with exponential backoff

**Issue:** Broken links between samples
- **Solution:** Use repository-relative paths: `/claude-code-samples/samples/other-project/`
- Or use full GitHub Pages URLs

---

## Resources

### For Development
- [MDN Web Docs](https://developer.mozilla.org/) - HTML/CSS/JS reference
- [Can I Use](https://caniuse.com/) - Browser compatibility tables
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

### For Validation
- [W3C HTML Validator](https://validator.w3.org/)
- [W3C CSS Validator](https://jigsaw.w3.org/css-validator/)
- [WAVE Accessibility Checker](https://wave.webaim.org/)

### For Assets
- [Unsplash](https://unsplash.com/) - Free images
- [Font Awesome](https://fontawesome.com/) - Icon library
- [Google Fonts](https://fonts.google.com/) - Web fonts

---

## Contact and Contributions

This repository is maintained by the claude-code-samples team.

**For AI Assistants:**
- Always follow the conventions in this document
- When uncertain, ask the user for clarification
- Suggest improvements to this guide if you find gaps
- Be proactive about code quality and documentation

**Repository URL:** `https://github.com/olishiz/claude-code-samples`

---

## Version History

- **v1.0** (2025-11-14) - Initial CLAUDE.md created
  - Repository analysis and structure documentation
  - Development workflow guidelines
  - Code conventions and quality standards
  - AI assistant task guidelines

---

*Last Updated: 2025-11-14*
*This document should be updated whenever significant repository structure or workflow changes occur.*
