import * as React from 'react'
import loadImage from './loadImage'
//styles
import classNames from 'classnames/bind'
import styles from './Canvas.scss'
const cx = classNames.bind(styles)
//imgs
import sampleImgSrc from 'shared/imgs/sample.png'

const keyTypes = {
    "LEFT" : 37,
    "UP" : 38,
    "RIGHT" : 39,
    "DOWN" : 40,
}

class Canvas extends React.Component{
    constructor(){
        super()
        this.state = {
            width : 300,
            height : 500
        }
    }



    async componentDidMount(){
        try{
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

            const keyManager = createKeyManager()

            const user = {
                x : 10,
                y : 20,
            }
            window.addEventListener('keydown', (e) => {
                keyManager.updateStatus('keydown', e.keyCode)
            })
            window.addEventListener('keyup', (e) => {
                keyManager.updateStatus('keyup', e.keyCode)
            })

            const canvas = this.refs.canvas
            canvas.width = window.innerWidth * 0.9
            canvas.height = window.innerHeight * 0.9
            const ctx = canvas.getContext('2d')
            const rate = canvas.width / canvas.height
            const bufferCanvas = document.createElement('canvas')
            bufferCanvas.height = 1500
            bufferCanvas.width = bufferCanvas.height * rate
            const bufferCtx = bufferCanvas.getContext('2d')
            bufferCtx.fillRect(100, 100, 100, 100)
            ctx.drawImage(bufferCanvas, 0, 0, canvas.width, canvas.height)
    
            window.addEventListener('resize', () => {
                canvas.width = window.innerWidth * 0.9
                canvas.height = window.innerHeight * 0.9
                const rate = canvas.width / canvas.height
                bufferCanvas.width = bufferCanvas.height * rate
            })
            const sampleImg = await loadImage(sampleImgSrc)

            const detectCollision = (user) => {
                if(user.x < 100){
                    console.log("작아짐")
                    if(this.props.viewState.view === 'rlgus'){
                        this.props.viewActions.setView('rlgus')
                    }
                }
                if(user.x > 300){
                    console.log("커짐")
                    if(this.props.viewState.view === 'wlgud'){
                        this.props.viewActions.setView('wlgud')
                    }
                }
            }
            setTimeout(() => {
                this.setState({
                    width : 100,
                    height : 100,
                })
            }, 1000)
            setTimeout(() => {
                this.setState({
                    width : 1000,
                    height : 1000,
                })
            }, 2000)
            setTimeout(() => {
                this.setState({
                    width : 2000,
                    height : 2000,
                })
            }, 3000)
            canvas.addEventListener('resize', () => {
                console.log("캔버스 사이즈 변함")
            })
            setInterval(() => {
                const { leftPressed, upPressed, rightPressed, downPressed } = keyManager.getStatus()
                let dx = 0
                let dy = 0
                detectCollision(user)
                if(leftPressed){
                    dx = -1
                }
                if(upPressed){
                    dy = -1
                }
                if(rightPressed){
                    dx = 1
                }
                if(downPressed){
                    dy = 1
                }

                if(dx !== 0 && dy !== 0){
                    dx /= Math.sqrt(2)
                    dy /= Math.sqrt(2)
                }

                user.x += dx
                user.y += dy

                bufferCtx.clearRect(0, 0, bufferCanvas.width, bufferCanvas.height)
                bufferCtx.drawImage(sampleImg, 300, 300)
                bufferCtx.fillRect(user.x, user.y, 100, 100)
                // console.log("c", bufferCanvas.width / bufferCanvas.height)
                // console.log("b", canvas.width / canvas.height)
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                ctx.drawImage(bufferCanvas, 0, 0, canvas.width, canvas.height)
            }, 10)
        } catch (err) {
            console.log(err)
        }
    }

    componentWillUnmount(){

    }

    render(){
        return (
            <canvas ref="canvas" style={{
                width : this.state.width,
                height : this.state.height,
            }} className={cx('Canvas')}></canvas>
        )
    }
}

export default Canvas