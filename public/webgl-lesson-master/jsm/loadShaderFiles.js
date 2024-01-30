async function fetchFile(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to load shader file");
    }
    return await response.text();
}

function loadShaderFiles(vertexPath, fragmentPath) {
    return new Promise((resolve, reject) => {
        Promise.all([
            fetchFile(vertexPath),
            fetchFile(fragmentPath),
        ]).then((shaders) => {
            const vertexShaderSource = shaders[0];
            console.log("🚀 ~ ]).then ~ vertexShaderSource:", vertexShaderSource)

            const fragmentShaderSource = shaders[1];
            console.log("🚀 ~ ]).then ~ fragmentShaderSource:", fragmentShaderSource)

            resolve({ vertexShaderSource, fragmentShaderSource })
        }).catch(err => {
            reject(err)
        })
    })
}

export {
    fetchFile, loadShaderFiles
}