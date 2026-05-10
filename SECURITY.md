# Security Policy

## Security Model

IFC Review Viewer is designed as a local-first browser application.

- IFC files are selected by the user and processed in the browser.
- The standalone HTML version does not require a server.
- Review comments are stored in browser local storage unless exported as JSON by the user.
- The application does not require accounts, cloud storage, or external upload endpoints.

## Data Handling

Users should treat IFC files as project data. Do not publish sample or production IFC files unless the project owner has approved redistribution.

When sharing review comments, use the exported JSON file and confirm that it does not contain confidential project notes before distribution.

## Reporting Issues

For public releases, report security issues through the repository issue tracker or the contact channel defined by the maintainers.

Please include:

- Browser and OS
- Steps to reproduce
- Whether the issue affects local files, exported comments, or viewer behavior
- A minimal non-confidential sample file if needed

## Dependency Review

Runtime dependencies are listed in `THIRD_PARTY_NOTICES.md`. Before release, maintainers should run:

```bash
npm audit
npm run build
```
