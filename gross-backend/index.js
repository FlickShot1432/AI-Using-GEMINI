import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import http from 'http'
import bodyParser from 'body-parser'
import router from './src/routes/index.js'
import Engine from './src/utils/engine.js'
import database from './src/db/index.js'
import { Server } from "socket.io";
import GeneratedText from "./src/models/generatedTextHistory/index.js"


class App {
    constructor() {
        dotenv.config()
        Engine.loading()
            .then(() => express())
            .then((app) => this.dbConfiguration(app))
            .then((app) => {
                console.log('2. server configuration completed.')
                return this.configureServer(app)
            })
            .then((app) => {
                console.log('3. server starting.')
                return this.startServer(app)
            })
            //socket connection
            .then((app) => {
                console.log('5. socket establishing.')
                return this.socketConnection(app)
            })
    }

    configureServer = () => new Promise((resolve) => {
        const app = express()
        app.use(cors())
        app.use(express.json())
        app.use(express.urlencoded({ extended: true }))
        app.use(bodyParser.urlencoded({ extended: false }))
        app.use('/api/v1', router)
        resolve(app)
    })

    startServer = (app) => new Promise((resolve) => {
        const port = process.env.PORT || 4000
        app.set(port)
        const server = http.createServer(app)
        server.on('listening', () => {
            const PORT = server.address().port
            console.log('4. server started on:', `http://localhost:${PORT}/api/v1`)
            resolve(server)
        })
        server.listen(port)
        return server
    })

    dbConfiguration = async (app) => {
        try {
            await database.connection().then(() => {
                console.log('1. database connected.')
                return app
            })
        } catch (error) {
            console.log('error', error)
        }
    }

    socketConnection = async (server) => {
        try {
            const io = new Server(server, { cors: { origin: "*" } });
            io.on('connect', () => {
                console.log('6. Socket established');
            })
            io.on("connect_error", () => {
                setTimeout(() => {
                    io.connect();
                }, 1000);
            });
            io.on("disconnect", () => {
                console.log('7. Socket disconnected');
            })
            io.on('connection', (socket) => {
                console.log('client connected', socket.id);
                socket.on("join", (id) => {
                    socket.join(id);
                })
                socket.on('task_creation', (data) => {
                    console.log('data', data)
                    const { id } = data;
                    // io.emit('message', data);
                    io.to(id).emit("message", data)
                });

                // GeneratedText.find().sort({ createdAt: -1 }).limit(10).then((res) => {
                //     socket.emit('history', res);
                // }).catch((err) => {
                //     console.error('Error fetching generated text history:', err);
                //     return;
                // })

                socket.on('disconnect', () => {
                    console.log('client disconnected');
                });
            });

        } catch (error) {
            console.log('error', error)
        }
    }
}
export default new App()