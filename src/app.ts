import { Server } from "./presentation/server";



//  Funcion anonima autoinvocada
( async () => {
    main();
})();


function main(){
    Server.start()
}