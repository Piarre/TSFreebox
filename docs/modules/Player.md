---
title: Player
---

# Player

Permet d'intéragire avec les Freebox Player dans votre réseau local

## [Lister](https://mafreebox.freebox.fr/doc/index.html?v=875e3d530bd643b2bd857397ff6c2984154acf58#list-every-player-devices)

Récupère les Freebox Player sur le réseau

```ts
await box.player.list();
```

:::details Exemple de réponse

```json
{
  "success": true,
  "result": [
    {
      "mac": "70:fc:8f:67:54:7c",
      "stb_type": "stb_v7",
      "id": 17,
      "last_time_reachable": 1715440008,
      "api_available": true,
      "device_name": "Freebox Player",
      "device_model": "fbx7hd-delta",
      "reachable": true,
      "uid": "edfd15f07647a5b813136763356ba683",
      "api_version": "11.1",
      "lan_gids": ["ether-70:fc:8f:67:54:7c"]
    },
    {
      "mac": "8c:97:ea:07:b3:78",
      "stb_type": "stb_v8",
      "last_time_reachable": 1715439928,
      "api_available": false,
      "device_name": "Freebox Player POP",
      "device_model": "fbx8am",
      "reachable": false,
      "lan_gids": ["ether-8c:97:ea:07:b3:78"]
    },
    {
      "mac": "38:07:16:e9:ee:ab",
      "stb_type": "stb_v8",
      "last_time_reachable": 1715437490,
      "api_available": false,
      "device_name": "Player Salon",
      "device_model": "fbx8am",
      "reachable": false,
      "lan_gids": ["ether-38:07:16:e9:ee:ab"]
    }
  ]
}
```

:::

## [Status](https://mafreebox.freebox.fr/doc/index.html?v=875e3d530bd643b2bd857397ff6c2984154acf58#get-player-device-status)

Donne le status d'un Freebox Player par son Id

```ts
await box.player.status(17);
```

:::details Exemple de réponse

```json
{
  "success": true,
  "result": {
    "power_state": "running"
  }
}
```

:::

## [Commande](https://mafreebox.freebox.fr/doc/index.html?v=875e3d530bd643b2bd857397ff6c2984154acf58#control-the-active-media-player-of-a-device)

Envoyer une commande au Freebox Player par son Id

```ts
await box.player.command(17, "next");
```

:::details Exemple de réponse

```json
{
  "success": true
}
```

:::

## [Volume](https://mafreebox.freebox.fr/doc/index.html?v=875e3d530bd643b2bd857397ff6c2984154acf58#control-the-playback-volume-of-the-device)

Envoyer une commande au Freebox Player par son Id

```ts
await box.player.volume(17, {
  volume: 50,
});
```

:::details Exemple de réponse

```json
{
  "success": true,
  "result": {
    "mute": false,
    "volume": 50
  }
}
```

:::

## [Open](https://mafreebox.freebox.fr/doc/index.html?v=875e3d530bd643b2bd857397ff6c2984154acf58#open-a-url-on-a-player-device)

Permet d'ouvrir un URL au Freebox Player par son Id 

```ts
await box.player.open(17, "tv:?channel=1");
```

:::details Exemple de réponse

```json
{
  "success": true
}
```

:::
