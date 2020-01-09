import {obj2xml} from "../../utils/xmllib";
import {ITextOptions, ReplyMsgType} from "./interface";

export default function (options: ITextOptions): string {
    return obj2xml({
        ToUserName: options.FromUserName,
        FromUserName: options.ToUserName,
        CreateTime: options.CreateTime,
        MsgType: ReplyMsgType.Text,
        Content: options.Content
    })
}