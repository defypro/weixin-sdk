import {obj2xml} from "../../utils/xmllib";
import {IMusicOptions, ReplyMsgType} from "./interface";

export default function (options: IMusicOptions): string {
    return obj2xml({
        ToUserName: options.FromUserName,
        FromUserName: options.ToUserName,
        CreateTime: options.CreateTime,
        MsgType: ReplyMsgType.Music,
        Music: options.Music
    })
}