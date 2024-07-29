export const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) =>
            event.target?.result instanceof ArrayBuffer ? resolve(event.target.result) : reject(new Error('Invalid result type'));

        reader.onerror = (error) => reject(error);

        reader.readAsArrayBuffer(file);
    });