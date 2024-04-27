import * as anchor from "@coral-xyz/anchor";
import { decodeIdlAccount } from "@coral-xyz/anchor/dist/cjs/idl";
import { PublicKey, Connection } from "@solana/web3.js";
import { utf8 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
import { inflate } from "pako";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";

// Fetches and parses an IDL its corresponding on-chain account
// Cluster setup depends on the connection object that is passed in.
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

// Creates an anchor program instance given a connection (web3.js),
// IDL (from json file), and wallet instance (useAnchorWallet).
// Optionally takes a commitment level.
export async function getProgram(
  connection: Connection,
  idl: object,
  programId: string,
  wallet: NodeWallet,
  commitment?: "processed" | "confirmed" | "finalized"
) {
  const commit = commitment ? commitment : "processed";

  const opts = {
    preflightCommitment: commit as anchor.web3.ConfirmOptions,
  };

  const provider = new anchor.AnchorProvider(
    connection,
    wallet,
    opts.preflightCommitment
  );

  //@ts-ignore
  type InterfaceProgram = idl;

  const IDL: InterfaceProgram = idl as anchor.Idl;

  const program = new anchor.Program(
    IDL,
    new PublicKey(programId),
    provider,
  ) as unknown as anchor.Program<InterfaceProgram>;

  return program;
}
