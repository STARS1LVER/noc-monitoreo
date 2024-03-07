import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDataBase } from "./data/mongo";
import { Server } from "./presentation/server";




//  Funcion anonima autoinvocada
( async () => {
    main();
})();


async function main(){

    await MongoDataBase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    })

    const prisma = new PrismaClient();
    const newLog = await prisma.logModel.create({
        data: {
            level: 'LOW',
            message: 'Test Message',
            origin: 'App.ts'
        }
    })

    // console.log( { newLog } )

    // Crear una coleccion = tables, documento = registro
    // const newLog = await LogModel.create({
    //     message: 'Test message desde Mongo',
    //     origin: 'App.ts',
    //     level: 'low',


    // const logs = await prisma.logModel.findMany({
    //     where: {
    //         level: 'HIGH'
    //     }
    // })
    

    // console.log( logs )
    
    // })

    // // ! Grabamos en la base de datos
    // await newLog.save()

    // console.log( newLog )

    // const logs = await LogModel.find()
    // console.log( logs[0].message )


    Server.start()
    // console.log( envs  )
}