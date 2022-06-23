/*
 *  class LogObjectParser
 */
import type { ILogObject } from "./ILogObject";   
export default class LogObjectParser {
    constructor() { console.log( "constructing LogObjectParser" ); }

    public createLogObjectFromString( logObjectString: any ): ILogObject {
        console.log( "parsing string: " + logObjectString );
        let newObject = JSON.parse( logObjectString );
        let logObject: ILogObject = {
            id:        "", 
            timestamp: 0,
            message:   "",
            method:    "" };
        console.log( "name: " + newObject.construction_name );
        return logObject; }
}
