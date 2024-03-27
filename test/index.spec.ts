// chai无法使用5.x存在的问题
// https://github.com/chaijs/chai/discussions/1594#discussioncomment-8306302
import { assert } from 'chai';
import baiduTranslateService from "../src/index";

describe("Baidu translate service usage suite", () => {
  it("should be able to execute a test", async () => {
    const result: any = await baiduTranslateService({
      appid: "", // todo 到Baidu官网后去appid和key
      key: "", // todo 
      from: 'zh',
      to: "en",
      q: "今天星期几？",
    })
    assert.strictEqual(!!result, true);
    assert.strictEqual(result?.error_code === '52003', false, '鉴权失败，请填写正确的appid和key');
    assert.strictEqual(result?.trans_result[0]?.dst, "What day is it today?");
  });
});
