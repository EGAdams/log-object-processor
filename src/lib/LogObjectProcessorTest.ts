/* eslint-disable functional/no-let */
/* eslint-disable functional/no-loop-statement */
/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-return-void */
/* eslint-disable functional/no-class */
import FreshToolbox from "./FreshToolbox";
import { ILogObject } from "./ILogObject";
import ITestable from "./ITestable";
import { LogObjectContainer } from "./LogObjectContainer";
import { LogObjectContainerSource } from "./LogObjectContainerSource";
import { LogObjectFactory } from "./LogObjectFactory";
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
export class LogObjectProcessorTest implements ITestable {
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
            console.log( "LogObjectProcessorTest passed round one." );
        } else {
            console.error( "*** LogObjectProcessorTest failed! ***" );
        }

        const logObject1 = {
            id: "MessageManager_4147044803817_1653574710291",
            timestamp: 1653574710291,
            message: "data loaded.",
            method: "constructor"
        }

        const logObject2 = {
            id: "MessageManager_4034740484153_1653574710298",
            timestamp: 1653574710298,
            message: "setting newly built Admin guest to active...",
            method: "constructor"
        }



        logObjectContainer.addLog( logObject1 );
        logObjectContainer.addLog( logObject2 );
        logObjectProcessor.updateQue();
        logObjectProcessor.processLogObjects();
        FreshToolbox.assert( logObjectProcessor.writtenLogs.length === 512, "logObjectProcessor.writtenLogs.length === 512" );

        // these next 3 should not add anything to the writtenLogs array
        logObjectContainer.addLog( logObject1 );
        logObjectContainer.addLog( logObject2 );
        logObjectProcessor.updateQue();
        logObjectProcessor.processLogObjects();

        if ( logObjectProcessor.writtenLogs.length == 512 && logObjectProcessor.unwrittenLogs.length === 0 ) {
            console.log( "LogObjectProcessorTest Passed add two" );
        }

        const logObjectContainerSource = new LogObjectContainerSource();
        logObjectContainerSource.refresh( "MessageManager_1526");




        // if ( logObjectProcessor.writtenLogs.length === 513 && logObjectProcessor.unwrittenLogs.length === 0 ) {
        //     console.log( "LogObjectProcessorTest passed!" );
        // } else {
        //     console.error( "*** LogObjectProcessorTest failed! ***" );
        // }

        this.writtenLogs = logObjectProcessor.writtenLogs;
    }
}
