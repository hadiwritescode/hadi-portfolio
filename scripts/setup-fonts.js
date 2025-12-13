const fs = require('fs').promises;
const path = require('path');
const https = require('https');
const { pipeline } = require('stream/promises');

// Using Google Fonts CDN for all fonts
const fonts = [
  // IBM Plex Sans
  {
    name: 'IBMPlexSans-Regular.woff2',
    url: 'https://fonts.gstatic.com/s/ibmplexsans/v19/zYXgKVElMYYaJe8bpLHnCwDKhdHeFQ.woff2'
  },
  {
    name: 'IBMPlexSans-Medium.woff2',
    url: 'https://fonts.gstatic.com/s/ibmplexsans/v19/zYX9KVElMYYaJe8bpLHnCwDKjR7_AI9sdP3pBms.woff2'
  },
  {
    name: 'IBMPlexSans-SemiBold.woff2',
    url: 'https://fonts.gstatic.com/s/ibmplexsans/v19/zYX9KVElMYYaJe8bpLHnCwDKjQ7_AI9sdP3pBms.woff2'
  },
  {
    name: 'IBMPlexSans-Bold.woff2',
    url: 'https://fonts.gstatic.com/s/ibmplexsans/v19/zYX9KVElMYYaJe8bpLHnCwDKjWr7AI9sdP3pBms.woff2'
  },
  // IBM Plex Mono
  {
    name: 'IBMPlexMono-Regular.woff2',
    url: 'https://fonts.gstatic.com/s/ibmplexmono/v19/-F6pfjptAgt5VM-kVkqdyU8n1i8q0Q.woff2'
  },
  {
    name: 'IBMPlexMono-Medium.woff2',
    url: 'https://fonts.gstatic.com/s/ibmplexmono/v19/-F6sfjptAgt5VM-kVkqdyU8n3vAOwl1FgsAXHNlYzg.woff2'
  },
  // Bebas Neue
  {
    name: 'BebasNeue-Regular.woff2',
    url: 'https://fonts.gstatic.com/s/bebasneue/v14/JTUSjIg69CK48gW7PXooxW0.woff2'
  }
];

async function downloadFont(url, filePath) {
  console.log(`Downloading ${url} to ${filePath}`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download ${url}: ${response.statusText}`);
  }
  const arrayBuffer = await response.arrayBuffer();
  await fs.writeFile(filePath, Buffer.from(arrayBuffer));
  console.log(`Downloaded ${filePath}`);
}

async function setupFonts() {
  const fontsDir = path.join(process.cwd(), 'public', 'fonts');
  
  try {
    // Create fonts directory if it doesn't exist
    await fs.mkdir(fontsDir, { recursive: true });
    console.log(`Created directory: ${fontsDir}`);
    
    // Download IBM Plex fonts
    for (const font of fonts) {
      const filePath = path.join(fontsDir, font.name);
      await downloadFont(font.url, filePath);
    }
    
    // Bebas Neue is now included in the fonts array
    
    console.log('\n✅ All fonts downloaded successfully!');
    console.log('You can now run the build command: npm run build\n');
    
  } catch (error) {
    console.error('Error setting up fonts:', error);
    process.exit(1);
  }
}

// Run the setup
setupFonts();
