import fc from 'fast-check';
import { RecursiveDefinitionArb } from '../recursive/definition_arb';
import { complexCandidDefinitionMemo } from './complex_candid_definition_memo';
import { RecursiveCandidDefinition, CandidDefinitionMemo } from './types';

// The number of options below (it's just recursive)
export const REC_ARB_COUNT = 0;
// TODO there are a lot of bugs with recursion so we are disabling the whole thing until these issues are resolved
// https://github.com/demergent-labs/azle/issues/1518
// https://github.com/demergent-labs/azle/issues/1513
// https://github.com/demergent-labs/azle/issues/1525

export function recursiveCandidDefinitionMemo(
    parents: RecursiveCandidDefinition[]
): CandidDefinitionMemo {
    return fc.memo((n) =>
        RecursiveDefinitionArb(complexCandidDefinitionMemo, parents, { n })
    );
}
