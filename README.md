# Dreamcast
Fetching and interacting with Anchor IDLs made quicker and easier.

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