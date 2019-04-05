import * as React from 'react'
import * as ReactDOM from 'react-dom'
import AppContainer from 'shared/AppContainer'
import { BrowserRouter }from 'react-router-dom'
import { Provider } from 'react-redux'
import store from 'shared/redux/store'

ReactDOM.hydrate(
    (
        <Provider store={store}>
            <BrowserRouter>
                <AppContainer/>
            </BrowserRouter>
        </Provider>
    ),
    document.getElementById('app-root')
)
