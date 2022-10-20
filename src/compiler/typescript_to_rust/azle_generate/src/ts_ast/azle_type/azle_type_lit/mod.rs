mod azle_type_element;
mod get_dependencies;
pub mod get_source_info;
mod get_source_text;

use crate::ts_ast::ast_traits::generate_inline_name::GenerateInlineName;
use swc_common::SourceMap;
use swc_ecma_ast::TsTypeLit;

use crate::cdk_act::{
    nodes::data_type_nodes::{
        act_record::{Record, RecordLiteral, RecordTypeAlias},
        act_variants::{Variant, VariantLiteral, VariantTypeAlias},
        ActRecord, ActRecordMember, ActVariant, ActVariantMember, LiteralOrTypeAlias,
    },
    ActDataType,
};

use self::azle_type_element::AzleTypeElement;

#[derive(Clone)]
pub struct AzleTypeLit<'a> {
    pub ts_type_lit: TsTypeLit,
    pub source_map: &'a SourceMap,
}

impl AzleTypeLit<'_> {
    pub fn to_record(&self, record_name: &Option<&String>) -> ActDataType {
        let members: Vec<ActRecordMember> = self
            .ts_type_lit
            .members
            .iter()
            .map(|member| {
                let azle_member = AzleTypeElement {
                    ts_type_element: member.clone(),
                    source_map: self.source_map,
                };
                azle_member.to_record_member()
            })
            .collect();

        ActDataType::Record(match record_name {
            Some(record_name) => ActRecord {
                act_type: LiteralOrTypeAlias::TypeAlias(RecordTypeAlias {
                    record: Record {
                        name: record_name.clone().clone(),
                        members,
                    },
                }),
            },
            None => ActRecord {
                act_type: LiteralOrTypeAlias::Literal(RecordLiteral {
                    record: Record {
                        name: self.ts_type_lit.generate_inline_name(),
                        members,
                    },
                }),
            },
        })
    }
    pub fn to_variant(&self, variant_name: &Option<&String>) -> ActDataType {
        let members: Vec<ActVariantMember> = self
            .ts_type_lit
            .members
            .iter()
            .map(|member| {
                let azle_member = AzleTypeElement {
                    ts_type_element: member.clone(),
                    source_map: self.source_map,
                };
                azle_member.to_variant_member()
            })
            .collect();

        ActDataType::Variant(match variant_name {
            Some(record_name) => ActVariant {
                act_type: LiteralOrTypeAlias::TypeAlias(VariantTypeAlias {
                    variant: Variant {
                        name: record_name.clone().clone(),
                        members,
                    },
                }),
            },
            None => ActVariant {
                act_type: LiteralOrTypeAlias::Literal(VariantLiteral {
                    variant: Variant {
                        name: self.ts_type_lit.generate_inline_name(),
                        members,
                    },
                }),
            },
        })
    }
}
