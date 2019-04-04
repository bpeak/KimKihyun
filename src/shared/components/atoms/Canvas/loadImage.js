const loadImage = (imgSrc) => {
    return new Promise((resolve, reject) => {
        try{
            const img = new Image()
            img.onload = () => {
                resolve(img)
            }
            img.src = imgSrc
        } catch (err) {
            reject(err)
        }
    })
}

export default loadImage