import 'dotenv/config'
import express from 'express'
import { ParseServer } from 'parse-server'
import path from 'path'
import http from 'http'
import { config, mountPath, port } from './config.js'
import nocache from 'nocache'
import morgan from 'morgan'

const __dirname = path.resolve()
const app = express()
app.use(morgan('dev'))
app.use(nocache())
app.use(express.json())
const slug = process.env.APP_SLUG as string

app.use('/public', express.static(path.join(__dirname, '/public')))
const server = new ParseServer(config)
await server.start()
app.use(mountPath, server.app)

app.get('/', function (_req, res) {
	res.status(200).json({
		...config,
		slug,
	})
})

app.get('/test-again', function (_req, res) {
	res.sendFile(path.join(__dirname, '/public/test.html'))
})

const httpServer = http.createServer(app)
httpServer.listen(port, function () {
	console.log('parse-server-example running on port ' + port + '.')
})

await ParseServer.createLiveQueryServer(httpServer)
console.log(`Visit http://localhost:${port}/test to check the Parse Server`)
