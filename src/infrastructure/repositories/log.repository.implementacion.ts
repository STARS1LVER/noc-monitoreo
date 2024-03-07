import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogSeverityLevel, LogEntity } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";


export class LogRepositoryImpl implements LogRepository {

    // private logDatasource: LogDatasource


    constructor(
        // inyeccion de dependencias
        private readonly logDatasource: LogDatasource, // <--- podemos cambiar cualquier data source
    ){}

    async saveLog(log: LogEntity): Promise<void> {
       return this.logDatasource.saveLog( log )
    }
    
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
       return this.logDatasource.getLogs( severityLevel )
        
    }
}