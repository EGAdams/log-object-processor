/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable functional/no-method-signature */
/* eslint-disable functional/prefer-type-literal */
/**
 *
 * @description
 * Objects that represent finished queries are sent
 * to this type of object for further processing.
 *
 * @interface IQueryResultProcessor
 */
 export default interface IQueryResultProcessor {
    processQueryResult( queryResultToBeProcessed: any ): void;
}
