# ReaFlex Release 3.5

ReaFlex is a note-based vocal pitch and formant editor for REAPER. The Lua script provides source analysis and the editor; the paired JSFX provides the real-time resynthesis engine.

## Requirements

- REAPER
- ReaImGui, installed through ReaPack

## Installation

1. In REAPER, choose **Options > Show REAPER resource path in explorer/finder**.
2. Copy `ReaFlex_Resynth_Release_3-5.jsfx` to `Effects/ReaFlex/` inside that resource path. Create the `ReaFlex` folder if it does not exist.
3. Copy `ReaFlex_Release_3-5.lua` to `Scripts/ReaFlex/`.
4. Open **Actions > Show action list**.
5. Choose **New action > Load ReaScript**, select `ReaFlex_Release_3-5.lua`, and add it.
6. Run ReaFlex from the Action List. A keyboard shortcut or toolbar button can be assigned if desired.

When replacing an earlier ReaFlex 3.5 development build, replace both the Lua and JSFX and restart/reload ReaFlex.

## Setup and basic use

1. Place a dry vocal recording on a REAPER track and select the audio item/take.
2. Run **ReaFlex Release 3.5**.
3. Click **Analyse** to create the note and pitch analysis for the selected take.
4. Inspect the detected notes. Drag notes or use the tuning/key controls to change pitch.
5. Refine note boundaries and transitions where needed. ReaFlex supports splitting, merging, glides, and per-note pitch-shape editing.
6. Play the project normally to hear the resynthesized result. ReaFlex manages its paired take JSFX automatically; do not manually add multiple ReaFlex Resynth instances.
7. Use **Render Take** when you want to create audio from the current edits.

Analysis and editing state are stored with the REAPER project.

## Editor shortcuts

- **Glide Tool:** `G`
- **Smooth Tool:** `H`
- **Delete note:** Ctrl-click
- **Split note:** double-click a note edge
- **Merge notes:** Alt-click
- **Escape:** clear selection or leave the active tool

The Advanced interface contains additional resynthesis and diagnostic controls. **Reset to Defaults** restores the Release 3.5 parameter baseline.

## Troubleshooting

If ReaFlex reports that ReaImGui is unavailable, install or update ReaImGui through ReaPack and restart REAPER.

If the resynth cannot be found, confirm that `ReaFlex_Resynth_Release_3-5.jsfx` is inside the active REAPER resource path under `Effects/ReaFlex/`, then restart REAPER or rescan effects.

If an older ReaFlex Resynth is already present on a take, Release 3.5 is designed to recognize and reuse the managed ReaFlex engine rather than continually adding new instances.

## License

ReaFlex is distributed under the GNU General Public License version 3. See `LICENSE` for the complete license text.

Author: Brodric Wellington (amicodingwell)
