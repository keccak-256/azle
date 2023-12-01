import fc from 'fast-check';

import { CandidValueAndMeta } from '../../value_and_meta_arb';
import { ReturnTuple, Tuple } from './index';
import { CandidDefinition } from '../../definition_arb/types';
import { TupleDefinitionArb } from './definition_arb';
import { TupleValuesArb } from './values_arbs';

export function TupleArb(
    candidTypeArb: fc.Arbitrary<CandidDefinition>
): fc.Arbitrary<CandidValueAndMeta<Tuple, ReturnTuple>> {
    return TupleDefinitionArb(candidTypeArb)
        .chain((tupleDefinition) =>
            fc.tuple(
                fc.constant(tupleDefinition),
                TupleValuesArb(tupleDefinition)
            )
        )
        .map(
            ([
                {
                    candidMeta: {
                        typeAnnotation,
                        typeAliasDeclarations,
                        imports
                    }
                },
                { agentArgumentValue, agentResponseValue, valueLiteral }
            ]) => {
                return {
                    src: {
                        typeAnnotation,
                        typeAliasDeclarations,
                        imports,
                        valueLiteral
                    },
                    agentArgumentValue,
                    agentResponseValue
                };
            }
        );
}
