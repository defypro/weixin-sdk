//nodemon -e ts,js --exec ts-node test.js

const path = require('path');
const resolvePath = dir => path.join(__dirname, dir);
const Koa = require('koa');
const router = require('koa-router')();
const IORedis = require("ioredis");
const redis = new IORedis();

const app = new Koa();

const {officialAccount, Message, MsgType, MessageCustom} = require('./lib');
router.all('/server', async (ctx, next) => {
    const app = officialAccount({
        appId: 'wx320bb9513d7fe07c',
        appsecret: 'e3157e46049bd95add8d887093585056',
        token: 'rams1234',
        cachePath: resolvePath('./cache')
    });
    const accessToken = await app.accessToken();
    const messageCustom = new MessageCustom(accessToken);
    ctx.body = await app.serve(ctx.req, async function (message) {
        messageCustom.sendText(message.FromUserName, 'messageCustom----1');
        messageCustom.sendText(message.FromUserName, 'messageCustom----2');
        switch (message.MsgType) {
            case MsgType.Text:
                if (message.Content === '音乐') {
                    return Message.music({
                        Title: '音乐标题',
                        Description: '音乐描述',
                        MusicUrl: 'https://y.qq.com/n/yqq/song/000bA3JS4fMAU5.html',
                        HQMusicUrl: 'https://y.qq.com/n/yqq/song/000bA3JS4fMAU5.html',
                        ThumbMediaId: 'zY4PyUCwFV4vYybF4ZsHxhZM0a4zUQb-UOHyc-KWbkzfAatYyD2pmdCK-ql_Ha6C'
                    });
                }
                return Message.text(message.Content);
            case MsgType.Image:
                return Message.image(message.MediaId);
            case MsgType.Voice:
                return Message.voice(message.MediaId);
            case MsgType.Video:
                // return Message.video(message.MediaId, '视频消息的标题', '视频消息的描述');
                return Message.text(MsgType.Video + ':' + message.MediaId);
            default:
                return '';
        }
        // return Message.image('S68lykXapo7I4H2iWvOPXElI6k8WBKI1sx0RDA4n6kc');
        // app.replayText
        // const builder = new xml2js.Builder({headless: true, cdata: true, explicitRoot: false, rootName: 'xml'});
        // return builder.buildObject({
        //     ToUserName: message.FromUserName,
        //     FromUserName: message.ToUserName,
        //     CreateTime: new Date().getTime(),
        //     MsgType: 'text',
        //     Content: message.Content
        // });
    });
});

router.all('/oauth', async (ctx, next) => {
    const app = officialAccount({
        appId: 'wx320bb9513d7fe07c',
        appsecret: 'e3157e46049bd95add8d887093585056',
        token: 'rams1234',
        cachePath: resolvePath('./cache')
    });
    if (ctx.query.code) {
        ctx.body = await app.oauth.userInfo(ctx.query.code);
    } else {
        ctx.response.redirect(app.oauth.setRedirectUri('http://xmlde.imwork.net/oauth').url());
    }
});

app.use(router.routes());

app.listen(3001);
console.log('weixin sdk start');