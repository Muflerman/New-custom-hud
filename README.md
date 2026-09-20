# 🖥️ MU-HUD — Custom FiveM HUD

A clean, modern and lightweight **FiveM HUD** built with **NUI**, designed to provide essential player and vehicle information without cluttering the screen.

![MU-HUD Preview](preview.jpg)

---

## ✨ Features

### 👤 Player HUD

Displays essential player information in a compact and modern interface:

* ❤️ Health
* 🛡️ Armor
* 🧠 Stress
* 🚶 Player status information

### 🚗 Vehicle HUD

When entering a vehicle, the HUD can display:

* ⚡ Current speed
* ⛽ Vehicle information
* 📍 Current street
* 🧭 Direction / location information

### 🎨 Clean NUI Design

MU-HUD uses a custom **NUI interface** designed to be:

* Minimal
* Modern
* Easy to customize
* Lightweight
* Suitable for roleplay servers

The interface is designed to provide useful information while keeping the player's screen as clean as possible.

---

## 📸 Preview

![MU-HUD](preview.jpg)

---

## 📦 Installation

### 1. Download

Download or clone this repository:

```bash
git clone https://github.com/Muflerman/New-custom-hud.git
```

Or download the repository as a ZIP file from GitHub.

### 2. Install the resource

Place the resource inside your FiveM resources folder:

```text
resources/
└── mu-hud/
```

### 3. Start the resource

Add the following line to your `server.cfg`:

```cfg
ensure mu-hud
```

### 4. Restart your server

Restart your FiveM server or start the resource through txAdmin.

---

## ⚙️ Configuration

The main configuration file is:

```text
config.lua
```

You can use this file to customize the HUD according to your server's needs.

> 💡 Make a backup of your configuration before making major changes.

---

## 📁 Resource Structure

```text
mu-hud/
├── client/
├── server/
├── stream/
├── web/
├── config.lua
├── fxmanifest.lua
├── LICENSE
└── README.md
```

---

## 🛠️ Customization

MU-HUD is designed to be easy to modify.

The NUI files are located inside:

```text
web/
```

This allows developers to customize the visual appearance of the HUD, including:

* Layout
* Typography
* Icons
* Colors
* Animations
* HUD positioning
* UI elements

You can modify the frontend and rebuild it according to your own server design.

---

## 🎯 Designed For

MU-HUD is suitable for:

* FiveM Roleplay servers
* QBCore-based servers
* Custom framework servers
* Developers creating their own HUD systems
* Servers looking for a clean alternative to the default GTA V HUD

---

## 📊 Performance

The HUD is designed with performance in mind and uses NUI to render the interface.

The goal is to provide the required player information while keeping unnecessary UI updates to a minimum.

---

## 🤝 Contributing

Contributions are welcome!

If you find a bug, have an improvement, or want to suggest a feature:

1. Open an **Issue**
2. Describe the problem or idea
3. Include relevant screenshots or console errors when possible
4. If you want to contribute code, open a **Pull Request**

---

## 🐛 Issues & Support

If you encounter a problem with MU-HUD, please open an issue on GitHub:

**https://github.com/Muflerman/New-custom-hud/issues**

When reporting a bug, please include:

* FiveM build
* Framework
* Server artifacts version
* Error messages
* Screenshots or videos
* Steps to reproduce the issue

This makes troubleshooting much easier.

---

## 📄 License

This project is licensed under the **MIT License**.

See the [`LICENSE`](LICENSE) file for more information.

---

## 👤 Author

**Muflerman**

FiveM Developer & UI Creator

GitHub:
https://github.com/Muflerman

---

## ⭐ Support the Project

If you find **MU-HUD** useful, consider giving the repository a ⭐ on GitHub.

It helps support the project and encourages future updates.

---

### 💙 MU-HUD

**Simple. Clean. Lightweight. Built for FiveM.**

![d4afe7017af4bf6e9ae5c3ef852dfc48](https://github.com/user-attachments/assets/bbc9bec1-74aa-47dd-8d44-82883daa72dd)
