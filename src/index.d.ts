declare module "@joeymeere/dreamcast" {
    import { Connection } from "@solana/web3.js";
    import { Idl, Program } from "@coral-xyz/anchor";
    import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";

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
    ): Promise<Program<Idl>>;

    export {
        Program,
        Idl,
    } from "@coral-xyz/anchor";
    export { NodeWallet } from "@coral-xyz/anchor/dist/cjs/nodewallet";
}