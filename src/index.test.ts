import { describe } from "node:test";
import { getIDL, getProgram } from ".";
import { Connection, Keypair } from "@solana/web3.js";
import assert from "node:assert/strict";
import { Program, Wallet } from "@coral-xyz/anchor";

const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=<key>");
const programId1 = "STKUaKniasuqrfer3XNbmrrc578pkL1XACdK8H3YPu8";
const programId2 = "F2VtnW9dTobhDfxSNTyWyVLr1rH9nVwwkRySi5gYsiGz";

// Id 1 is Stockpile v2, which has a valid IDL
describe("getIDL", async () => {
    const idl = await getIDL(connection, programId1);

    assert.ok(idl instanceof Object, "IDL Invalid");
});

// Id 2 is a random block, which has no valid IDL, and therefore should return null
describe("getIDL that doesn't exist", async () => {
    const idl = await getIDL(connection, programId2);
    
    assert.equal(idl, null);
});

describe("getProgram", async () => {
    const wallet = new Wallet(Keypair.generate());
    const idl = await getIDL(connection, programId1);

    const program = await getProgram(
        connection, 
        idl, 
        programId1, 
        wallet
    );
    
    assert.ok(program instanceof Program, "Program instance creation failed.");
});