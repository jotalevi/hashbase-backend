import * as crypto from 'crypto';
import * as path from 'path';
import { decodeBencode, encodeBencode } from './bencode';

export interface ParsedMagnet {
  infoHash: string;
  name?: string;
  trackers: string[];
}

export function parseTorrentBuffer(buffer: Buffer) {
  const [data] = decodeBencode(buffer);

  const info = data['info'];
  const name = info['name'].toString();

  const infoEncoded = encodeBencode(info); // We'll write this below
  const infoHash = crypto.createHash('sha1').update(infoEncoded).digest('hex');

  const isMultiFile = Array.isArray(info['files']);
  const files = isMultiFile
    ? info['files'].map((f: any) => {
      const filePath = f['path'].map((p: Buffer) => p.toString()).join('/');
      const size = Number(f['length']);
      return {
        path: filePath,
        size,
        type: path.extname(filePath).slice(1),
      };
    })
    : [{
      path: name,
      size: Number(info['length']),
      type: path.extname(name).slice(1),
    }];

  const totalSize = files.reduce((sum, f) => sum + f.size, 0);

  const trackers = new Set<string>();
  if (data['announce']) {
    trackers.add(data['announce'].toString());
  }
  if (Array.isArray(data['announce-list'])) {
    data['announce-list'].flat().forEach((t: Buffer) => {
      trackers.add(t.toString());
    });
  }

  return {
    infoHash,
    name,
    isMultiFile,
    totalSize,
    files,
    trackers: Array.from(trackers),
  };
}


export function parseMagnetLink(uri: string): ParsedMagnet {
  if (!uri.startsWith('magnet:?')) {
    throw new Error('Invalid magnet URI');
  }

  const params = new URLSearchParams(uri.slice(8));
  const xt = params.get('xt');

  if (!xt || !xt.startsWith('urn:btih:')) {
    throw new Error('Missing or invalid xt parameter');
  }

  const infoHash = xt.replace('urn:btih:', '').toLowerCase();
  const name = params.get('dn') || undefined;
  const trackers = normalizeTrackers(params.getAll('tr'));

  return { infoHash, name, trackers };
}

export function normalizeTrackers(trackers: string[]): string[] {
  const seen = new Set<string>();

  return trackers
    .map(t => t.toLowerCase().replace(/\/+$/, '')) // lowercase + remove trailing slashes
    .filter(t => {
      if (seen.has(t)) return false;
      seen.add(t);
      return true;
    });
}
