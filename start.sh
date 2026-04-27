#!/bin/bash
echo "=== TOOLTRIO Setup ==="

# Clear cache
rm -rf .next
echo "✓ Cleared .next cache"

# Install if needed
if [ ! -d "node_modules" ]; then
  npm install
fi

echo "✓ Starting server at http://localhost:3000"
npm run dev
