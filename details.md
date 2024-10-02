This extension was created for the Netlify Compose 2024 Code Challenge.

## Add this extension to join the Compose Code Challenge

By adding this extension to your site, you'll be able to use edge includes and participate in the [Netlify Compose](https://netlify.com/compose) Code Challenge.

## Join the Compose Code Challenge

To join the Compose Code Challenge, visit [ntl.fyi/challenge](https://ntl.fyi/challenge) to deploy your site and submit your entry.

After deploying your site, install this extension on your team, and enable it in your new site under **Site configuration** for your new site.

## Usage

This will allow you to use edge includes in your site, pulling content into your pages from remote URLs on request like this:

```html
<!--
 This custom element will be replaced by the content returned from the href.
-->
<netlify-edge-include href="https://example.com/some-html">
</netlify-edge-include>
```

_⚠️ Note: This extension is not intended for production use beyond the scope of the Compose Code Challenge._
