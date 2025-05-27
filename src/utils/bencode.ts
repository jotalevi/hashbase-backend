export function decodeBencode(buffer: Buffer, offset = 0): [any, number] {
    const char = String.fromCharCode(buffer[offset]);

    if (char === 'i') {
        const end = buffer.indexOf('e', offset);
        const number = parseInt(buffer.toString('utf8', offset + 1, end), 10);
        return [number, end + 1];
    }

    if (char === 'l') {
        let list: any[] = [];
        offset++;
        while (buffer[offset] !== 0x65) { // 'e'
            const [value, nextOffset] = decodeBencode(buffer, offset);
            list.push(value);
            offset = nextOffset;
        }
        return [list, offset + 1];
    }

    if (char === 'd') {
        let dict: Record<string, any> = {};
        offset++;
        while (buffer[offset] !== 0x65) {
            const [key, nextOffset] = decodeBencode(buffer, offset);
            const [value, nextValueOffset] = decodeBencode(buffer, nextOffset);
            dict[key] = value;
            offset = nextValueOffset;
        }
        return [dict, offset + 1];
    }

    if (/\d/.test(char)) {
        const sep = buffer.indexOf(':', offset);
        const len = parseInt(buffer.toString('utf8', offset, sep), 10);
        const start = sep + 1;
        const end = start + len;
        return [buffer.slice(start, end), end];
    }

    throw new Error(`Invalid bencode data at offset ${offset}`);
}
  
export function encodeBencode(data: any): Buffer {
    if (typeof data === 'number') {
        return Buffer.from(`i${data}e`);
    }

    if (Buffer.isBuffer(data)) {
        return Buffer.concat([
            Buffer.from(String(data.length)),
            Buffer.from(':'),
            data,
        ]);
    }

    if (typeof data === 'string') {
        const buf = Buffer.from(data, 'utf8');
        return Buffer.concat([
            Buffer.from(String(buf.length)),
            Buffer.from(':'),
            buf,
        ]);
    }

    if (Array.isArray(data)) {
        const encoded = data.map(encodeBencode);
        return Buffer.concat([
            Buffer.from('l'),
            ...encoded,
            Buffer.from('e'),
        ]);
    }

    if (typeof data === 'object' && data !== null) {
        const keys = Object.keys(data).sort(); // MUST be sorted!
        const encoded = keys.flatMap(k => [
            encodeBencode(k),
            encodeBencode(data[k]),
        ]);
        return Buffer.concat([
            Buffer.from('d'),
            ...encoded,
            Buffer.from('e'),
        ]);
    }

    throw new Error('Unsupported bencode data type');
}
  