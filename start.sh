#!/bin/bash
set -e
echo "==================================="
echo " TOOLTRIO - Fresh Start"
echo "==================================="
echo ""
echo "Your Node version: $(node --version)"
echo ""

if [ ! -f ".env.local" ]; then
  cp .env.local.example .env.local
  echo ""
fi

echo " Deleting old platform-specific build..."
rm -rf .next node_modules package-lock.json

echo " Installing packages for your Node version..."
npm install --legacy-peer-deps

echo " Building project..."
npm run build

echo ""
echo "====================================="
echo " Site ready at http://localhost:3000"
echo " Press Ctrl+C to stop"
echo "====================================="
echo ""
npm run start
