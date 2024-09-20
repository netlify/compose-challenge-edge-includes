// Documentation: https://sdk.netlify.com
import { NetlifyExtension } from '@netlify/sdk';

const extension = new NetlifyExtension();

extension.addBuildEventHandler('onSuccess', async () => {
  const extensionConfigured = process.env.EDGE_INCLUDE_ENABLED;
  if (!extensionConfigured || extensionConfigured === 'false') {
    return;
  }
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
