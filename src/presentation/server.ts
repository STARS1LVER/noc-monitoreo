import { error } from "console";
import { CheckService } from "../domain/uses-cases/checks/check-service";
import { CronService } from "./cron/cron-service"
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.implementacion";
import FileSystemDatasource from "../infrastructure/datasources/file-system.datasource";
import { envs } from "../config/plugins/envs.plugin";
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/uses-cases/email/send-logs";
import { MongoLogDataSource } from "../infrastructure/datasources/mongo-log.datasource";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { PostgresLogDataSource } from "../infrastructure/datasources/postgresql-log.datasource";
import { CheckMultipleService } from "../domain/uses-cases/checks/check-service-multiple";


const fslogRepository= new LogRepositoryImpl( 
    new FileSystemDatasource()
)

const mongologRepository= new LogRepositoryImpl( 
    new MongoLogDataSource()
)

const postgresqlogRepository= new LogRepositoryImpl( 
    new PostgresLogDataSource()
)

 const emailService = new EmailService()

export class Server {


    public static async start(){
        console.log( 'Server started...' )

        // Enviamos correos atraves de un caso de uso
        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository
        // ).execute(
        //     ['diegocardenaz15@gmail.com', "silverxiz11@gmail.com"]
        // )

        //  const emailService = new EmailService()
        // emailService.sendEmailWithFileSytemLogs(
        //     ['diegocardenaz15@gmail.com', "silverxiz11@gmail.com"]
        // )

        // console.log('ejecute')

        // emailService.sendEmail({
        //     to: 'diegocardenaz15@gmail.com',
        //     subject: 'Logs de sistema',
        //     htmlBody: `
               
        //     `
        // })

        // console.log( envs.MAILER_EMAIL, envs.MAILER_SECRET_KEY )

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'http://google.com'
                new CheckMultipleService(
                    [ fslogRepository, postgresqlogRepository, mongologRepository],
                    () => console.log(`${url} is ok`, new Date()),
                    ( error ) => console.log( error ),
                ).execute(  url  )
                // new CheckService().execute( 'http://localhost:3000' )
            }
        );

        // const logs = await logRepository.getLogs(LogSeverityLevel.low)
        // console.log(logs)

    }

}