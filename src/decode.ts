export const poeUrlDecode = (data: string) => {
    const buf = Buffer.from(data.replace(/-/g, '+').replace(/_/g, '/'), 'base64');
    const nodes = [];
    for (var i = 5; i < buf.length; i += 2) nodes.push(buf.readUInt16BE(i));

    return {
        version: buf.readInt32BE(0), // just a guess
        charClass: buf[4],
        _: buf[5], // what's this?
        nodes: nodes
    };
};

export const poeUrlEncode = (charClass: number, nodes: (string | number)[]) => {
    const data = Buffer.alloc(10 + 2 * nodes.length);
    data.writeInt32BE(6, 0); // version
    data.writeUint8(charClass, 4);
    data.writeUint8(0, 5); // ?

    data.writeUInt16BE(nodes.length, 5);
    nodes.forEach((n, i) => data.writeUInt16BE(+n, 7 + 2 * i));
    const base64 = data.toString('base64');
    return base64.replace(/\+/g, '-').replace(/\//g, '_');
};
