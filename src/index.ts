// Documentation: https://sdk.netlify.com
import { NetlifyExtension } from "@netlify/sdk";

const extension = new NetlifyExtension();

extension.addBuildEventHandler("onPreBuild", () => {
  console.log("Hello there.");
});
  
extension.addEdgeFunctions("./src/edge-functions", {
  prefix: "ef_prefix",
});

export { extension };

