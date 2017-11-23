import * as express from 'express'
import * as cluster from 'cluster'
import {cpus} from 'os'
import * as _ from "lodash";


class App {
    public express

    constructor() {
        this.express = express()
        this.mountRoutes()
    }

    private mountRoutes(): void {
        const router = express.Router()
        router.get('/', (req, res) => {
            console.log('new message on GET /')
            res.json({
                message: 'Hello World 2!'
            })
        })
        this.express.use('/', router)
    }

}

const port = process.env.PORT || 10010

const app = new App().express
const numCPUs = cpus().length

if (cluster.isMaster) {
    console.log(`master` )


/*    for (let i = 0; i < numCPUs; i++) {
        let worker = forkWorker(i === 0);
        if(i === 0){
            jobWorker = worker
        }
    }*/
}else{
    console.log(`worker` )
    
}

app.listen(port, (err) => {
  if (err) {
    return console.log(err)
  }

  return console.log(`server is listening on ${port}`)
})

export default app