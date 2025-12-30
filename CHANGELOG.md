# Stromae DSFR

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.3.4](https://github.com/InseeFr/stromae-dsfr/releases/tag/2.3.4) - 2025-12-30

### Changed

- Browser tab title now dynamically updates based on the questionnaire name for better user orientation.
- Some improvments for Lunatic Suggeter (bump Lunatic to [3.7.6](https://github.com/InseeFr/Lunatic/releases/tag/3.7.6))

## [2.3.3](https://github.com/InseeFr/stromae-dsfr/releases/tag/2.3.3) - 2025-12-15

### Fixed

- Fixed an accessibility issue with layout tables being incorrectly announced by screen readers. (Added `role="presentation"` to presentational tables.)

## [2.3.2](https://github.com/InseeFr/stromae-dsfr/releases/tag/2.3.2) - 2025-12-10

- Updated docker base image

## [2.3.1](https://github.com/InseeFr/stromae-dsfr/releases/tag/2.3.1) - 2025-12-10

### Added

- Added cells data on leaf state update events

### Fixed

- Fixed an issue where collected data wasn't synced properly after going back online from offline mode.
- Fixed an accessibility issue with footer (alt attribute)
- Fixed an accessibility issue with collapse/expand buttons.
- Fixed an issue where user is block because of self cleaning variable

## [2.3.0](https://github.com/InseeFr/stromae-dsfr/releases/tag/2.3.0) - 2025-11-26

### Added

- Added an environment variable to download data in collect mode (enabled in test/review builds, disabled in production).
- In collect and review mode, the `surveyUnitLabel` param in url has been renamed into `surveyUnitCompositeName`.
- In collect and review mode, provide the surveyUnit composite name when downloading the deposit proof.
- Update static page of accessibility

### Fixed

- Fixed authentication by downgrading `oidc-spa` (cross-domain issues) (already done in 2.2.4 but it must be a minor version, not a patch)
- Fixed an issue where aria-hidden stayed true on hover for tooltips.

## [2.2.4](https://github.com/InseeFr/stromae-dsfr/releases/tag/2.2.4) - 2025-11-25

### Fixed

- Fixed an issue with authentication which prevented opening the app from a different domain in the same tab.

## [2.2.3](https://github.com/InseeFr/stromae-dsfr/releases/tag/2.2.3) - 2025-11-14

### Fixed

- Fix a rare issue where thousand separator does not exist in user locale which made input number crash.

## [2.2.2](https://github.com/InseeFr/stromae-dsfr/releases/tag/2.2.2) - 2025-11-06

## [2.2.1](https://github.com/InseeFr/stromae-dsfr/releases/tag/2.2.1) - 2025-11-04

## [2.2.0](https://github.com/InseeFr/stromae-dsfr/releases/tag/2.2.0) - 2025-11-04

## [2.1.3](https://github.com/InseeFr/stromae-dsfr/releases/tag/2.1.3) - 2025-10-23

### Fixed

- Fixed a typo.

## [2.1.2](https://github.com/InseeFr/stromae-dsfr/releases/tag/2.1.2) - 2025-10-14

### Build

- Updated Docker base image.

## [2.1.1](https://github.com/InseeFr/stromae-dsfr/releases/tag/2.1.1) - 2025-10-09

### Fixed

- Block questionnaire validation when api call has failed.

## [2.1.0](https://github.com/InseeFr/stromae-dsfr/releases/tag/2.1.0) - 2025-09-22

### Fixed

- Fixed an issue on multimode.

## [2.0.0](https://github.com/InseeFr/stromae-dsfr/releases/tag/2.0.0) - 2025-09-18

### Added

- Multimode and articulation.
- Allow to download articulation in visualization.

### Changed

- Display survey unit label in header.

### Fixed

- Use base64 encoded query params for collect & review pages.

## [1.6.1](https://github.com/InseeFr/stromae-dsfr/releases/tag/1.6.1) - 2025-09-05

## [1.6.0](https://github.com/InseeFr/stromae-dsfr/releases/tag/1.6.0) - 2025-09-02

### Changed

- INSEE logo has been updated.

## [1.5.2](https://github.com/InseeFr/stromae-dsfr/releases/tag/1.5.2) - 2025-08-25

### Fixed

- Textarea handle readonly attribute.

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
