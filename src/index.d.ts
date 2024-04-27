import { Connection } from "@solana/web3.js";

declare module "@joeymeere/dreamcast" {
    export function getIDL(connection: Connection, programId: string): Promise<any>;
}