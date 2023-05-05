use cdk_framework::act::abstract_canister_tree::Error as CdkfError;

mod compiler_output;
mod errors;
mod location;
mod suggestion;

pub use self::{
    compiler_output::CompilerOutput,
    errors::{GuardFunctionNotFound, InternalError, TypeNotFound},
    location::Location,
    suggestion::Suggestion,
};
use crate::canister_method::errors::{
    DuplicateSystemMethod, ExtraneousCanisterMethodAnnotation, MissingReturnTypeAnnotation,
};

pub mod service_method;

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum Error {
    TypeNotFound(TypeNotFound),
    GuardFunctionNotFound(GuardFunctionNotFound),
    DuplicateSystemMethodImplementation(DuplicateSystemMethod),
    ExtraneousCanisterMethodAnnotation(ExtraneousCanisterMethodAnnotation),
    MissingReturnTypeAnnotation(MissingReturnTypeAnnotation),
    InternalError(InternalError),
}

impl std::error::Error for Error {}

impl std::fmt::Display for Error {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Error::TypeNotFound(e) => e.fmt(f),
            Error::GuardFunctionNotFound(e) => e.fmt(f),
            Error::DuplicateSystemMethodImplementation(e) => e.fmt(f),
            Error::ExtraneousCanisterMethodAnnotation(e) => e.fmt(f),
            Error::MissingReturnTypeAnnotation(e) => e.fmt(f),
            Error::InternalError(e) => e.fmt(f),
        }
    }
}

impl From<CdkfError> for crate::Error {
    fn from(value: CdkfError) -> Self {
        match value {
            CdkfError::TypeNotFound(name) => crate::Error::TypeNotFound(TypeNotFound { name }),
            CdkfError::GuardFunctionNotFound(name) => {
                crate::Error::GuardFunctionNotFound(GuardFunctionNotFound { name })
            }
        }
    }
}

impl From<Error> for Vec<Error> {
    fn from(value: Error) -> Self {
        vec![value]
    }
}
