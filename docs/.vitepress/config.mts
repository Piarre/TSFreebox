import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "TS Freebox",
  description: "A TypeScript library to interact with your freebox.",
  cleanUrls: true,
  lang: "en-US",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
      {
        text: "Get Started",
        link: "/get-started",
      },
    ],

    sidebar: [
      {
        text: "API",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          {
            text: "Get Started",
            link: "/get-started",
          },
          {
            text: "Modules",
            items: [
              {
                text: "Types",
                link: "/types",
              },
              {
                text: "LAN",
                link: "/modules/LAN",
              },
            ],
          },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/vuejs/vitepress" }],
  },
});
