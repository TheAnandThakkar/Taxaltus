#!/bin/bash
node proxy-8081.js &
exec npx vite --port 5000 --host 0.0.0.0
