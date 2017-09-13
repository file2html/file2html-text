import * as fs from 'fs';
import * as path from 'path';
import {TextDecoder} from 'text-encoding';
import TextReader from '../../src/index';

describe('Text', () => {
    beforeAll(() => {
        (window as any).TextDecoder = TextDecoder;
    });

    describe('#read()', () => {
        let reader: TextReader;

        beforeEach(() => {
            reader = new TextReader();
        });

        it('should read .txt file', () => {
            const filename: string = 'sample.txt';
            const mimeType: string = 'text/plain';
            const fileBuffer: Buffer = fs.readFileSync(path.resolve(__dirname, '..', filename));

            return reader.read({
                fileInfo: {
                    content: new Uint8Array(fileBuffer),
                    meta: {
                        name: filename,
                        mimeType
                    } as any
                }
            }).then((file) => {
                const {styles, content} = file.getData();
                const base64: string = fileBuffer.toString('base64');

                expect(styles).toBe('<style></style>');
                expect(content).toBe(
                    '<div><pre>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</pre></div>'
                );
            });
        });
    });
});