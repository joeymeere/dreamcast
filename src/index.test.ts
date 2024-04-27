import { describe } from "node:test";
import { getIDL } from ".";
import { Connection } from "@solana/web3.js";

describe("getIDL", async () => {
    const a = await getIDL(
        new Connection("https://mainnet.helius-rpc.com/?api-key=<key>"), 
        "STKUaKniasuqrfer3XNbmrrc578pkL1XACdK8H3YPu8"
      );
    
    console.log(a);
});