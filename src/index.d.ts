import { Connection } from "@solana/web3.js";
import { Program } from "@coral-xyz/anchor";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";

declare module "@joeymeere/dreamcast" {
    export * from "@coral-xyz/anchor";

    export function getIDL(
        connection: Connection, 
        programId: string
    ): Promise<any>;

    export function getProgram(
        connection: Connection, 
        idl: object, 
        programId: string, 
        wallet: NodeWallet,
        commitment?: "processed" | "confirmed" | "finalized"
    ): Promise<Program<idl>>;
}