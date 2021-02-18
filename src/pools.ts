import fetch from 'isomorphic-fetch';
import { SubGraphPools, Pools, Pool, Token } from './types';
import * as bmath from './bmath';

export class POOLS {
    getAllPublicSwapPools(URL: string): SubGraphPools {
        // use hardcoded pool for now
        // const result = await fetch(URL);
        // const allPools = result.json();
        // return allPools;
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
    }

    async formatPoolsBigNumber(pools: SubGraphPools): Promise<Pools> {
        let onChainPools: Pools = { pools: [] };

        for (let i = 0; i < pools.pools.length; i++) {
            let tokens: Token[] = [];

            let p: Pool = {
                id: pools.pools[i].id,
                swapFee: bmath.scale(bmath.bnum(pools.pools[i].swapFee), 18),
                totalWeight: bmath.scale(
                    bmath.bnum(pools.pools[i].totalWeight),
                    18
                ),
                tokens: tokens,
                tokensList: pools.pools[i].tokensList,
            };

            pools.pools[i].tokens.forEach(token => {
                let decimals = Number(token.decimals);

                p.tokens.push({
                    address: token.address,
                    balance: bmath.scale(bmath.bnum(token.balance), decimals),
                    decimals: decimals,
                    denormWeight: bmath.scale(
                        bmath.bnum(token.denormWeight),
                        18
                    ),
                });
            });
            onChainPools.pools.push(p);
        }

        return onChainPools;
    }
}
