---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "TS-Freebox"
  tagline: "Une librarie TypeScript pour intéragire avec votre freebox"
  actions:
    - theme: brand
      text: Commencer
      link: /get-started
    - theme: alt
      text: Exemples
      link: /api-examples
  image:
    src: ./free-logo.svg

features:
  - icon: 👠
    title: Bien typée
    details: La meilleur librarie TypeScript pour freebox
  - icon: 📦
    title: Facile d'utilisation
    details: 
  - icon: 🧑‍💻
    title: Open Source
    details: 
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #FC6766 30%, #FC231C);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #FC6766 60%, #FC231C 10%);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>
