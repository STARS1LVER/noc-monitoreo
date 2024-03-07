import { LogSeverityLevel, LogEntity } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';

interface CheckServiceUseCase {
    execute( url: string ): Promise<boolean>
}

type SuccesCallback = (() => void | undefined );
type ErrorCallback = (( error: string ) => void | undefined );


export class CheckMultipleService implements CheckServiceUseCase {

    public origin: string = 'check-service.ts'

    constructor(
         private readonly logRepository: LogRepository[],
         private readonly succesCallback: SuccesCallback,
         private readonly errorCallback: ErrorCallback
    ) {}
    

    private callLogs( log: LogEntity ){
        this.logRepository.forEach( logRepository => {
            logRepository.saveLog(log)
        } )
    }

    async execute( url: string  ): Promise<boolean>  {  
        
        try {
            const request = await fetch( url );
            if( !request.ok ){
                throw new Error(`Error on check service: ${url}`)
            }   

            const log = new LogEntity( { 
                message: `Service ${url} Working`, 
                level: LogSeverityLevel.low, 
                origin:this.origin 
            })
            
            this.callLogs( log )

            this.succesCallback() && this.succesCallback();
            return true
        } catch (error) {
            const errorMessage = `${url} is not ok.  ${error}`
            const log = new LogEntity({ 
                message: errorMessage, 
                level:LogSeverityLevel.low, 
                origin:this.origin  
            } )
            
            this.callLogs( log )
            
            this.errorCallback(`${errorMessage}`) && this.errorCallback(`${errorMessage}`)
            return false
        }
    }       

}

// axuk leii jvyd hhsv