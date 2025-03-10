# 📦 TS-Freebox

A TypeScript library to interact with your Freebox. This package provides a clean, type-safe API to control and monitor your Freebox device.

> ⚠️ Tested with Freebox Ultra using API v11

## 📋 Features

- 🔐 Authentication with the Freebox API
- 📡 WiFi management (configuration, status, access points)
- 🔌 LAN management (configuration, hosts, interfaces)
- 🌐 Connection management
- 📺 Player control
- 🔄 Port forwarding

## 🚀 Installation

```bash
bun install ts-freebox
```

## 🏁 Getting Started

### Basic Usage

```typescript
import { Freebox } from "ts-freebox";

// Create a new Freebox instance
const box = new Freebox({
  app_id: "fr.example.app",
  app_name: "My Freebox App",
  app_version: "1.0.0",
  device_name: "My Device",
});

// Login to your Freebox
// This will prompt you to accept the request on your Freebox device
await box.login();

// Now you can use the API
const wifiConfig = await box.wifi.config();
console.log(wifiConfig);
```

### Using an Existing App Token

If you already have an app token, you can use it to authenticate without requiring manual approval:

```typescript
const box = new Freebox({
  app_id: "fr.example.app",
  app_name: "My Freebox App",
  app_version: "1.0.0",
  device_name: "My Device",
  app_token: process.env.FREEBOX_APP_TOKEN,
  debug: true, // Enable debug logging
});

await box.login();
```

## 📚 Documentation

For full documentation and examples, please visit our [documentation site](https://yourprojectname.github.io/ts-freebox/).

## 📝 License

This project is licensed under the BSD-3-Clause License - see the [LICENSE.md](LICENSE.md) file for details.

## ⚠️ Disclaimer

This project is not affiliated with Free SAS in any way.
