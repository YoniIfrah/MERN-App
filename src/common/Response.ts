import myError from "./Error"
import { Response } from 'express'

class myResponse{ 
    body: object;
    userId: String;
    err:myError;

    constructor(body:object = {}, userId:String = 'unknown', err?:myError) {
        this.body = body
        this.userId = userId
        this.err = err        
    }
    sendRestResponse(res:Response){
        if (this.err == null) {
            res.status(200).send({ 'status': 'ok', 'post': this.body })
        } else { 
            res.status(this.err.code).send({
            'status': 'fail',
            'message': this.err.message 
            })
        } 
    }
}
export = myResponse
  