import { IDL } from '@dfinity/candid';

export class AzleBool {
    _kind: 'AzleBool' = 'AzleBool';
    _azleCandidType?: '_azleCandidType';

    static getIdl() {
        return IDL.Bool;
    }
}

export const bool: AzleBool = AzleBool as any;
export type bool = boolean;
