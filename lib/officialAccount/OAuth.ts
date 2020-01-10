import http from '../utils/http'

export enum Scopes {
    SnsapiUserinfo = 'snsapi_userinfo',
    SnsapiBase = 'snsapi_base',
}

interface IError {
    errcode?: string;
    errmsg?: string;
}

interface IAccessData extends IError {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    openid: string;
    scope: string;
}

interface IUserInfo extends IError {
    openid: string;
    nickname: string;
    sex: string;
    province: string;
    city: string;
    country: string;
    headimgurl: string;
    privilege: [];
    unionid: string;
}

class OAuth {
    private readonly appid: string;
    private readonly secret: string;
    private redirectUri: string = '';
    private _accessData: IAccessData | undefined;
    private scope: Scopes = Scopes.SnsapiUserinfo;

    constructor(appid: string = '', secret: string = '') {
        this.appid = appid;
        this.secret = secret;
    }

    setRedirectUri(redirectUri: string = '') {
        this.redirectUri = redirectUri;
        return this;
    }

    setScope(scope: Scopes = Scopes.SnsapiUserinfo) {
        this.scope = scope;
        return this;
    }

    url() {
        const redirect_uri = encodeURIComponent(this.redirectUri);
        return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appid}&redirect_uri=${redirect_uri}&response_type=code&scope=${this.scope}&state=STATE#wechat_redirect`;
    }

    accessToken(code: string = ''): Promise<IAccessData> {
        const url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${this.appid}&secret=${this.secret}&code=${code}&grant_type=authorization_code`;
        if (this._accessData) {
            return Promise.resolve(this._accessData);
        } else {
            return http.post(url).then(({data}) => {
                if (data.access_token) {
                    this._accessData = data;
                }
                return data;
            });
        }
    }

    userInfo(code: string = ''): Promise<IUserInfo> {
        return this.accessToken(code).then(({access_token, openid}) => {
            const url = ` https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`;
            return http.post(url);
        }).then(({data}) => {
            return data;
        });
    }
}

export default OAuth