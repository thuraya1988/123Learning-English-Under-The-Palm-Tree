# PLAN 2 — GARGANTUA incremental repair & calibration

Source: `/mnt/agents/upload/user_pasted_clipboard_long_content_as_file_Modify the existing.txt`
Target: modify `/mnt/agents/output/gargantua` IN PLACE (no rebuild). Preserve Doppler orientation (EDGE: left bright blue-white), presets, URL API, structure.

## Stage A — Baseline evidence
- Restart static server :8123. Capture BEFORE shots: edge+poster, q=standard, 800×450 (same viewport for after).
- Audit current source vs. spec claims: duplicate `uRotSign`? `console.log('SHOT_OK')`? (report honestly if absent).

## Stage B — shaders.js edits
1. §3 Near-critical refinement: for r < 4.4 RS → two fixed half-substeps (midpoint accel), total advance ≈ baseDt, disk-crossing check per refined segment, capture stays 1.03 RS, uSteps remains outer budget, no global loop doubling.
2. §4 Photon ring strength 0.09 → 0.05 (keep center 1.55, width 4.0, color).
3. §4 starLayer gain 2.0 → 4.0 (keep 4 layers, thresholds, hero stars).
4. §10 stepsUsed = i+1; remove unused `escaped`.

## Stage C — main.js edits
1. §5 resize(): capped DPR = min(deviceDPR, profileCap, sqrt(budget/(w*h))), floor 0.65; budgets STD 1.4M / HIGH 2.4M / CINEMATIC 3.8M px; all targets use same final buffer size; recalc on resize/orientation; no persistence of reduced DPR.
2. §6 Shot mode: remove toDataURL from default path; gate behind `capture=canvas`; RAF scheduled at END of frame(); no console.log.
3. §7 FPS: realDelta (performance.now) vs simDelta=min(realDelta,.1); FPS over ~1s wall window, EMA after real sample, `—` until valid.
4. §8 visibilitychange: hidden → cancel RAF (rafId=0); visible → discard gap, restart only if !rafId && !shotDone && !contextLost && !fatalError; no duplicate loops; cineTime uses simDelta so no jump.
5. §9 contextlost → preventDefault, contextLost=true, cancel RAF, fatal overlay, stop renders; contextrestored → location.reload(); composer.render() wrapped in try/catch → RENDER FAULT overlay once (RETRY / LOWER QUALITY).
6. §10 bloomPass.enabled = halfFloatOK && debug<=2 (recompute on debug apply).
7. §11 Overrides: RESET → clear storage, restore 21 defaults + profile steps, RE-APPLY URL steps/debug into S.overrides, refresh all UI/uniforms/bloom/HUD. Manual slider on overridden key → delete from S.overrides (persists). Quality button click → delete uSteps override, apply profile steps.
8. §12 Flight: on start → cancel cinema, controls.enabled=false; on complete → enable + update. Mid-flight pointerdown/wheel → shared manualTakeover(): cancel flight, keep interpolated pos, enable controls, let gesture proceed. AUTO click during cinema → exit cinema + autoRotate on.
9. §13 Audio: error listeners on both elements → full BLOCKED handling; metadata-safe seek (try/catch + readyState guard); align on intro end (cinema? cineTime%176 : 0); realign on cinema re-enable.
10. §14 Cleanup: duplicate uRotSign (if present), console.logs, obsolete screenshot code, duplicate listeners.

## Stage D — Verification (final source only)
- `node --check js/main.js` / `js/shaders.js`; HTTP 200 for all assets.
- Shot URLs: 4 presets @standard, edge@high, edge@cinematic, edge debug=3/6/9, ?steps=320&debug=6 (+RESET check), invalid q, nocine, ctime=47. Assert SHOT_OK, __SHOT_DONE, no toDataURL in ordinary shot, no console/page errors, no failed requests, no RAF after done.
- AFTER screenshots edge+poster (same 800×450) + cinematic edge beauty.
- Interaction suite: sliders, persistence, RESET ± overrides, quality cycle, HUD/params toggles, audio, keys, takeovers, 390×844.
- Measure drawing-buffer dims + real FPS per quality profile (SwiftShader numbers, labeled as such).

## Stage E — Delivery
- build_version (html, /mnt/agents/output/gargantua). Report: changed files, per-fix explanation, before/after, tested URLs, error results, buffer dims/FPS, limitations.
