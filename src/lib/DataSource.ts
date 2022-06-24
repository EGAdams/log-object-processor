/* eslint-disable import/order */
/* eslint-disable functional/immutable-data */
/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-class */
/*
 *  DataSource class
 */
import jQuery from "jquery";
import IApiArgs from "./IApiArgs";
import ISourceConfig from "./ISourceConfig";

export default class DataSource {
    // eslint-disable-next-line functional/prefer-readonly-type
    private url :string;
    constructor( config: ISourceConfig ) {  // establish communication address
        this.url = config.location }

    runQuery( apiArgs: IApiArgs ) {  // send data, redirect result.
        jQuery.post( this.url, { sql: apiArgs.query }).done( function( dataArg: string ) {
            try {
                apiArgs.data = JSON.parse( dataArg );
            } catch( e ) {
                console.log( "*** ERROR: failed to parse JSON data from server. ***" );
                console.log( "*** ERROR: dataArg: " + dataArg + " ***" );
            }
            jQuery( document ).trigger( /* event */ apiArgs.trigger, /* event arguments */ apiArgs );
        }); }
}
