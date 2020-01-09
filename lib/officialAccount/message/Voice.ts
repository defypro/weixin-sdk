import {obj2xml} from "../../utils/xmllib";
import {IVoiceOptions, ReplyMsgType} from "./interface";

export default function (options: IVoiceOptions): string {
    return obj2xml({
        ToUserName: options.FromUserName,
        FromUserName: options.ToUserName,
        CreateTime: options.CreateTime,
        MsgType: ReplyMsgType.Voice,
        Voice: options.Voice
    })
}