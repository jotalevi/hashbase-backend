import EXTENSION_TAG_MAP from "./EXTENSION_TAG_MAP";

export function extTagger(files: { path: string; type: string }[]): string[] {
    const tagSet = new Set<string>();

    for (const file of files) {
        const ext = file.type?.toLowerCase();
        const tag = EXTENSION_TAG_MAP[ext];
        if (tag) tagSet.add(tag);
    }

    return Array.from(tagSet);
}
  
export function sizeTagger(totalSize: number): string[] {
    const tags: string[] = [];

    if (totalSize < 1 * 1024 * 1024) {
        tags.push('tiny'); // <1 MB
    } else if (totalSize < 50 * 1024 * 1024) {
        tags.push('small'); // 1–50 MB
    } else if (totalSize < 700 * 1024 * 1024) {
        tags.push('medium'); // 50–700 MB (CD-sized)
    } else if (totalSize < 4.7 * 1024 * 1024 * 1024) {
        tags.push('large'); // 700 MB – 4.7 GB (DVD-sized)
    } else if (totalSize < 10 * 1024 * 1024 * 1024) {
        tags.push('xl'); // 4.7–10 GB (HD movie, game)
    } else if (totalSize < 50 * 1024 * 1024 * 1024) {
        tags.push('xxl'); // 10–50 GB (BluRay, multi-game)
    } else {
        tags.push('massive'); // 50 GB+
    }

    return tags;
}
  
export function trackerTagger(trackers: string[]): string[] {
    const tags = new Set<string>();

    for (const raw of trackers) {
        const url = raw.toLowerCase();

        // Scene/premium trackers
        if (url.includes('rarbg')) tags.add('scene');
        if (url.includes('iptorrents')) tags.add('scene');
        if (url.includes('filelist')) tags.add('scene');
        if (url.includes('torrentleech')) tags.add('scene');

        // Anime
        if (url.includes('nyaa') || url.includes('anidex')) tags.add('anime');
        if (url.includes('tokyo')) tags.add('anime');

        // Public trackers
        if (url.includes('1337x')) tags.add('public');
        if (url.includes('openbittorrent')) tags.add('public');
        if (url.includes('opentrackr')) tags.add('public');
        if (url.includes('demonoid')) tags.add('public');
        if (url.includes('exodus')) tags.add('public');

        // Music / FLAC
        if (url.includes('redacted') || url.includes('apollo')) tags.add('music');
        if (url.includes('orpheus') || url.includes('opsfet')) tags.add('music');

        // Books / academic
        if (url.includes('bibliotik') || url.includes('libgen')) tags.add('books');

        // Games
        if (url.includes('gazellegames') || url.includes('xbox360')) tags.add('games');

        // General private
        if (url.includes('passkey') || url.includes('private')) tags.add('private');

        // NSFW
        if (url.includes('empire')) tags.add('nsfw');
        if (url.includes('pornbits')) tags.add('nsfw');
        if (url.includes('adult')) tags.add('nsfw');

        // Misc catch-alls
        if (url.includes('pirate') || url.includes('tpb')) tags.add('pirate');
        if (url.includes('archive')) tags.add('archive');
    }

    return Array.from(tags);
}
  