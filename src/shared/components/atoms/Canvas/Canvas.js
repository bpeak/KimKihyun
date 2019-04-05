import * as React from 'react'
import loadImage from './loadImage'
import start from './start'
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
    async componentDidMount(){
        try{
            const mainCanvas = this.refs.canvas
            this.end = await start(mainCanvas, this.props.viewActions)
        } catch (err){
            console.log(err)
        }
    }

    componentWillUnmount(){
        this.end()
    }

    render(){
        const size = this.props.size
        return (
            <canvas ref="canvas" width={size.width} height={size.height} className={this.props.className}></canvas>
        )
    }
}

export default Canvas