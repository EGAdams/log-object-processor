import ILogObject from "../abstract/ILogObject";
import FreshToolBox from "./FreshToolBox";
import LogObjectContainer from "./LogObjectContainer";
/**
 * @description
 *   Maintains an array of written and unwritten logs from contanier 
 *   of log objects that is passed in on construction.
 * 
 * @class LogObjectProcessor
 */
export default class LogObjectProcessor  {
    logObjectContainer: LogObjectContainer;
    writtenLogs:   Array< ILogObject > = [];
    unwrittenLogs: Array< ILogObject > = [];

    constructor( logObjectContainerArg: LogObjectContainer ) {
        console.log( 'constructing LogObjectProcessor object...' ); 
        this.logObjectContainer = logObjectContainerArg; }

    updateQue() {
        console.log( 'updating que...' );
        const freshData = this.logObjectContainer.getLogObjects(); 
        for ( const logObject in freshData ) {
            this.addLog( freshData[ logObject ]); }}    
    
    addLog( logToAdd: ILogObject ): void {
        if ( !FreshToolBox.isInArray( logToAdd, this.writtenLogs )) {
            this.unwrittenLogs.push( logToAdd ); }}

    processLogObjects(): void { 
        console.log( 'processing log objects...' );
        for ( const logObject in this.unwrittenLogs ) {
            // console.log( "processing log with id: " + this.unwrittenLogs[ logObject ].id + "..." );
            this.writtenLogs.push( this.unwrittenLogs[ logObject ]); }
        this.unwrittenLogs = []; } 
        
    getWrittenLogs(): Array< ILogObject > {
        return this.writtenLogs; }    
}
