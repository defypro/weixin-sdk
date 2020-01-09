import http from '../utils/http'

class AccessToken {
    private readonly appid: string;
    private readonly secret: string;

    constructor(appid = '', secret = '') {
        this.appid = appid;
        this.secret = secret;
    }

    private url() {
        return `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${this.appid}&secret=${this.secret}`;
    }

    public async get() {
        const {data} = await http.get(this.url());
        if (data.access_token) {
            return data.access_token
        }
        return Promise.reject(data);
    }
}

export default AccessToken;