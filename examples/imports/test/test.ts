import { getCanisterId, runTests } from 'azle/test';
import { createActor } from '../test/dfx_generated/imports';
import { getTests } from './tests';

const importsCanister = createActor(getCanisterId('imports'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(importsCanister));
