const EXTENSION_TAG_MAP: Record<string, string> = {
    // Games
    'nsp': 'switch',
    'xci': 'switch',
    'cia': '3ds',
    '3ds': '3ds',
    'nds': 'nds',
    'gba': 'gba',
    'sfc': 'snes',
    'smc': 'snes',
    'nes': 'nes',
    'n64': 'n64',
    'iso': 'disc-image',
    'bin': 'disc-image',
    'cue': 'disc-image',

    // Video
    'mkv': 'bluray',
    'mp4': 'video',
    'avi': 'video',
    'mov': 'video',
    'wmv': 'video',
    'webm': 'video',
    'm4v': 'video',

    // Audio
    'mp3': 'audio',
    'flac': 'audio',
    'wav': 'audio',
    'ogg': 'audio',
    'aac': 'audio',
    'm4a': 'audio',
    'alac': 'audio',

    // Software / Executables
    'exe': 'windows',
    'msi': 'windows',
    'dmg': 'mac',
    'app': 'mac',
    'apk': 'android',
    'jar': 'java',
    'deb': 'linux',
    'rpm': 'linux',
    'sh': 'script',

    // Books / Docs
    'pdf': 'ebook',
    'epub': 'ebook',
    'mobi': 'ebook',
    'azw3': 'ebook',
    'cbz': 'comic',
    'cbr': 'comic',
    'txt': 'document',
    'doc': 'document',
    'docx': 'document',
    'ppt': 'presentation',
    'pptx': 'presentation',
    'xls': 'spreadsheet',
    'xlsx': 'spreadsheet',

    // Archives / Compression
    'zip': 'compressed',
    'rar': 'compressed',
    '7z': 'compressed',
    'tar': 'compressed',
    'gz': 'compressed',
    'xz': 'compressed',
    'bz2': 'compressed',

    // Subtitles
    'srt': 'subtitle',
    'ass': 'subtitle',
    'sub': 'subtitle',

    // Images
    'jpg': 'image',
    'jpeg': 'image',
    'png': 'image',
    'gif': 'image',
    'bmp': 'image',
    'webp': 'image',
    'psd': 'image',

    // Dev / Code
    'js': 'code',
    'ts': 'code',
    'py': 'code',
    'cpp': 'code',
    'c': 'code',
    'java': 'code',
    'cs': 'code',
    'rb': 'code',
    'go': 'code',
    'rs': 'code',
    'html': 'code',
    'css': 'code',
    'json': 'data',
    'xml': 'data',
    'csv': 'data',
    'yml': 'data',
    'yaml': 'data',
};

export default EXTENSION_TAG_MAP;