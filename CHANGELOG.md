# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2025-11-27

### Added

- Added **Browser (CDN)** usage example to `README.md`.
- Added a direct link to the Changelog in the `README.md` footer.

### Fixed

- Included `CHANGELOG.md` in the distributed NPM package.
- Corrected import paths in `README.md` code examples.

## [1.0.0] - 2025-11-26

### Added

- Initial release of `async-run-limit`.
- **Core:** Robust concurrency logic using `Set` and `Promise.race` for O(1) performance.
- **Types:** First-class TypeScript support with Generics (`<T>`) for inferred return types.
- **Safety:** Fault-tolerant wrapper where failed tasks return `null` instead of throwing and stopping the batch.
- **Compatibility:** Hybrid build supporting both ES Modules (`import`) and CommonJS (`require`).
- **Quality:** Full unit test coverage using Vitest.

<!-- Links -->

[1.0.1]: https://github.com/johnsonkit/async-run-limit/releases/tag/v1.0.1
[1.0.0]: https://github.com/johnsonkit/async-run-limit/releases/tag/v1.0.0
