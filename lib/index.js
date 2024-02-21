"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const querystring_1 = __importDefault(require("querystring"));
const md5_1 = __importDefault(require("md5"));
/** 初始化默认值 */
const params = {
    appid: "",
    key: "",
    to: "",
    q: "",
    from: "auto",
    tts: 1,
    dict: 1,
    action: 0,
};
/** fetch 百度翻译文档地址 */
const BaiduTranslateAPIUrl = `http://api.fanyi.baidu.com/api/trans/vip/translate`;
/**
 * @name 百度翻译请求接口
 * @options appid  可在管理控制台查看
 * @options key    在控制台申请查看
 * @options q      请求翻译字符	UTF-8编码
 * @options to     翻译目标语言 不可设置为auto
 * @options from   翻译源语言	可设置为auto
 * @options tts    是否显示语音合成资源	0-显示，1-不显示
 * @options dict   是否显示词典资源	0-显示，1-不显示
 * @options action 判断是否需要使用自定义术语干预API	1-是，0-否
 * */
function BaiduTranslateService(options) {
    var salt = `${Date.now()}${Math.random()}`;
    var sign = (0, md5_1.default)(`${options.appid}${options.q}${salt}${options.key}`);
    return new Promise((resolve, reject) => {
        (0, node_fetch_1.default)(BaiduTranslateAPIUrl, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            method: "POST",
            body: querystring_1.default.stringify(Object.assign(Object.assign(Object.assign({}, params), options), { salt, sign })),
        })
            .then((response) => response.json())
            .then(resolve)
            .catch(reject);
    });
}
exports.default = BaiduTranslateService;
module.exports = BaiduTranslateService;
