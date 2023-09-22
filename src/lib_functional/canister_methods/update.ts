import {
    handleRecursiveParams,
    handleRecursiveReturn,
    newTypesToStingArr
} from '../../lib_new/method_decorators';
import { Callback, CanisterMethodInfo, executeMethod } from '.';
import { TypeMapping } from '../candid';

export function update<
    const Params extends ReadonlyArray<any>,
    Return,
    GenericCallback extends Callback<Params, Return>
>(
    paramsIdls: Params,
    returnIdl: Return,
    callback?: Awaited<ReturnType<GenericCallback>> extends TypeMapping<Return>
        ? GenericCallback
        : never
): CanisterMethodInfo<Params, Return> {
    const paramCandid = handleRecursiveParams(paramsIdls as any);
    const returnCandid = handleRecursiveReturn(
        returnIdl as any,
        paramCandid[2]
    );

    const finalCallback =
        callback === undefined
            ? undefined
            : (...args: any[]) => {
                  executeMethod(paramCandid, returnCandid, args, callback);
              };

    return {
        type: 'update',
        callback: finalCallback,
        candid: `(${paramCandid[1].join(', ')}) -> (${returnCandid[1]});`,
        candidTypes: newTypesToStingArr(returnCandid[2]),
        paramsIdls: paramsIdls as any,
        returnIdl
    };
}
