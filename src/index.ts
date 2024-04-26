import { decodeIdlAccount } from "@coral-xyz/anchor/dist/cjs/idl";
import { PublicKey, Connection } from "@solana/web3.js";
import { utf8 } from '@coral-xyz/anchor/dist/cjs/utils/bytes';
import { inflate } from "pako";

export async function getIDL(connection: Connection, programId: string) {
    let programKey = new PublicKey(programId);
    const base = (await PublicKey.findProgramAddressSync([], programKey))[0];
    const idlPDA = await PublicKey.createWithSeed(base, "anchor:idl", programKey);

    const accountInfo = await connection.getAccountInfo(idlPDA);

    if (!accountInfo) {
        return null;
    }

    const idlAccount = decodeIdlAccount(accountInfo.data.slice(8));
    const inflatedIdl = inflate(idlAccount.data);
    const idlJson = JSON.parse(utf8.decode(inflatedIdl));

    return idlJson;
}