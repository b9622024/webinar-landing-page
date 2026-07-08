# AI 健康副業 Webinar Landing Page

這是一個可部署到 Vercel 的 Next.js Landing Page 專案，主轉換目標是讓 Meta 廣告進站的陌生訪客選擇免費 Webinar 觀看時間。

## 本地執行

```bash
npm install
npm run dev
```

打開 `http://localhost:3000`。

如果本機 npm cache 有權限問題，可改用 `npm install --cache ./work/.npm-cache`。

## 環境變數

請複製 `.env.example` 成 `.env.local`，並填入：

```bash
NEXT_PUBLIC_WEBINAR_URL=
NEXT_PUBLIC_LINE_URL=
NEXT_PUBLIC_META_PIXEL_ID=
```

Vercel 部署時，請在 Project Settings -> Environment Variables 加入同樣三個變數。

## Meta Pixel

Pixel ID 由 `NEXT_PUBLIC_META_PIXEL_ID` 讀取。未設定時不會載入 Pixel，也不會報錯。

事件列表：

- 頁面載入：`PageView`
- 點擊任何主要 Webinar CTA：`WebinarCTA`
- 點擊選擇觀看時間：`ViewContent`
- 點擊 LINE：`ClickLine`
- 點擊一對一適性評估：`Lead`

測試方式：

1. 在 Vercel 或本機設定 `NEXT_PUBLIC_META_PIXEL_ID`
2. 開啟網站頁面
3. 使用 Chrome 的 Meta Pixel Helper 擴充功能
4. 確認載入頁面時出現 `PageView`
5. 逐一點擊 CTA，確認對應事件有被送出

## 圖片

正式圖片請放在 `public/images/`：

- `chongming.png`：主講人照片
- `og-webinar.png`：社群分享圖
- `partner-story-1.png`
- `partner-story-2.png`
- `partner-result-1.png`
- `partner-result-2.png`

目前頁面已提供漂亮的 CSS placeholder，圖片尚未放入也不會影響 build。

## 主要架構

- `app/`：Next.js App Router 頁面、SEO metadata、全域樣式
- `components/`：可重複使用元件與 Meta Pixel script
- `data/content.ts`：主要文案資料
- `lib/metaPixel.ts`：Meta Pixel 追蹤工具
- `public/images/`：未來放正式圖片

## Vercel 部署

1. 將專案推到 GitHub
2. 在 Vercel 新增 Project 並選擇此 repository
3. Framework Preset 選 Next.js
4. 設定環境變數
5. Deploy

建議部署後再用 Meta Pixel Helper 測試一次所有 CTA 事件。
