import * as express from 'express'
import * as path from 'path'
const app = express()
const PORT = process.env.PORT || 80
const router = express.Router()

//nginx 로 대체할부분
import App from 'shared/App'
import { StaticRouter } from "react-router-dom"
import * as React from 'react'
import { renderToString } from "react-dom/server"
import * as fs from 'fs'

const emptyHtml = fs.readFileSync(path.join(__dirname, '../../', 'public/index.html')).toString()

app.use('/public', express.static(path.join(__dirname, '../../', 'public')))
app.get( "*", ( req, res ) => {
    console.log(req.url)
    const context = { };
    const JSX = (<App/>)
    const reactDOM = renderToString( JSX )
    const html = emptyHtml.replace('<div id="app-root"></div>', `<div id="app-root">${reactDOM}</div>`)

    res.writeHead( 200, { "Content-Type": "text/html" } );
    res.end( html );
});
app.use('/api/v1', (req, res) => {
    res.send("에이피아이요청")
})

app.listen(80, () => {
    console.log(`Listening on PORT ${PORT}`)
})