# Contributing

Contributions are welcome when they support the goal of making BIM review easier, safer, and more accessible.

## Principles

- Keep the core viewer browser-only and easy to inspect.
- Prefer open formats such as IFC and JSON.
- Avoid mandatory cloud services, accounts, or hidden network behavior.
- Keep review data portable.
- Add dependencies only when they clearly improve reliability or maintainability.

## Development

```bash
npm install
npm run dev
```

Build distributable files:

```bash
npm run build
```

## Pull Request Checklist

- The viewer still opens without a backend.
- `npm run build` succeeds.
- New dependencies are documented in `THIRD_PARTY_NOTICES.md`.
- UI changes work on desktop and mobile widths.
- Features that exchange review data use documented JSON structures.
