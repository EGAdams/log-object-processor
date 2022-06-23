/*
 * class TableManager
 */
import DataSource from './DataSource';

export default class TableManager {
    dataSource: DataSource;
    constructor() { this.dataSource = new DataSource();}

    createObjectRow( object_id: string  ) {
        var nextFunction = "checkResults";
        jQuery( document ).off().one( nextFunction, this.checkResults );
        var args = {
            query: "insert into monitored_objects( object_view_id, object_data ) values ( '" + object_id + "', '' )",
            trigger: nextFunction,  
            thisObject: this,
            data: {} };
        console.log( "running query: " + args.query );
        this.dataSource.runQuery( args ); }

    checkResults( _event: any, results: { data: { error: string | string[]; }; query: string; } ) {
        console.log( "checking results of table manager inserting new object row... " );
        if ( results.data.error ) {
            if ( results.data.error.includes( "Duplicate entry" )) {
                // console.log( "*** WARNING: duplicate entry in monitored objects table. ***" );
            } else {
                console.error( "*** ERROR: while running query: " + results.query + " ***" ); }}}
}
