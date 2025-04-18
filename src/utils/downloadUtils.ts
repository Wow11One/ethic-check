export const downloadBlob = (blob: Blob, filename: string) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = (filename || '').replace('_', ' ');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
};

export const parseFilename = (disposition: string) => {
    const utf8FilenameRegex = /filename\*=UTF-8''(.*)/i;
    const asciiFilenameRegex = /filename=(["']?)(.*)/i;
    let filename = ''; // returning empty string if some error occurs. The file will get the random name

    if (disposition) {
        console.log('disposition', disposition);
        if (disposition.toLowerCase().startsWith('attachment;')) {
            if (utf8FilenameRegex.test(disposition)) {
                filename = decodeURIComponent(utf8FilenameRegex.exec(disposition)![1]) || '';
            } else if (asciiFilenameRegex.test(disposition)) {
                filename = asciiFilenameRegex.exec(disposition)![2] || '';
            }
        }
    }

    return filename;
};