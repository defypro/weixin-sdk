import {obj2xml} from "../../utils/xmllib";
import {IVideoOptions, ReplyMsgType} from "./interface";

export default function (options: IVideoOptions): string {
    return obj2xml({
        ToUserName: options.FromUserName,
        FromUserName: options.ToUserName,
        CreateTime: options.CreateTime,
        MsgType: ReplyMsgType.Video,
        Video: options.Video
    })
}