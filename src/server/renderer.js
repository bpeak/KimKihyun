import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import * as fs from 'fs'
import * as path from 'path'

const htmlTemplate = fs.readFileSync(path.join(__dirname, 'index.html')).toString()

const renderer = (App, url) => {
    const JSX = (
        <StaticRouter location={url} context={{}}>
            <App/>
        </StaticRouter>
    )
    const reactDOM = renderToString( JSX )
    const html = htmlTemplate.replace('<div id="app-root"></div>', `<div id="app-root">${reactDOM}</div>`)

    return html
}

export default renderer