/**
 *  @class FreshToolBox
 * 
 *  @description
 *  tools that I frequently use.
 * 
 */
export default class FreshToolBox {
    constructor() { console.log( "contructing fresh tool box..." ); }
    /**
     * @method removeObjectFromArray
     * @description
     * removes an object from an array of any type of objects.
     *
     * @param {unknown} objectToRemove
     * @param {Array< unknown >} arrayToRemoveItFrom
     * @return {*}  {Array< unknown >}
     * @memberof FreshToolBox
     */
    static removeSpecificObjectFromArray ( objectToRemove: unknown, arrayToRemoveItFrom: Array< unknown > ): void {
        arrayToRemoveItFrom.splice( arrayToRemoveItFrom.indexOf( objectToRemove ), 1 ); }
    
    static capitalizeFirstLetter ( stringToUppercase: string ): string {
        return stringToUppercase.charAt( 0 ).toUpperCase() + stringToUppercase.slice( 1 ); }

    static isInArray ( objectToSearchFor: any, arrayToSearch: Array< any > ): boolean {
        return( arrayToSearch.indexOf( objectToSearchFor ) > -1 ); }
    
    static assert( condition: any, msg?: string ): asserts condition {
        if ( !condition ) {
            throw new Error( msg )
        }}
}