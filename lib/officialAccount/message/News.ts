import {obj2xml} from "../../utils/xmllib";
import {INewsOptions, ReplyMsgType} from "./interface";

export default function (options: INewsOptions): string {
    return obj2xml({
        ToUserName: options.FromUserName,
        FromUserName: options.ToUserName,
        CreateTime: options.CreateTime,
        MsgType: ReplyMsgType.News,
        ArticleCount: options.ArticleCount,
        Articles: options.Articles
    })
}