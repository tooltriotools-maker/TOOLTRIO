======================================================
  TOOLTRIO - HOW TO RUN
======================================================

WINDOWS:
  Double-click START_HERE.bat
  (Do NOT run npm install or npm run dev manually)

MAC/LINUX:
  bash start.sh

REQUIREMENTS:
  - Node.js v18 or higher (nodejs.org)
  - Internet connection for first install

WHY YOU MUST USE START_HERE.bat:
  The .next build folder is platform-specific.
  If you copy it from another machine or download
  a pre-built version, it WILL crash with:
  "Cannot read properties of undefined (reading 'call')"
  
  START_HERE.bat deletes the old build and creates
  a fresh one for YOUR machine automatically.

======================================================
