/* eslint-disable functional/no-return-void */
/* eslint-disable functional/immutable-data */
/* eslint-disable functional/no-loop-statement */
/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/no-class */
import FreshToolBox from "./FreshToolBox";
import { ILogObject } from "./ILogObject";
import { LogObjectContainer } from "./LogObjectContainer";
/**
 * @description
 *   Maintains an array of written and unwritten logs from a container
 *   of log objects that is passed in on construction.
 *
 * @class LogObjectProcessor
 */
export class LogObjectProcessor  {
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
            this.writtenLogs.push( this.unwrittenLogs[ logObject ]); }
        this.unwrittenLogs = []; }

    getWrittenLogs(): Array< ILogObject > {
        return this.writtenLogs; }

}
