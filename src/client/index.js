import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from 'shared/App'
import { BrowserRouter }from 'react-router-dom'
import { Provider } from 'react-redux'
import store from 'shared/redux/store'

ReactDOM.hydrate(
    (
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    ),
    document.getElementById('app-root')
)
