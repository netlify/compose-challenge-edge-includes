// Documentation: https://sdk.netlify.com
import { NetlifyExtension } from '@netlify/sdk';

const extension = new NetlifyExtension();

extension.addBuildEventHandler('onSuccess', async ({constants}) => {
  const extensionConfigured = process.env.EDGE_INCLUDE_ENABLED;
  if (!extensionConfigured || extensionConfigured === 'false') {
    return;
  }

  // If the site has been deployed, we'll send the score to the leaderboard
  if (constants.IS_LOCAL) {
    console.log("Local build. We'll only tell the leaderboard if it's deployed.");
    return;
  }
  await fetch('https://compose-challenge.netlify.app/submission', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "url": process.env.URL,
      "score": 1000,
      "excluded": false
    })
  });
});

extension.addEdgeFunctions('./src/edge-functions', {
  prefix: 'edge_includes',
  shouldInjectFunction: () => {
    const extensionConfigured = process.env.EDGE_INCLUDE_ENABLED;
    if (extensionConfigured) {
      return true;
    }
    return false;
  },
});

export { extension };
