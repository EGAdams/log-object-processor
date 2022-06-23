/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable functional/no-loop-statement */
/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/no-class */
/* eslint-disable import/order */
/*
 *  class LogObjectContainerSource
 */
import jQuery from "jquery";
import DataSource from './DataSource';
import { ILogObject } from "./ILogObject";
import { LogObjectContainer } from "./LogObjectContainer";
import { LogObjectProcessor } from "./LogObjectProcessor";

export class LogObjectContainerSource {
    logObjectContainer: LogObjectContainer;
    logObjectProcessor: LogObjectProcessor;
    dataSource: DataSource;
    constructor() {
        this.logObjectContainer = new LogObjectContainer();
        this.logObjectProcessor = new LogObjectProcessor( this.logObjectContainer );
        this.dataSource = new DataSource();
    }

    getWrittenLogs () {
        return this.logObjectProcessor.getWrittenLogs();
    }

    refresh( object_view_id: string ) {
        jQuery( document ).on( "consumeData", this.consumeData );
        const args = {
            query: "select object_data from monitored_objects where object_view_id ='" + object_view_id + "'",
            trigger: "consumeData",
            data: {},
            thisObject: this
        };

        this.dataSource.runQuery( args );
    }

    consumeData( _event: any, result: { thisObject: any; data: string[][]; } ) {
        const object_data = JSON.parse( result.data[ 0 ][ 0 ] );
        const logObjects = object_data.logObjects;
        for ( const logObject of logObjects ) {
            result.thisObject.logObjectContainer.addLog( logObject );
        }
        result.thisObject.logObjectProcessor.updateQue();
        result.thisObject.logObjectProcessor.processLogObjects();
    }

    refreshFromFile( file_path: string ) {
        fetch( file_path )
            .then( response => response.text() )
            .then( text => {
                text = text.replaceAll( '\r', '' );
                const file_array = text.split( "\n" );
                const log_objects: ILogObject[] = [];
                let parsed_line: ILogObject = { id: "", timestamp: 0, message: "", method: "" };
                for ( const line of file_array ) {
                    if ( line.length > 0 ) {
                        try {
                            parsed_line = JSON.parse( line );
                        } catch ( error ) {
                            console.error( "error parsing line: " + line );
                        }
                        log_objects.push( parsed_line );
                    }
                }
                for ( const logObject of log_objects ) {
                    this.logObjectContainer.addLog( logObject );
                }
                this.logObjectProcessor.updateQue();
                this.logObjectProcessor.processLogObjects();
            } );
    }
}
