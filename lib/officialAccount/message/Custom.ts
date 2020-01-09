import http from '../../utils/http'

/**
 * 客服消息
 */
class Custom {
    private readonly url: string;

    constructor(accessToken = '') {
        this.url = "https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=" + accessToken;
    }

    sendText(openid = '', text = '') {
        http.post(this.url, {
            "touser": openid,
            "msgtype": "text",
            "text":
                {
                    "content": text
                }
        });
    }
}

export default Custom;