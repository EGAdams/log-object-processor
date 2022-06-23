/* eslint-disable import/order */
/* eslint-disable functional/immutable-data */
/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-class */
/*
 *  DataSource class
 */
import jQuery from "jquery";
import IApiArgs from "./IApiArgs";

export default class DataSource {
    readonly url: string;
    constructor() {  // establish communication address
        this.url = "https://mycustombusinessapp.com/wp-content/plugins/MCBA-Wordpress/runQuery.php"; }

    runQuery( apiArgs: IApiArgs ) {  // send data, redirect result.
        jQuery.post( this.url, { sql: apiArgs.query }).done( function( dataArg ) {
            try {
                apiArgs.data = JSON.parse( dataArg );
            } catch( e ) {
                console.log( "*** ERROR: failed to parse JSON data from server. ***" );
                console.log( "*** ERROR: dataArg: " + dataArg + " ***" );
            }
            jQuery( document ).trigger( /* event */ apiArgs.trigger, /* event arguments */ apiArgs );
        }); }
}
