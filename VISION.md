# Democratizing BIM Viewers

## Purpose

The purpose of this project is to make BIM data accessible beyond BIM specialists.

For BIM to become part of everyday project delivery, owners, public-sector reviewers, local governments, approval bodies, facility managers, educators, small businesses, and individual offices must be able to inspect the same data safely, comment on individual elements, and build shared understanding.

IFC Review Viewer provides a transparent open-source entry point for viewing and reviewing IFC files.

## Principles

- Treat IFC as a first-class public format
- View and review data in the browser without uploading it to external services
- Exchange comments and review results as JSON
- Avoid dependence on a specific vendor or cloud platform
- Publish source code and build steps so behavior can be verified
- Keep future extensions from weakening the safety and simplicity of the core viewer

## Social Goal

The first goal is to publish a practical IFC viewer and demonstrate that BIM data can be inspected safely by a broad audience.

In the future, the same review experience can be extended beyond IFC to display-oriented data converted from BIM authoring tools. This would allow more stakeholders to inspect and review BIM data produced in existing workflows.

If this approach spreads, national and local governments, public organizations, companies, and small practices will have a safer foundation for receiving, checking, and using BIM data.

## Safety Approach

Safety does not come from declaring that a tool is safe. It comes from making the tool verifiable.

This project emphasizes:

- Processing local files in the browser
- Avoiding unnecessary network communication
- Saving review data in readable JSON
- Documenting dependencies and licenses
- Keeping change history, review, and verification steps open

## Extension Approach

Future extensions should remain separate from the core viewer.

The core viewer protects the minimum trusted workflow: IFC display, element selection, property display, and comment recording. Additional converted-data display, review formats, and integration features should be handled as adapters or optional capabilities.

This structure lets users choose only the functions they need and makes adoption easier for public bodies, organizations, and companies.
