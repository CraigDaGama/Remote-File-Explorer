# 🗂️ Remote File Explorer — Windows-Style Web UI

> 📡 Access your old laptop’s files from any device on your network using a full-fledged, Windows-style file explorer built with **React + Flask**.

---

## 🎯 Motivation

I built this project because I am lazy.

My **old laptop’s screen is broken**, and connecting it to a TV every time I need to access data is a huge pain. Sometimes I just want to quickly grab a document, view images, or dump files from my phone.

Now, this project turns my old laptop into a **headless file server**, with:

* A familiar **Windows Explorer-like UI**
* Access from **any device** (phone, PC, tablet) on the **same Wi-Fi**
* Zero reliance on cloud or third-party apps
* Ability to turn the laptop into **permanent LAN storage**

---

## 🛠️ Features

* ✅ **Windows Explorer UI clone** (folders, previews, icons)
* 🖼 **Image preview thumbnails**
* 🧾 **Custom icons** for PDFs, DOCX, MP3, etc.
* 🧭 **Breadcrumbs** navigation
* 📁 Access common folders: **Documents**, **Downloads**, **Pictures**, **Music**
* 💻 Works from **any device on LAN** — just use the IP
* 🧱 Built with **React (Vite)** + **Python Flask**
* 🧰 Uses symbolic links to share folders one-by-one

---

## 📸 Demo
![](preview.png)![screenshot](<Screenshot (42).png>)
---

## 🧩 Tech Stack

* **Frontend**: React + Vite + Axios
* **Backend**: Flask (Python)
* **File Sharing**: Symbolic links + OS folders
* **Access**: Local network (Wi-Fi)

---

## ⚙️ How to Set Up

### 🖥 1. Set a Static IP for Your File Server Laptop

To avoid your server IP changing every time:

1. Open Command Prompt:

   ```bash
   ipconfig
   ```

   Note down your `IPv4 Address`, e.g. `192.168.31.191`.

2. Open your Wi-Fi router settings (typically `192.168.0.1` or `192.168.1.1` in a browser).

3. Look for **DHCP > Static IP** or **MAC Binding**.

4. Bind your laptop’s MAC address to the noted IP (`192.168.31.191`).

---

### 📂 2. Share Folders via Symbolic Links

Instead of exposing your whole `C:/` drive, you can selectively link folders to a shared folder:

```bash
mkdir C:\WebShared
mklink /D C:\WebShared\Documents   C:\Users\YourUser\Documents
mklink /D C:\WebShared\Downloads   C:\Users\YourUser\Downloads
mklink /D C:\WebShared\Pictures    C:\Users\YourUser\Pictures
mklink /D C:\WebShared\Music       C:\Users\YourUser\Music
```

Now everything inside `C:\WebShared` is what Flask will expose.

---

### 🐍 3. Run Flask Backend

Install Flask and Flask-CORS:

```bash
pip install flask flask-cors
```

`app.py`:

```python
from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

BASE_DIR = "C:/WebShared"

@app.route('/api/')
@app.route('/api/<path:subpath>')
def list_dir(subpath=''):
    full_path = os.path.join(BASE_DIR, subpath)
    if os.path.isdir(full_path):
        items = os.listdir(full_path)
        result = []
        for item in items:
            result.append({
                'name': item,
                'is_dir': os.path.isdir(os.path.join(full_path, item)),
                'path': os.path.join(subpath, item).replace("\\", "/")
            })
        return jsonify(result)
    else:
        return send_from_directory(os.path.dirname(full_path), os.path.basename(full_path), as_attachment=True)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

Run it:

```bash
python app.py
```

---

### ⚛️ 4. Set Up React Frontend

#### Clone this repo and install dependencies:

```bash
npm install
```

#### In `vite.config.js`, bind to 0.0.0.0:

```js
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173
  },
  plugins: [react()],
});
```

#### In `src/api.js`, use your server’s static IP:

```js
import axios from 'axios';
export default axios.create({
  baseURL: 'http://192.168.31.191:5000'
});
```

#### Start frontend:

```bash
npm run dev
```

Now from any device on the same Wi-Fi, go to:

```
http://192.168.31.191:5173
```

---

## 🎨 Icons & Image Preview

* Icons stored in: `public/icons/`

  * e.g., `/icons/pdf.png`, `/icons/folder.png`, etc.
* Images (jpg/png) use real previews.
* File cards show label + icon.
* Responsive layout with hover animations.

---

## 🚀 Use Cases

* Turn your **broken-screen laptop into a NAS**
* Access important files remotely
* Upload and download files between devices
* Repurpose old hardware with no screen

---

## 🛡️ Security Notice

This is intended for use on **local/private networks only**.

If you want to expose it online:

* Use **Cloudflare Tunnel**, **Ngrok**, or set up **HTTPS + Auth**
* DO NOT expose it to public internet without proper protections

---
