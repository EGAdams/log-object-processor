/*
 *  interface MonitoredObject
 */
interface IMonitoredObject {
    id: string;
    logUpdate( message: string ): void;

    getMonitorId(): string;

    setMonitorId( newId:string ): void;
}