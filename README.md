# Telegram API Proxy

یک پروکسی ساده برای دسترسی به API تلگرام که روی سرویس‌های Edge Computing (مانند Arvan Cloud یا Cloudflare Workers) اجرا می‌شود.

## 📋 فهرست مطالب

- [معرفی](#معرفی)
- [نصب و راه‌اندازی](#نصب-و-راه‌اندازی)
- [استفاده](#استفاده)
- [مثال‌های کاربردی](#مثال‌های-کاربردی)
- [نکات مهم](#نکات-مهم)

## 🎯 معرفی

این پروژه یک پروکسی ساده است که درخواست‌های شما را به API رسمی تلگرام (`api.telegram.org`) هدایت می‌کند. این کار به شما امکان می‌دهد:

- از فیلترینگ تلگرام در ایران عبور کنید
- درخواست‌های ربات خود را از طریق یک دامنه سفارشی ارسال کنید
- از مزایای Edge Computing برای کاهش تاخیر استفاده کنید
- از همه مهمتر اینکه تقریبا رایگانه :)

## 🚀 نصب و راه‌اندازی

### مرحله 1: آپلود فایل

1. فایل `telegram-proxy.js` را در پلتفرم Arvan Cloud یا Cloudflare Workers آپلود کنید
2. پروژه را Deploy کنید

### مرحله 2: دریافت لینک

بعد از Deploy موفق، Arvan Cloud یک لینک به شما می‌دهد که شبیه به این است:

```
https://your-project-name.your-subdomain.arvanedge.ir
```

یا اگر از Cloudflare Workers استفاده می‌کنید:

```
https://your-project-name.your-subdomain.workers.dev
```

### مرحله 3: استفاده از لینک

حالا می‌توانید از این لینک به عنوان پایه URL برای API تلگرام استفاده کنید.

## 💡 استفاده

### روش کلی

به جای استفاده مستقیم از `https://api.telegram.org/bot<TOKEN>/...`، از لینک پروکسی خود استفاده کنید:

```
https://your-project-name.your-subdomain.arvanedge.ir/bot<TOKEN>/...
```

### مثال‌های عملی

#### 1. ارسال پیام با استفاده از curl

```bash
curl -X POST "https://your-project-name.your-subdomain.arvanedge.ir/botYOUR_BOT_TOKEN/sendMessage" \
  -H "Content-Type: application/json" \
  -d '{
    "chat_id": "YOUR_CHAT_ID",
    "text": "سلام! این پیام از طریق پروکسی ارسال شده است."
  }'
```

#### 2. استفاده در کد Python

```python
import requests

# لینک پروکسی شما
PROXY_URL = "https://your-project-name.your-subdomain.arvanedge.ir"
BOT_TOKEN = "YOUR_BOT_TOKEN"

# ارسال پیام
response = requests.post(
    f"{PROXY_URL}/bot{BOT_TOKEN}/sendMessage",
    json={
        "chat_id": "YOUR_CHAT_ID",
        "text": "سلام از Python!"
    }
)

print(response.json())
```

#### 3. استفاده در کد JavaScript/Node.js

```javascript
const axios = require('axios');

const PROXY_URL = 'https://your-project-name.your-subdomain.arvanedge.ir';
const BOT_TOKEN = 'YOUR_BOT_TOKEN';

// ارسال پیام
axios.post(`${PROXY_URL}/bot${BOT_TOKEN}/sendMessage`, {
  chat_id: 'YOUR_CHAT_ID',
  text: 'سلام از Node.js!'
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error('خطا:', error);
});
```

#### 4. استفاده در کد PHP

```php
<?php
$proxyUrl = 'https://your-project-name.your-subdomain.arvanedge.ir';
$botToken = 'YOUR_BOT_TOKEN';
$chatId = 'YOUR_CHAT_ID';

$url = $proxyUrl . '/bot' . $botToken . '/sendMessage';

$data = [
    'chat_id' => $chatId,
    'text' => 'سلام از PHP!'
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
curl_close($ch);

echo $response;
?>
```

## 📚 مثال‌های کاربردی

### دریافت اطلاعات ربات

```bash
curl "https://your-project-name.your-subdomain.arvanedge.ir/botYOUR_BOT_TOKEN/getMe"
```

### دریافت آخرین آپدیت‌ها (Polling)

```bash
curl "https://your-project-name.your-subdomain.arvanedge.ir/botYOUR_BOT_TOKEN/getUpdates"
```

### تنظیم Webhook

```bash
curl -X POST "https://your-project-name.your-subdomain.arvanedge.ir/botYOUR_BOT_TOKEN/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://your-webhook-url.com/telegram"
  }'
```


**نکته:** این پروکسی فقط برای استفاده شخصی و آموزشی است. برای استفاده تجاری، حتماً قوانین و مقررات مربوطه را بررسی کنید.

