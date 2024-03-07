import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface SendMailOptions {
    to: string | string [] ;
    subject: string,
    htmlBody: string;
    attachements?: Attachement[]
}


interface Attachement {
    filename: string;
    path: string
}


export class EmailService {

    // nos permite enviar el email
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user : envs.MAILER_EMAIL,
            pass : envs.MAILER_SECRET_KEY
        }

    });

    constructor(

    ){}



    async sendEmail( options: SendMailOptions ): Promise<boolean> {

        const { to, subject, htmlBody, attachements = [] } = options;
        
        try {
            const sendInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachements
            })

            // console.log( sendInformation )
        

  
            return true;

        } catch ( error ) {
  

            return false;
        }

    }

   async sendEmailWithFileSytemLogs( to: string | string[] ){ 
        const subject = 'Logs del servidor'
        const htmlBody = `
            <h1>Sistema de Log</h1>
            <p style="font-size: 16px; line-height: 1.5;">Le estamos enviando un archivo con los logs capturados.</p>
            <div class="contenedor-archivo" style="border: 1px solid #ddd; padding: 10px; margin-top: 20px;">
                <h3 class="titulo-archivo" style="font-weight: bold; margin-bottom: 5px;">Archivo de Log</h3>
            </div>
            `
        const attachements: Attachement[] = [
            {filename: 'logs-all.log', path: './logs/logs-all.log'},
            {filename: 'logs-high.log', path: './logs/logs-high.log'},
            {filename: 'logs-medium.log', path: './logs/logs-medium.log'},
        ];

       return  this.sendEmail({
            to, subject, attachements, htmlBody
        })

    }
}