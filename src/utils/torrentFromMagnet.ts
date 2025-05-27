import { exec } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';
import { tmpdir } from 'os';

export async function torrentFromMagnet(infoHash: string): Promise<Buffer> {
    const tempDir = path.join(tmpdir(), `torrent-${Date.now()}`);
    const magnetUri = `magnet:?xt=urn:btih:${infoHash}`;
    const output = path.join(tempDir, `${infoHash}.torrent`);

    return new Promise((resolve, reject) => {
        exec(`mkdir -p "${tempDir}" && aria2c --bt-metadata-only=true --bt-save-metadata=true -d "${tempDir}" "${magnetUri}"`, async (error) => {
            if (error) return reject(new Error(`aria2c failed: ${error.message}`));
            try {
                const file = await fs.readFile(output);
                resolve(file);
            } catch (err) {
                reject(new Error('Failed to read .torrent file'));
            }
        });
    });
}
