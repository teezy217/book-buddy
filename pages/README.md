# 📚 Book Buddy

> Summaries for people who hate reading (no judgment 😅)

---

## 🚀 How to Deploy to Vercel (Step-by-Step)

### Step 1 — Get Your Anthropic API Key
1. Go to https://console.anthropic.com
2. Sign up or log in
3. Click **"API Keys"** in the left menu
4. Click **"Create Key"** and copy it somewhere safe (like a notes app)

---

### Step 2 — Put This Project on GitHub
1. Go to https://github.com and create a free account
2. Click the **green "New"** button (top left)
3. Name it `book-buddy`, leave everything else as default, click **"Create repository"**
4. On the next page, click **"uploading an existing file"**
5. Drag and drop ALL the files from this zip into the uploader
6. Click **"Commit changes"**

---

### Step 3 — Deploy on Vercel
1. Go to https://vercel.com and click **"Sign Up"**
2. Choose **"Continue with GitHub"** — this connects the two
3. Click **"Add New Project"**
4. Find `book-buddy` in the list and click **"Import"**
5. Don't change anything — just click **"Deploy"**
6. Wait about 60 seconds ⏳
7. 🎉 You'll get a live link like `book-buddy.vercel.app`

---

### Step 4 — Add Your API Key (IMPORTANT!)
Without this step, the AI won't work.

1. In Vercel, click on your `book-buddy` project
2. Click **"Settings"** (top menu)
3. Click **"Environment Variables"** (left menu)
4. Fill in:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** paste your key from Step 1
5. Click **"Save"**
6. Go to **"Deployments"** tab and click **"Redeploy"** on the latest one

---

### ✅ You're Live!
Share your link with anyone. The app is free for them to use — you only pay Anthropic for API usage (very cheap, roughly $0.01 per summary).

---

## 💡 Tips
- **PDF uploads** work best with text-based PDFs (not scanned images)
- If a PDF doesn't work, try copying and pasting the text instead
- You can customize the app name and colors in `pages/index.js`

---

## 🆘 Need Help?
If anything goes wrong, take a screenshot and ask Claude at claude.ai — paste the error message and it'll walk you through the fix!
