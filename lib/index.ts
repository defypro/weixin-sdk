import OfficialAccount from './officialAccount/Application'

import {IOfficialAccountConfig} from "./config";

export const officialAccount = function (config: IOfficialAccountConfig) {
    return new OfficialAccount(config);
}

export {default as Message} from './officialAccount/message'

export {MsgType} from './officialAccount/message'

export {default as MessageCustom} from './officialAccount/message/Custom'

// export const MsgType = _MsgType;
