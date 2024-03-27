const baiduTranslateService = require("vve-baidu-translate-service").default;

baiduTranslateService({
  appid: "",
  key: "",
  to: "en",
  q: "今天星期几？",
}).then((result) => {
  console.log(result);
});
