# Roadmap

## Phase 1: Public IFC Viewer Core

- Stable IFC loading
- WebGL navigation
- Element selection
- Basic IFC property display
- Element-level comments
- Comment import/export
- Multi-IFC loading
- Category visibility
- Storey visibility
- Reference grid and level guide display
- Simple section plane
- Standalone HTML distribution

## Phase 2: Review Workflows

- Comment status and categories
- Search and filtering
- Review summary export
- BCF-compatible issue exchange research
- Review sessions and saved viewpoints
- Open review exchange formats
- Saved views and camera positions
- More precise IFC grid axis extraction where `IfcGrid` geometry/properties are available
- Modular source split for `app.js` into viewer, IFC loading, visibility, clipping, comments, i18n, and panel modules

## Phase 3: Trust and Adoption

- Public sample datasets only when redistribution rights are explicit
- README screenshots and short GIFs using approved public sample data
- GitHub Pages demo using only approved public sample data
- Repeatable browser verification tests
- Japanese deployment guidance for organizations
- Accessibility improvements
- Documentation for public-sector and small-office use
- Dependency update policy that explains when IFC/WebGL runtime versions are intentionally pinned

## Phase 4: Optional Data Adapters

- Adapter interface for converted BIM display data
- Support for non-IFC geometry packages while preserving the same review model
- Optional AI-assisted review adapters outside the trusted local IFC core
- Clear separation between the trusted IFC core and optional adapters
