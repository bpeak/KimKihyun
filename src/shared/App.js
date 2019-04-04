import * as React from 'react'
import { Route, Link } from 'react-router-dom'

class App extends React.Component{
    render(){
        console.log(process.env.APP_ENV)
        return (
            <React.Fragment>
                <Link to="/home">home</Link>
                <Link to="/test">test</Link>
                <Route exact path="/home" render={() => {
                    return (<div>123</div>)
                }}/>
                <Route path="/test" render={() => {
                    return (<div>101</div>)
                }}/>
            </React.Fragment>
        )
    }
}

export default App