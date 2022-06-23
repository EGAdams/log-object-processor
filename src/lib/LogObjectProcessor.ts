/* eslint-disable functional/no-return-void */
/* eslint-disable functional/no-loop-statement */
/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/no-class */
import FreshToolBox from "./FreshToolBox";
import { ILogObject } from "./ILogObject";
import { LogObjectContainer } from "./LogObjectContainer";
/**
 * @description
 *   Maintains an array of written and unwritten logs from container
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
        const freshData = this.logObjectContainer.getLogObjects();
        for ( const logObject in freshData ) {
            this.addLog( freshData[ logObject ]); }}

    addLog( logToAdd: ILogObject ): void {
        if ( !FreshToolBox.isInArray( logToAdd, this.writtenLogs )) {
                this.unwrittenLogs.push( logToAdd ); }}

    processLogObjects(): void {
        for ( const logObject in this.unwrittenLogs ) {
            this.writtenLogs.push( this.unwrittenLogs[ logObject ]); }
        this.unwrittenLogs = []; }

    getWrittenLogs(): Array< ILogObject > {
        return this.writtenLogs; }

    getUnwrittenLogs(): Array< ILogObject > {
        return this.unwrittenLogs; }

    clearLogs(): void {
        this.writtenLogs = [];
        this.unwrittenLogs = [];
        this.logObjectContainer.clearLogs(); }

}
