import * as file2html from 'file2html';
import {decode} from 'file2html/lib/text-encoding';
import * as mime from 'file2html/lib/mime';

const supportedMimeTypes: string[] = [mime.lookup('.txt')];

export default class TextReader extends file2html.Reader {
    read ({fileInfo}: file2html.ReaderParams) {
        const {content} = fileInfo;
        const {byteLength} = content;

        return Promise.resolve(new file2html.File({
            meta: Object.assign({
                fileType: file2html.FileTypes.document,
                mimeType: '',
                name: '',
                size: byteLength,
                creator: '',
                createdAt: '',
                modifiedAt: ''
            }, fileInfo.meta),
            styles: '<style></style>',
            content: `<div><pre>${ decode(content) }</pre></div>`
        }));
    }

    static testFileMimeType (mimeType: string) {
        return supportedMimeTypes.indexOf(mimeType) >= 0;
    }
}