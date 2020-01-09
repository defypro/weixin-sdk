import {obj2xml} from "../../utils/xmllib";
import {IImageOptions, ReplyMsgType} from "./interface";

export default function (options: IImageOptions): string {
    return obj2xml({
        ToUserName: options.FromUserName,
        FromUserName: options.ToUserName,
        CreateTime: options.CreateTime,
        MsgType: ReplyMsgType.Image,
        Image: options.Image
    })
}