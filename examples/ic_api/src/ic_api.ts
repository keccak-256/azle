import {
    blob,
    empty,
    ic,
    int8,
    nat,
    nat32,
    Opt,
    Principal,
    Query,
    QueryManual,
    Update
} from 'azle';

// returns the argument data as bytes.
export function arg_data_raw(
    arg1: blob,
    arg2: int8,
    arg3: boolean,
    arg4: string
): Query<blob> {
    return ic.arg_data_raw();
}

// returns the length of the argument data in bytes
export function arg_data_raw_size(
    arg1: blob,
    arg2: int8,
    arg3: boolean,
    arg4: string
): Query<nat32> {
    return ic.arg_data_raw_size();
}

// returns the principal of the identity that called this function
export function caller(): Query<Principal> {
    return ic.caller();
}

// returns the amount of cycles available in the canister
export function canister_balance(): Query<nat64> {
    return ic.canister_balance();
}

// returns the amount of cycles available in the canister
export function canister_balance128(): Query<nat> {
    return ic.canister_balance128();
}

// returns the amount of cycles available in the canister
export function data_certificate(): Query<Opt<blob>> {
    return ic.data_certificate();
}

// returns the amount of cycles available in the canister
export function data_certificate_null(): Update<Opt<blob>> {
    return ic.data_certificate();
}

// returns this canister's id
export function id(): Query<Principal> {
    return ic.id();
}

// prints a message through the local replica's output
export function print(message: string): Query<boolean> {
    ic.print(message);

    return true;
}

export function reject(message: string): QueryManual<empty> {
    ic.reject(message);
}

// sets up to 32 bytes of certified data
export function set_certified_data(data: blob): Update<void> {
    ic.set_certified_data(data);
}

// returns the current timestamp
export function time(): Query<nat64> {
    return ic.time();
}

// traps with a message, stopping execution and discarding all state within the call
export function trap(message: string): Query<boolean> {
    ic.trap(message);

    return true;
}
