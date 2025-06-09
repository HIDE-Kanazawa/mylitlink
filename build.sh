#!/bin/bash

# Create docs directory if it doesn't exist
mkdir -p ./docs

# Copy HTML, CSS and JS files
cp ./index.html ./style.css ./docs/
# JavaScript is not needed anymore since URL copy functionality was removed
# cp ./script.js ./docs/

# Copy the new avatar image
cp ./assets/my.png ./docs/my.png

# Copy other necessary assets (like background pattern)
cp -r ./assets/icons ./docs/assets/
cp ./assets/kanazawa_gold_texture.svg ./docs/assets/

echo "Build complete! Files copied to ./docs directory."
