import { describe } from "node:test";
import { getIDL } from ".";
import { Connection } from "@solana/web3.js";
import assert from "node:assert/strict";

const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=<key>");
const programId1 = "STKUaKniasuqrfer3XNbmrrc578pkL1XACdK8H3YPu8";
const programId2 = "F2VtnW9dTobhDfxSNTyWyVLr1rH9nVwwkRySi5gYsiGz";

// Id 1 is Stockpile v2, which has a valid IDL
describe("getIDL", async () => {
    const idl = await getIDL(connection, programId1);
    
    console.log(idl);
});

// Id 2 is a random block, which has no valid IDL, and therefore should return null
describe("getIDL that doesn't exist", async () => {
    const idl = await getIDL(connection, programId2);
    
    assert.equal(idl, null);
});