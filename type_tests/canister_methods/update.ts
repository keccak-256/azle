// TODO we aren't really testing that the params and return type only accept CandidType
// TODO The return type is not being tested here

import {
    bool,
    nat,
    Null,
    Record,
    RequireExactlyOne,
    text,
    update,
    Variant
} from '../../src/lib';
import { AssertType, NotAnyAndExact } from '../assert_type';

const User = Record({
    id: text
});

const Reaction = Variant({
    Happy: Null,
    Sad: Null
});

update(
    [bool, nat, text, User, Reaction],
    text,
    (param0, param1, param2, param3, param4) => {
        type Param0 = AssertType<NotAnyAndExact<typeof param0, boolean>>;
        type Param1 = AssertType<NotAnyAndExact<typeof param1, bigint>>;
        type Param2 = AssertType<NotAnyAndExact<typeof param2, string>>;
        type Param3 = AssertType<
            NotAnyAndExact<
                typeof param3,
                {
                    id: string;
                }
            >
        >;
        type Param4 = AssertType<
            NotAnyAndExact<
                typeof param4,
                RequireExactlyOne<{
                    Happy: null;
                    Sad: null;
                }>
            >
        >;

        return param2;
    }
);
