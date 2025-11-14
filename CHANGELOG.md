# Stromae DSFR

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Added an environment variable to download data in collect mode (enabled in test/review builds, disabled in production).

## [1.5.1](https://github.com/InseeFr/stromae-dsfr/releases/tag/1.5.1) - 2025-08-18

### Changed

- Tooltip design in question labels has been improved to be more readable.

### Fixed

- Fixed some issues with loops.

## [1.5.0](https://github.com/InseeFr/stromae-dsfr/releases/tag/1.5.0) - 2025-07-23

### Changed

- API now use interrogation id instead of survey unit id.
- Put idInterrogation in event paradata instead of idSU.

### Fixed

- Fixed some issues on roundabout and loops.
- Improved performance.

## [1.4.7](https://github.com/InseeFr/stromae-dsfr/releases/tag/1.4.7) - 2025-07-04

### Changed

- When readonly, text inputs, number inputs and suggesters are displayed as a simple text so that their readonly status is clearer to the respondents.
- Added a data-testid to modal buttons to allow E2E health check test not to rely on button class names.

### Fixed

- Fixed some issues on roundabout and loop controls.
- Removed a few forgotten developpment logs.

## [1.4.6](https://github.com/InseeFr/stromae-dsfr/releases/tag/1.4.6) - 2025-06-23

### Changed

- Improved Lunatic performance.
- When a modality that ask for clarification is checked, automatically put a focus on the related input.
- Improved pairwise questions display.
- In visualization, data download now includes calculated variables.

## [1.4.5](https://github.com/InseeFr/stromae-dsfr/releases/tag/1.4.5) - 2025-06-12

### Changed

- Improved Lunatic performance.

### Fixed

- Do not ask for pairwise connection for individuals who do not have been filled in.

## [1.4.4](https://github.com/InseeFr/stromae-dsfr/releases/tag/1.4.4) - 2025-06-11

### Changed

- On leaving the app, the user is redirect to the portal instead of being logged out.

### Fixed

- Correctly compute pairwise data.
- Correctly display max length in clarification inputs.
- Do not redirect the user on header and footer click.
- Do not calculate variables that are flagged to be ignored by Lunatic.

## [1.4.3](https://github.com/InseeFr/stromae-dsfr/releases/tag/1.4.3) - 2025-05-28

### Changed

- Do not update the survey state as long as no data has been filled yet.

### Fixed

- Correctly handle suggesters that are readonly.
