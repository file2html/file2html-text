"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var file2html = require("file2html");
var text_encoding_1 = require("file2html/lib/text-encoding");
var supportedMimeTypes = ['text/plain'];
var TextReader = (function (_super) {
    __extends(TextReader, _super);
    function TextReader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextReader.prototype.read = function (_a) {
        var fileInfo = _a.fileInfo;
        var content = fileInfo.content;
        var byteLength = content.byteLength;
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
            content: "<div>" + text_encoding_1.decode(content) + "</div>"
        }));
    };
    TextReader.testFileMimeType = function (mimeType) {
        return supportedMimeTypes.indexOf(mimeType) >= 0;
    };
    return TextReader;
}(file2html.Reader));
exports.default = TextReader;
