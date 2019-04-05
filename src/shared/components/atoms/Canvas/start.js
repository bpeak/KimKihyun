const createUserManager = () => {
    let x = 100
    let y = 100
    const updateStatus = ({
        upPressed,
        downPressed,
        leftPressed,
        rightPressed,
    }) => {
        let dx = 0
        let dy = 0
        if(leftPressed){
            dx = -20
        }
        if(upPressed){
            dy = -20
        }
        if(rightPressed){
            dx = 20
        }
        if(downPressed){
            dy = 20
        }

        if(dx !== 0 && dy !== 0){
            dx /= Math.sqrt(2)
            dy /= Math.sqrt(2)
        }
        x += dx
        y += dy
    }
    const getStatus = () => {
        return ({
            x,
            y,
        })
    }
    return ({
        updateStatus,
        getStatus,
    })
}

const createKeyManager = (eventName, keyCode) => {
    let leftPressed  = false
    let rightPressed  = false
    let upPressed  = false
    let downPressed  = false
    const getStatus = () => {
        return ({
            leftPressed,
            rightPressed,
            upPressed,
            downPressed,
        })
    }

    const updateStatus = (eventName, keyCode) => {
        let nextPressed = null
        if(eventName === 'keydown'){
            nextPressed = true
        } else if(eventName === 'keyup'){
            nextPressed = false
        }
        switch(keyCode){
            case 37:
            leftPressed = nextPressed
            break
            case 38:
            upPressed = nextPressed
            break
            case 39:
            rightPressed = nextPressed
            break
            case 40:
            downPressed = nextPressed
            break
        }
    }
    return ({
        getStatus,
        updateStatus
    })
}

const start = async (mainCanvas, viewActions) => {
    try{
        const mainCtx = mainCanvas.getContext('2d')
        const mainCanvasRate = mainCanvas.width / mainCanvas.height
        const bufferCanvas = document.createElement('canvas')
        bufferCanvas.height = 1500
        bufferCanvas.width = bufferCanvas.height * mainCanvasRate
        const bufferCtx = bufferCanvas.getContext('2d')

        const keyManager = createKeyManager()
        const userManager = createUserManager()

        const keyDownHandler = (e) => { keyManager.updateStatus('keydown', e.keyCode) }
        const keyUpHandler = (e) => { keyManager.updateStatus('keyup', e.keyCode) }
        


        const interval = setInterval(() => {
            bufferCtx.clearRect(0, 0, bufferCanvas.width, bufferCanvas.height)
            mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height)

            userManager.updateStatus(keyManager.getStatus())
            const userStatus = userManager.getStatus()
            bufferCtx.fillRect(userStatus.x, userStatus.y, 100, 200)
            mainCtx.drawImage(bufferCanvas, 0, 0, mainCanvas.width, mainCanvas.height)

            let viewName = null
            if(userStatus.x < 100){
                viewName = 'left'
            }
            if(userStatus.x > 2500){
                viewName = 'right'
            }
            if(userStatus.y > 1400){
                viewName = 'up'
            }
            if(userStatus.y < 100){
                viewName = 'down'
            }

            viewActions.setView(viewName)

        }, 1000 / 60)
    
        window.addEventListener('keydown', keyDownHandler)
        window.addEventListener('keyup', keyUpHandler)
    
        const end = () => {
            console.log("remove keydown handler")
            window.removeEventListener('keydown', keyDownHandler)
            console.log("remove keyup handle")
            window.removeEventListener('keyup', keyUpHandler)
            console.log("remove interval")
            clearInterval(interval)
        }
        return end
    } catch (err) {
        throw err
    }
}

export default start