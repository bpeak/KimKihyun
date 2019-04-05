import * as React from 'react'
import { Route, Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import Home from 'components/pages/Home'
import Test from 'components/pages/Test'
import Canvas from 'components/atoms/Canvas/Canvas'
import CanvasContainer from 'containers/CanvasContainer'
//styles
import styles from './App.scss'
const cx = classNames.bind(styles)

class App extends React.Component{
    constructor(){
        super()
        if(process.env.APP_ENV === 'browser'){
            this.state = {
                windowSize : {
                    width : window.innerWidth,
                    height : window.innerHeight,
                }
            }
        } else {
            this.state = {
                windowSize : {
                    width : 1500,
                    height : 1000,
                }
            }
        }
    }

    componentDidMount(){
        window.addEventListener('resize', () => {
            this.setState({
                ...this.state,
                windowSize : {
                    width : window.innerWidth,
                    height : window.innerHeight,
                }
            })
        })
        // setTimeout(() => {
        //     this.props.viewActions.setView("up")
        // }, 1000)
        // setTimeout(() => {
        //     this.props.viewActions.clearView()
        // }, 2000)
        // setTimeout(() => {
        //     this.props.viewActions.setView("right")
        // }, 3000)
        // setTimeout(() => {
        //     this.props.viewActions.clearView()
        // }, 4000)
        // setTimeout(() => {
        //     this.props.viewActions.setView("down")
        // }, 5000)
        // setTimeout(() => {
        //     this.props.viewActions.clearView()
        // }, 6000)
        // setTimeout(() => {
        //     this.props.viewActions.setView("left")
        // }, 7000)
        // setTimeout(() => {
        //     this.props.viewActions.setView("up")
        // }, 8000)
    }

    render(){
        let AppClassName
        const viewName = this.props.viewState.view
        if(viewName === null){
            AppClassName = "defaultView"
        } else {
            AppClassName = "specificView"
        }

        const canvasSize = (() => {
            const { windowSize } = this.state
            if(AppClassName === "defaultView"){
                return({
                    width : windowSize.width * 0.8,
                    height : windowSize.height * 0.6,
                })
            } else {
                return ({
                    width : windowSize.width * 0.25,
                    height : windowSize.height * 0.30,
                })
            }
        })()

        return (
            <React.Fragment>
                <div className={cx('App', AppClassName)}>
                    <div className={cx('box', 'up', { isSelected : viewName==='up' })}>up</div>
                    <div className={cx('middle-container', { isSelected : viewName==='left' || viewName==='right' })}>
                        <div className={cx('box', 'left', { isSelected : viewName==='left' })}>left</div>
                        <CanvasContainer
                            className={cx('canvas')}
                            size={canvasSize}
                        />
                        <div className={cx('box', 'right', { isSelected : viewName==='right' })}>right</div>
                    </div>
                    <div className={cx('box', 'down', { isSelected : viewName==='down' })}>down</div>
                </div>
            </React.Fragment>
        )
    }
}

export default App