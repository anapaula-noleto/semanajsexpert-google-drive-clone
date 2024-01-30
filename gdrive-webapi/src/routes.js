import { logger } from "./logger.js";

export default class Routes {
    io
    constructor() {}

    setSocketInstance(io) {
        this.io = io;
    }

    async defaultRoute(request, response) {
        response.writeHead(204)
        response.end()
    }

    // options geralmente é enviado pelo browser para saber se a api está de pé
    async options(request, response) {
        response.writeHead(204)
        response.end('hello world')
    }

    async post(request, response) {
        logger.info('post')
        response.end('hello world')
    }

    async get(request, response) {
        logger.info('get')
        response.end('hello world')
    }

    handler(request, response) {
        response.setHeader('Access-Control-Allow-Origin', '*')
        const chosenRoute = this[request.method.toLowerCase] || this.defaultRoute(request, response)

        return chosenRoute.apply(this, [request, response])
    }
}