---
title: Get Started
---

# Get Started

:::danger
Tester seulement sur Freebox Ultra en utilisant la v11 de l'API
:::

Pour commencer, il faut déclarer un nouvel object `Freebox` :

```ts
import { Freebox } from "ts-freebox";

const box = new Freebox({
  app_id: "fr.piarre.dev",
  app_name: "test1",
  app_version: "0.2.1",
  device_name: "test1",
});

await box.login();
```

Au lancement du programe, vous devez acceptez depuis votre Freebox la requête depuis l'écran de votre Freebox

Si vous avez déjà un `app_token` vous pouvez vous connecter de cette manière

```ts{8-9}
import { Freebox } from "ts-freebox";

const box = new Freebox({
  app_id: "fr.piarre.dev",
  app_name: "test1",
  app_version: "0.2.1",
  device_name: "test1",
  app_token: process.env.FREEBOX_APP_TOKEN, // [!code focus]
  debug: true, // [!code focus]
});

await box.login();
```

:::tip
Pour le mode debug il sufit de passer `debug: true` au moment de déclarer votre objet.
:::
