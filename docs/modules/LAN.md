---
title: LAN
---

# LAN

## Get the current [LanConfig](https://mafreebox.freebox.fr/doc/index.html#LanConfig)

[Documentation](https://mafreebox.freebox.fr/doc/index.html#get-the-current-lan-configuration)

```ts
await box.LAN.config();
```

## Update the current [LanConfig](https://mafreebox.freebox.fr/doc/index.html#LanConfig)

[Documentation](https://mafreebox.freebox.fr/doc/index.html#update-the-current-lan-configuration)

```ts
await box.LAN.update({
  mode: "bridge",
});
```

## Get all browsable LAN interface

```ts
await box.LAN.interfaces();
```

## Get all hosts on a given interfaces

```ts
await box.LAN.hosts();
```

## Get an host information

```ts
await box.LAN.host();
```

## Update an host information

```ts
await box.LAN.updateHost("pub", "ether-00:24:d4:7e:00:4c", {
  id: "ether-00:24:d4:7e:00:4c",
  primary_name: "Freebox Player de r0ro",
});
```
