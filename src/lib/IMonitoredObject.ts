/*
 *  interface MonitoredObject
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type IMonitoredObject = {
    readonly id: string;
    logUpdate( message: string ): void;
    getMonitorId(): string;
    setMonitorId( newId:string ): void;
};
