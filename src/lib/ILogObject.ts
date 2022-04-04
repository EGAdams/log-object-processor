/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/prefer-type-literal */
/**
 *
 * @description
 * An object that contains information about a logged event.  Hence, it is a log object.
 *
 * @export
 * @interface ILogObject
 */
export interface ILogObject {
    id:        string;
    timestamp: number; // timestamp in milliseconds since epoch
    message:   string;
    method:    string;
}
