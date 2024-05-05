<img src="https://firebasestorage.googleapis.com/v0/b/zircon-ac0b5.appspot.com/o/dreamcast.png?alt=media&token=35156d61-e316-4aa1-9c82-1b9f532199bd">
<div align="center">
  <img src="https://badgen.net/badge/version/1.1.0/blue">
  <img src="https://badgen.net/badge/contributions/open/blue">
</div>
<h1 align="center">Dreamcast</h1>
<div align="center">
  <h3>Fetching and interacting with Anchor IDLs made quicker and easier.</h3>
</div>

## Who Is This For?
Dreamcast is for both novice and expert developers who are looking to interact with programs that lack a Typescript SDK, but have a published IDL account on-chain.

Additionally, this library is suitable for those who have an IDL file for a custom program they are interacting with, but want a concise and reusable method for creating their provider and program instances.

## Installation
You can install Dreamcast with npm using the following command:
```
npm i @joeymeere/dreamcast
```
Additionally, you can load the source code via unpkg:
```
https://unpkg.com/@joeymeere/dreamcast@latest
```

## Usage

**Fetching IDLs**
```
// create a connection (web3.js)
const connection = new Connection("<rpc url>");
const programId = "STKUaKniasuqrfer3XNbmrrc578pkL1XACdK8H3YPu8";

// returns formatted IDL object
const idl = await getIDL(connection, programId); 
```

## Use with Next.js
If you're using this package with Next.js, you'll need to add some extra lines to your next.config.js to ensure IDLs are correctly loaded. 

```
transpilePackages: ['@joeymeere/dreamcast'],
webpack: (config) => {
    config.resolve.extensionAlias = {
        ".js": [".ts", ".tsx", ".js", ".jsx"],
        ".mjs": [".mts", ".mjs"],
        ".cjs": [".cts", ".cjs"],
    };
  return config;
},
```
