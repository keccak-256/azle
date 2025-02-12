import { text } from '../../../src/lib';
import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '../../assert_type';
import { TypeMapping } from '../../../src/lib/candid/type_mapping';

testCandidType(text);
testSerializable(text);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof text>, string>
>;
