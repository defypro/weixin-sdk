import {IOfficialAccountConfig} from "../config";
import crypto from 'crypto';
import url from "url";
import {IncomingMessage} from "http";
import {parseString} from "../utils/xmllib"
import Message from "./message";
import {IReceivedData} from "./message";
import AccessToken from "./AccessToken";

const checkSignature = function (query: any, token: string) {
    const arr = [token, query.timestamp, query.nonce].sort();
    const str = arr.join('');
    const shasum = crypto.createHash('sha1');
    const ciphertext = shasum.update(arr.join('')).digest('hex');
    if (query.signature == ciphertext) {
        return true;
    }
    return false;
};

const getReceivedData = function (req: IncomingMessage): Promise<IReceivedData> {
    return new Promise(function (resolve) {
        let reqDataBuffer: Buffer[] = [];
        const {query = {}} = url.parse(req.url || '', true);

        req.on('data', buffer => {
            reqDataBuffer.push(buffer);
        });

        req.on('end', () => {
            let buf = Buffer.concat(reqDataBuffer);
            parseString(buf.toString()).then(result => {
                const data = {
                    ...query,
                    ...result
                } as IReceivedData;
                resolve(data);
            })
        });
    });
}

interface ICallback {
    (receivedData: IReceivedData): any
}

class Application {
    private readonly config: IOfficialAccountConfig;
    private readonly appId: string;
    private readonly appsecret: string;

    constructor(config: IOfficialAccountConfig) {
        this.config = config;
        this.appId = config.appId;
        this.appsecret = config.appsecret;
    }

    async serve(req: IncomingMessage, callback: ICallback) {
        const {token} = this.config;
        const receivedData = await getReceivedData(req);

        if (!token) return '';
        if (!checkSignature(receivedData, token)) return '';
        if (!callback) callback = Promise.resolve;

        Message.receivedData = receivedData;
        return receivedData.echostr ? receivedData.echostr : callback(receivedData);
    }

    accessToken() {
        return new AccessToken(this.appId, this.appsecret).get().then(res => {
            return Promise.resolve(res);
        }).catch(error => {
            return Promise.reject(error);
        })
    }
}

export default Application