# Balancer SOR migrated for NEAR

For general info see the parent repo.

We have no way of tracking pools on NEAR so far, so they have to be hard coded for now. Also, if you wish to use this local version of SOR with balancer frontend take a look at [yarn link](https://classic.yarnpkg.com/en/docs/cli/link/).

When linked, all you have to do is run

```
yarn build
```

to update the package for the frontend.

## Hacks regarding the pools

These are needed until we replace subgraph functionality on NEAR.

After you create a pool (via simple-balancer) check the console output for "DS proxy result:". The pool id (address) can for now be found under `result.events[0].raw.topics[2]`.

For now, SOR needs to be modified to work with this pool. Modify `getAllPublicSwapPools` to return the pool directly. E.g.:

```
return {
  pools: [
      {
          id: '0x6a60ec11b03bc26c0632a7ea6de2c75562f0c657'.toLowerCase(),
          publicSwap: 'true',
          swapFee: '0.000001',
          tokens: [
              {
                  address: '0xE599045A0a93fF901B995c755f1599DB6ACD44e6'.toLowerCase(),
                  balance: '100',
                  decimals: '18',
                  denormWeight: '10',
              },
              {
                  address: '0xc1dd4f43e799A08Ec72b455c723C7FE0e9e85A70'.toLowerCase(),
                  balance: '1000',
                  decimals: '18',
                  denormWeight: '1',
              },
          ],
          tokensList: [
              '0xE599045A0a93fF901B995c755f1599DB6ACD44e6'.toLowerCase(),
              '0xc1dd4f43e799A08Ec72b455c723C7FE0e9e85A70'.toLowerCase(),
          ],
          totalWeight: '11',
      },
  ],
};
```

Also the `result` variable in `multicall.getAllPoolDataOnChain` needs to be modified to contain the token balances.
