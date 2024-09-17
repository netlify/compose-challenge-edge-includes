// Documentation: https://sdk.netlify.com
import { NetlifyExtension } from "@netlify/sdk";

const extension = new NetlifyExtension();

extension.addBuildEventHandler("onSuccess", async () => {
  
  // const site = context.site;
  // site['context'] = context.deploy.context;  
  // await fetch('https://compose-challenge.netlify.app/submission', {
  //   method: 'POST',
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(site)
  // });


});
  
extension.addEdgeFunctions("./src/edge-functions", {
  prefix: "ef_prefix",
});

export { extension };

