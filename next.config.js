const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  images: {
    domains: ["kap-staging.us"],
  },
  env: {
    WP_HEADLESS_SECRET: "adb05f33-6f44-4433-9e79-9f995018b28a",
    WORDPRESS_GRAPHQL_ENDPOINT: "https://kap-staging.us/graphql",
    WORDPRESS_URL: "https://kap-staging.us/",
    MAPBOX_TOKEN:
      "pk.eyJ1Ijoia2FwaXR1cyIsImEiOiJjanR5and6MjYwMXltNDN0MWxnNTFoMGxpIn0.rbpYqdyv1o5OzsDLva85Sg",
  },
};

module.exports = withBundleAnalyzer(nextConfig);
