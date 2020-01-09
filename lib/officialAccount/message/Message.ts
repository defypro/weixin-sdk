import Text from './Text'
import Image from './Image'
import Voice from './Voice'
import Video from './Video'
import Music from './Music'
import News from './News'
import {IReceivedData, IMusic, IArticles} from "./interface";
import Custom from "./Custom";

const createTime = function () {
    return new Date().getTime();
}

export default class Message {
    static receivedData: IReceivedData;

    /**
     * 回复文本消息
     * @param text
     */
    static text(text: string = ''): string {
        return Text({
            ...Message.receivedData,
            CreateTime: createTime(),
            Content: text
        })
    }

    /**
     * 回复图片消息
     * @param mediaId
     */
    static image(mediaId: string = ''): string {
        return Image({
            ...Message.receivedData,
            CreateTime: createTime(),
            Image: {
                MediaId: mediaId
            }
        })
    }

    /**
     * 回复语音消息
     * @param mediaId
     */
    static voice(mediaId: string = ''): string {
        return Voice({
            ...Message.receivedData,
            CreateTime: createTime(),
            Voice: {
                MediaId: mediaId
            }
        })
    }

    /**
     * 回复视频消息
     * @param mediaId
     * @param title
     * @param description
     */
    static video(mediaId: string = '', title: string = '', description: string = ''): string {
        return Video({
            ...Message.receivedData,
            CreateTime: createTime(),
            Video: {
                MediaId: mediaId,
                Title: title,
                Description: description
            }
        })
    }

    /**
     * 回复音乐消息
     * @param options
     */
    static music(options: IMusic) {
        return Music({
            ...Message.receivedData,
            CreateTime: createTime(),
            Music: options
        })
    }

    /**
     * 回复图文消息
     * @param options
     * @param count
     */
    static news(options: IArticles[], count: number = 1) {
        return News({
            ...Message.receivedData,
            CreateTime: createTime(),
            ArticleCount: count,
            Articles: options
        })
    }
}
