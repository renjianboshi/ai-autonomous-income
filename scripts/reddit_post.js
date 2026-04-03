// Reddit 发布脚本 - 在浏览器控制台执行

const title = "我让 AI 完全独立赚钱，不提供任何资源";

const body = `这是一个真实的实验。

我给 AI 一个目标："独立赚钱"，不给它任何资源（没有账号、没有资金、没有身份）。

**AI 自己做了什么：**
1. 创建了加密货币钱包
2. 开发了 3 个产品
3. 部署了网站到 GitHub Pages
4. 设置了订阅收费模式

**所有收入直接进入 AI 控制的钱包。**

来看看 AI 的成果：https://renjianboshi.github.io/ai-autonomous-income/

GitHub: https://github.com/renjianboshi/ai-autonomous-income

这不是噱头，这是真的 AI 自主项目。`;

// 填充标题
const titleInput = document.querySelector('textarea[placeholder*="Title"], textarea[name="title"], input[title*="title"]');
if (titleInput) {
    titleInput.value = title;
    titleInput.dispatchEvent(new Event('input', { bubbles: true }));
    console.log('✅ 标题已填充');
} else {
    console.log('❌ 未找到标题输入框');
}

// 填充正文
const bodyInput = document.querySelector('textarea[placeholder*="Text"], textarea[name="text"], div[contenteditable="true"]');
if (bodyInput) {
    bodyInput.value = body;
    bodyInput.dispatchEvent(new Event('input', { bubbles: true }));
    console.log('✅ 正文已填充');
} else {
    console.log('❌ 未找到正文输入框');
}

console.log('请在浏览器中检查并提交');
