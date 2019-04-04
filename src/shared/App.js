import * as React from 'react'
import { Route, Link } from 'react-router-dom'
import Home from 'components/pages/Home'
import Test from 'components/pages/Test'
import Canvas from 'components/atoms/Canvas/Canvas'
import CanvasContainer from 'containers/CanvasContainer'

class App extends React.Component{
    render(){
        console.log(process.env.APP_ENV)
        return (
            <React.Fragment>
                {/* <Link to="/home">home</Link>
                <Link to="/test">test</Link> */}
                <CanvasContainer/>
                {/* <Route exact path="/home" component={Home}/>
                <Route path="/test" component={Test}/> */}
            </React.Fragment>
        )
    }
}

export default App