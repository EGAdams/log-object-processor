import FreshToolBox from "./FreshToolBox";
import { ILogObject } from "./ILogObject";

/**
 * @description
 * container for log objects.
 *
 * @class LogObjectContainer
 */
// eslint-disable-next-line functional/no-class
export class LogObjectContainer {
    // eslint-disable-next-line functional/prefer-readonly-type
    logObjects: Array< ILogObject > = [];
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() {}

    // eslint-disable-next-line functional/no-return-void
    addLog( logToAdd: ILogObject ): void {
        // eslint-disable-next-line functional/no-this-expression
        if ( !FreshToolBox.isInArray( logToAdd, this.logObjects )) {
            // eslint-disable-next-line functional/no-this-expression
            this.logObjects.push( logToAdd ); }}

    // eslint-disable-next-line functional/prefer-readonly-type
    getLogObjects(): Array< ILogObject > {
        // eslint-disable-next-line functional/no-this-expression
        return this.logObjects; }

    // eslint-disable-next-line functional/no-return-void
    clearLogs(): void {
        // eslint-disable-next-line functional/no-this-expression
        this.logObjects = []; }
}
