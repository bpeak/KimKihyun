import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import * as fs from 'fs'
import * as path from 'path'
import configureStore from 'shared/redux/configureStore'
import { Provider } from 'react-redux'

const htmlTemplate = fs.readFileSync(path.join(__dirname, 'index.html')).toString()

const renderer = (ReactApp, url) => {
    const store = configureStore()
    const JSX = (
        <Provider store={store}>
            <StaticRouter location={url} context={{}}>
                <ReactApp/>
            </StaticRouter>
        </Provider>
    )
    const reactDOM = renderToString( JSX )
    const html = htmlTemplate.replace('<div id="app-root"></div>', `<div id="app-root">${reactDOM}</div>`)

    return html
}

export default renderer