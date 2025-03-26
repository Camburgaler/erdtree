# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.11.1] - TBD

### Added

-   Unit testing framework
-   Unit tests for the Armor Page

## [2.11.0] - 2025-03-23

### Added

-   Boss sorting presets for custom sorting

## [2.10.0] - 2025-03-21

### Added

-   Custom sorting method in the armor page

### Changed

-   Updated feature request/bug report links in footer

## [2.9.1] - 2025-02-02

### Fixed

-   Fixed ineffective stat scaling calculation

## [2.9.0] - 2025-02-02

### Added

-   Added about page with changelog

### Changed

-   Updated copyright in the footer

## [2.8.1] - 2025-02-02

### Fixed

-   Fixed error with the weapon damage type check that made the page crash

## [2.8.0] - 2025-01-23

### Added

-   Added weapon ranking

## [2.7.2] - 2025-01-23

### Fixed

-   Fixed armor weight filtering

## [2.7.1] - 2025-01-23

### Fixed

-   Fixed keyboard use on armor page

## [2.7.0] - 2025-01-20

### Added

-   Added hotkeys to quickly ignore any item in the results table

## [2.6.0] - 2025-01-20

### Added

-   Added button to ignore all armor

## [2.5.0] - 2025-01-20

### Added

-   Remember armor page data between sessions

### Fixed

-   Weapon page reset will now disable Consider Status Effects

## [2.4.0] - 2025-01-19

### Added

-   Remember weapon page data between sessions

### Fixed

-   Weapon page stat minimum is now 1 instead of 0

## [2.3.0] - 2024-12-31

### Changed

-   added infusion to title of weapon attack rating hover-over breakdown
-   updated for v1.16

### Removed

-   removed the one-handable option from the weapon page

### Fixed

-   fixed the "Buffable Only" toggle on the weapon page
-   fixed attack rating calculations

## [2.2.1] - 2024-09-15

### Fixed

-   fixed undefined attack ratings creating error logs

## [2.2.0] - 2024-09-15

### Added

-   added hover-over breakdown for weapon attack ratings
-   added ability to disable split damage results
-   added ability to filter damage types
-   added status effects to breakdown
-   added a toggle for considering status effects in rating
-   added link to create an issue in footer

### Changed

-   updated credits in footer
-   updated weapon damage from ER v1.14

## [2.1.0] - 2024-08-27

### Added

-   added ability to ignore armor

### Changed

-   split armor weight, poise, standard absorptions, and elemental absorptions into their own columns
-   optimized knapsack algorithm

## [2.0.0] - 2024-08-18

### Changed

-   refreshed website looks
-   light mode colors fix
-   split armor absorptions and resistances
-   rewrote application with Next.js

### Fixed

-   fixed throwing blades being called backhand blades in UI

## [1.9.1] - 2024-06-06

### Fixed

-   fixed armor weight calculation

## [1.9.0] - 2024-06-04

### Added

-   added data from Shadow of the Erdtree

## [1.8.0] - 2023-02-23

### Added

-   added clickable links to armor optimizer
-   added "none" option locked item in armor optimizer

## [1.7.0] - 2022-06-03

### Added

-   added some borders to tables

### Changed

-   updated footer
-   regulation 1.04.2

### Removed

-   removed build planner
-   removed placeholder filter div

## [1.6.1] - 2022-04-20

### Fixed

-   fixed issue with dmg calculation

## [1.6.0] - 2022-04-19

### Changed

-   updated to patch 1.04, regulation 1.04.1

## [1.5.0] - 2022-04-14

### Changed

-   changed design
-   updated navigation
-   fixed spacing in class optimizer

### Fixed

-   fixed issue on chrome

## [1.4.0] - 2022-04-12

### Changed

-   changed look to make links look like links
-   added alt text to images on planner page

## [1.3.0] - 2022-04-11

### Changed

-   replaced some colors with css standards

## [1.2.0] - 2022-04-10

### Added

-   added favicon and updated sitemap

### Changed

-   updated armor optimizer with some fixes
-   reversed title style
-   improved responsiveness of weapon finder

## [1.1.0] - 2022-04-07

### Added

-   added buffable information
-   updated weapon handedness parameters
-   added reset all button

## [1.0.0] - 2022-04-06

### Added

-   v1 of weapon finder

### Changed

-   updated border style on tables

## [0.6.0] - 2022-04-05

### Added

-   added weapon categories

### Fixed

-   fixed softcap table

## [0.5.1] - 2022-03-29

### Fixed

-   fixed classes

## [0.5.0] 2022-03-28

### Changed

-   updated item sets, added weapons
-   updated descriptions

## [0.4.0] 2022-03-24

### Changed

-   updated armor sorting, it now happens in-browser
-   changed knapsack from sort to select n
-   updated armor page styling
-   center-aligned text in tables

### Removed

-   removed pre computed lists (not needed)

## [0.3.0] 2022-03-21

### Added

-   added an explanation
-   mvp armor optimizer

### Changed

-   split optimizer page results into two

### Fixed

-   fixed page titles
-   fixed ordering
-   fixed display in armor optimizer

## [0.2.0] 2022-03-20

### Added

-   added all helmets with stats
-   added all the data

### Changed

-   hide helms by default
-   highlight buffed virtual stats
-   updated helmets.json
-   sorted helmets alphabetically by id
-   made locked equipment selectable

### Fixed

-   fixed helms and used templates
-   fixed color bug in class optimizer

## [0.1.0] 2022-03-19

### Added

-   added README
-   class optimizer mvp
-   added softcaps to optimizer page
-   added dark theme
-   added ring descriptions

### Changed

-   refactored optimizer to use article

### Fixed

-   fixed light mode input field
-   fixed clear all button
