import xml2js from "xml2js";

const builder = new xml2js.Builder({headless: true, cdata: true, explicitRoot: false, rootName: 'xml'});
export const obj2xml = function (obj: {}) {
    return builder.buildObject(obj);
}

export const parseString = function (str = ''): Promise<{}> {
    return new Promise((resolve) => {
        xml2js.parseString(str,
            {trim: true, explicitArray: false, explicitRoot: false},
            function (err, result: {}) {
                resolve(result);
            });
    })
}