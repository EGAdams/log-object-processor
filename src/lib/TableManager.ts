/* eslint-disable functional/no-this-expression */
/*
 * class TableManager
 */
// eslint-disable-next-line import/order
import jQuery from 'jquery';
import DataSource from './DataSource';

// eslint-disable-next-line functional/no-class
export default class TableManager {
    readonly dataSource: DataSource;
    constructor() { this.dataSource = new DataSource();}

    createObjectRow( object_id: string  ) {
        const nextFunction = "checkResults";
        jQuery( document ).one( nextFunction, this.checkResults );
        const args = {
            query: "insert into monitored_objects( object_view_id, object_data ) values ( '" + object_id + "', '' )",
            trigger: nextFunction,
            thisObject: this,
            data: {} };
        console.log( "running query: " + args.query );
        this.dataSource.runQuery( args ); }

    checkResults( _event: any, results: { readonly data: { readonly error: string | readonly string[]; }; readonly query: string; } ) {
        console.log( "checking results of table manager inserting new object row... " );
        if ( results.data.error ) {
            if ( results.data.error.includes( "Duplicate entry" )) {
                // console.log( "*** WARNING: duplicate entry in monitored objects table. ***" );
            } else {
                console.error( "*** ERROR: while running query: " + results.query + " ***" ); }}}
}
