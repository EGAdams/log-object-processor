/*
 * class Tester
 */
class Tester {
    testableObjects: Array< string >;
    constructor( testableObjectsArg: Array< string > ) {
        this.testableObjects = testableObjectsArg;
    }

    start(): void {
        this.testableObjects.forEach( async specimen => {
            if ( specimen.length != 0 && !specimen.match( /^#/ )) {
                const Subject = await import( "./" + specimen );
                const subject = new Subject.default();
                console.log( "\nbegin " + specimen + " test..." );
                subject.testMe();
                console.log( "end " + specimen + " test.\n" );
            }
        });
    }   
}

const tester = new Tester([ "LogObjectProcessorTest" ]);
tester.start();
console.log( "end testing testable objects." );

module.exports = Tester;
