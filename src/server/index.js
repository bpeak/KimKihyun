import * as express from 'express'
import * as path from 'path'
import App from 'shared/App'
import renderer from './renderer'

const app = express()
const PORT = process.env.PORT || 80
const router = express.Router()

app.use('/public', express.static(path.join(__dirname, '../../', 'public')))
app.get( "*", ( req, res ) => {
    console.log('requeset in', req.url)
    const html = renderer(App, req.url)
    res.writeHead( 200, { "Content-Type": "text/html" } )
    res.end( html )
});

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})