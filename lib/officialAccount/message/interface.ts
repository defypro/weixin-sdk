/**
 * 消息类型
 */
export enum MsgType {
    Text = 'text',
    Image = 'image',
    Voice = 'voice',
    Video = 'video',
    ShortVideo = 'shortvideo',
    Location = 'location',
    Link = 'link',
    Event = 'event'
};

/**
 * 事件类型
 */
export const enum EventType {
    Subscribe = 'subscribe',
    UnSubscribe = 'unsubscribe',
    Location = 'LOCATION',
    Click = 'CLICK',
    View = 'VIEW',
};

interface IReplyBase {
    ToUserName: string;
    FromUserName: string;
    CreateTime: number;
}

/**
 * 被动回复文本消息参数
 */
export interface ITextOptions extends IReplyBase {
    Content: string;
}

/**
 * 被动回复图片消息参数
 */
export interface IImageOptions extends IReplyBase {
    Image: {
        MediaId: string
    };
}

/**
 * 被动回复语音消息参数
 */
export interface IVoiceOptions extends IReplyBase {
    Voice: {
        MediaId: string
    };
}

/**
 * 被动回复视频消息参数
 */
export interface IVideoOptions extends IReplyBase {
    Video: {
        MediaId: string;
        Title: string
        Description: string;
    };
}

/**
 * 被动回复音乐消息参数
 */
export interface IMusic {
    Title: string
    Description: string;
    MusicUrl: string;
    HQMusicUrl: string;
    ThumbMediaId: string;
}

export interface IMusicOptions extends IReplyBase {
    Music: IMusic;
}

/**
 * 被动回复图文消息参数
 */
export interface IArticles {
    Title: string;
    Description: string;
    PicUrl: string;
    Url: string;
}

export interface INewsOptions extends IReplyBase {
    ArticleCount: number,
    Articles: IArticles[];
}

/**
 * 被动回复消息类型
 */
export enum ReplyMsgType {
    Text = 'text',
    Image = 'image',
    Voice = 'voice',
    Video = 'video',
    Music = 'music',
    News = 'News'
}

/**
 * 接收到消息参数
 */
export interface IReceivedData {
    ToUserName: string;
    FromUserName: string;
    CreateTime: number;
    MsgType: MsgType.Text | MsgType.Image | MsgType.Voice | MsgType.Video | MsgType.ShortVideo | MsgType.Link | MsgType.Location | MsgType.Event;
    Content?: string;
    MsgId?: number;
    Event?: EventType.Subscribe | EventType.UnSubscribe | EventType.Click | EventType.View | EventType.Location;
    EventKey?: string,
    MediaId?: number,
    Format?: string,
    PicUrl?: string,
    Recognition?: string,
    ThumbMediaId?: string,
    Ticket?: string,
    Latitude?: string,
    Longitude?: string,
    Precision?: string,
    Location_X?: string,
    Location_Y?: string,
    Scale?: string,
    Label?: string,
    Title?: string,
    Description?: string,
    Url?: string,
}

export interface IReceivedData {
    [propName: string]: any;
};