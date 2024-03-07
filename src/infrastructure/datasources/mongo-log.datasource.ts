import { LogModel } from "../../data/mongo";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";




export class MongoLogDataSource implements LogDatasource {
    
    // ! Creamos los logs
    async saveLog( log: LogEntity ): Promise<void> {
        const newLog = await LogModel.create( log )
        // await newLog.save();
        console.log('Mongo log created:', newLog )
    } 

    // !Obtenemos los logs
    async getLogs( severityLevel: LogSeverityLevel ): Promise< LogEntity[]> {
        
        const logs = await LogModel.find({
            level: severityLevel
        });


        return logs.map( mongoLog => LogEntity.fromObject(mongoLog)  )



    }



}