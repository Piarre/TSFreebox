---
title: Get Started
---

# Get Started

:::danger
TESTER ONLY ON FREEBOX ULTRA
:::

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

Then, you will be asked to authorize the app on the Freebox display.

#### But if you already got a valid app_token you can use it to open a session like this :

```ts{8}
import { Freebox } from "ts-freebox";

const box = new Freebox({
  app_id: "fr.piarre.dev",
  app_name: "test1",
  app_version: "0.2.1",
  device_name: "test1",
  app_token: process.env.FREEBOX_APP_TOKEN, // [!code focus]
});

await box.login();
```
