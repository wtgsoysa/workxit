# Export verification

Checks run on 14 October 2026 against the exported files:

- All 19 tracked source files match the canonical checkout byte for byte.
- The main-branch Git bundle verifies and includes the complete nine-commit history.
- JavaScript syntax checks passed for the application, connections, scheduling module, configuration and scheduling helpers.
- Service experience checks passed: three services, nine detail views, close/reopen, Escape, focus restoration, associated steps, four modal close controls and three project outlines.
- Project showcase checks passed: three screen selections, wraparound arrows, keyboard navigation, full-view image and link mappings, and meeting handoff.
- Scheduling helper checks passed: timezone conversion, summer/winter offsets, invalid/nonexistent local dates and times, contact validation, and tentative calendar export with the correct 30-minute duration.
- A limited scan of tracked text source across the Git history found no private-key, GitHub-token or AWS-access-key patterns. This is not a comprehensive security audit.

These are code-level checks. The service/project tests use DOM stubs, not a rendered browser. Visual alignment, device layout and real browser behavior still require manual review. No live booking service exists or was tested. External project destinations were not network-validated as part of this export.

The final packaging process checks ZIP integrity, the deployable ZIP's root index.html and every packaged file against MANIFEST.sha256.
