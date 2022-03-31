import ILogObject from "../abstract/ILogObject";
import FreshToolBox from "./FreshToolBox";
/**
 * @description
 * container for log objects.
 * 
 * @class LogObjectContainer
 */
export default class LogObjectContainer {
    logObjects: Array< ILogObject > = [];
    constructor() { console.log( 'constructing LogObjectContainer object...' ); }
    
    addLog( logToAdd: ILogObject ): void {
        if ( !FreshToolBox.isInArray( logToAdd, this.logObjects )) {
            this.logObjects.push( logToAdd ); }}
            
    getLogObjects(): Array< ILogObject > {
        return this.logObjects; }
}
