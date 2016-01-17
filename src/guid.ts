// The MIT License (MIT)
//
// Copyright (c) Heath Stewart
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import * as uuid from 'node-uuid';
import * as util from 'util';

/**
 * A globally unique identifier.
 */
export class Guid {
    private _buffer : Buffer;

    /**
     * Creates a new globally unique identifier.
     */
    constructor() {
        this._buffer = new Buffer(16);
        this._buffer = uuid.v4(null, this._buffer);
    }

    /**
     * Gets an identifier consisting of all zeroes.
     */
    static EMPTY : Guid = Guid.parse('0');

    /**
     * Parses a string representing a globally unique identifier.
     * @param input A string representing a globally unique identifier.
     * @returns The parsed globally unique identifier.
     */
    static parse(input : string) : Guid {
        let guid = new Guid();
        guid._buffer = uuid.parse(input, guid._buffer);

        return guid;
    }

    /**
     * Returns the raw _buffer.
     * @returns The raw _buffer.
     */
    toBuffer() : Buffer {
        return this._buffer;
    }

    /**
     * Returns the string representation of a globally unique identifier.
     * @param format Optional format specifier: 'struct' ('x'), 'braced' ('b'), or other (default).
     * @returns The string representation of a globally unique identifier.
     */
    toString(format? : string) : string {
        if (format === 'struct' || format === 'x') {
            let b = this._buffer;
            return util.format('{0x%s, 0x%s, 0x%s, {0x%s, 0x%s, 0x%s, 0x%s, 0x%s, 0x%s, 0x%s, 0x%s}}',
                b.toString('hex', 0, 4), b.toString('hex', 4, 6), b.toString('hex', 6, 8),
                b.toString('hex', 8, 9), b.toString('hex', 9, 10),
                b.toString('hex', 10, 11), b.toString('hex', 11, 12), b.toString('hex', 12, 13),
                b.toString('hex', 13, 14), b.toString('hex', 14, 15), b.toString('hex', 15, 16));
        } else if (format === 'braced' || format === 'b') {
            return util.format('{%s}', this.toString());
        } else {
            return uuid.unparse(this._buffer);
        }
    }
}