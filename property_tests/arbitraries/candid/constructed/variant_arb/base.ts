import fc from 'fast-check';
import { CandidValueAndMeta } from '../../value_and_meta_arb';
import { Variant } from '.';
import { CandidDefinition } from '../../definition_arb/types';
import { VariantDefinitionArb } from './definition_arbs';
import { VariantValuesArb } from './values_arb';
import { CandidArb } from '../../complex_type_arb';

export function VariantArb(
    candidDefinitionArb: fc.Arbitrary<CandidDefinition>
): fc.Arbitrary<CandidValueAndMeta<Variant>> {
    return CandidArb(
        VariantDefinitionArb,
        VariantValuesArb,
        candidDefinitionArb
    );
}
