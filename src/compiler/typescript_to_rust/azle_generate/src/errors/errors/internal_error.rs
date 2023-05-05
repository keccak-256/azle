#[derive(Debug, Clone, PartialEq, Eq)]
pub struct InternalError {}

impl std::error::Error for InternalError {}

impl std::fmt::Display for InternalError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "internal error: Oops! Looks like we introduced a bug while refactoring 🤦\nPlease open a ticket at https://github.com/demergent-labs/azle/issues/new",
        )
    }
}

impl From<InternalError> for crate::Error {
    fn from(error: InternalError) -> Self {
        Self::InternalError(error)
    }
}
