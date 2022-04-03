/* eslint-disable functional/no-let */
/* eslint-disable functional/no-loop-statement */
/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-return-void */
/* eslint-disable functional/no-class */
import FreshToolbox from "./FreshToolbox";
import ILogObject from "./ILogObject";
import ITestable from "./ITestable";
import { LogObjectContainer } from "./LogObjectContainer";
import LogObjectFactory from "./LogObjectFactory";
import { LogObjectProcessor } from "./LogObjectProcessor";
/**
 * @description
 * creates 10 log objects and adds them to a log object container.
 * creates 5 more log objects and tries to add all 15.  the LogObjectProcessor should
 * detect the previous 10 entries and only grow by 5.
 *
 * @class LogObjectProcessorTest
 * @implements {ITestable}
 */
export default class LogObjectProcessorTest implements ITestable {
    writtenLogs: Array< ILogObject > = [];
    constructor() { console.log( 'constructing LogObjectProcessorTest object...' ); }
    testMe(): void {
        const logObjectContainer = new LogObjectContainer();
        const logObjectFactory   = new LogObjectFactory( this );
        for ( let i = 0; i < 10; i++ ) {
            logObjectContainer.addLog( logObjectFactory.createLogObject( "message_" + i )); }
        FreshToolbox.assert( logObjectContainer.getLogObjects().length === 10, "logObjectContainer.getLogObjects().length === 10" );
        const logObjectProcessor = new LogObjectProcessor( logObjectContainer );
        logObjectProcessor.updateQue();
        logObjectProcessor.processLogObjects();
        if ( logObjectProcessor.writtenLogs.length !== 10 && logObjectProcessor.unwrittenLogs.length !== 0 ) {
            console.error( "*** LogObjectProcessorTest failed! ***" ); }
        for ( let i = 0; i < 500; i++ ) {
            logObjectContainer.addLog( logObjectFactory.createLogObject( "message_" + i )); }
        logObjectProcessor.updateQue();
        logObjectProcessor.processLogObjects();
        if ( logObjectProcessor.writtenLogs.length === 510 && logObjectProcessor.unwrittenLogs.length === 0 ) {
            console.log( "LogObjectProcessorTest passed!" );
        } else {
            console.error( "*** LogObjectProcessorTest failed! ***" );
        }
        this.writtenLogs = logObjectProcessor.writtenLogs;
    }
}
