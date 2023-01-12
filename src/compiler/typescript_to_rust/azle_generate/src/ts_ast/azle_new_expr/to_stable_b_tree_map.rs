use super::AzleNewExpr;
use crate::{
    utils::{ToU32, ToU8},
    AzleStableBTreeMapNode,
};

impl AzleNewExpr<'_> {
    pub fn to_azle_stable_b_tree_map_node(&self) -> Result<AzleStableBTreeMapNode, String> {
        let type_arg_error_message = self.build_type_arg_error_message();
        let arg_spread_error_message = self.build_arg_spread_error_message();
        let arg_error_message = self.build_arg_error_message();
        let memory_id_error_message = self.build_memory_id_error_message();
        let second_argument_size_error_message = self.build_second_argument_size_error_message();
        let third_argument_size_error_message = self.build_third_argument_size_error_message();

        match &self.new_expr.type_args {
            Some(type_args) => {
                if type_args.params.len() != 2 {
                    return Err(type_arg_error_message);
                }

                let key_type = *type_args.params.get(0).unwrap().clone();
                let value_type = *type_args.params.get(1).unwrap().clone();

                match &self.new_expr.args {
                    Some(args) => {
                        for arg in args {
                            if arg.spread.is_some() {
                                return Err(arg_spread_error_message);
                            }
                        }

                        if args.len() != 3 {
                            return Err(arg_error_message);
                        }

                        let memory_id = match &args.get(0).unwrap().expr.to_u8() {
                            Ok(value) => *value,
                            Err(_) => return Err(memory_id_error_message),
                        };

                        let max_key_size = match &args.get(1).unwrap().expr.to_u32() {
                            Ok(value) => *value,
                            Err(_) => return Err(second_argument_size_error_message),
                        };

                        let max_value_size = match &args.get(2).unwrap().expr.to_u32() {
                            Ok(value) => *value,
                            Err(_) => return Err(third_argument_size_error_message),
                        };

                        Ok(AzleStableBTreeMapNode {
                            memory_id,
                            key_type,
                            max_key_size,
                            value_type,
                            max_value_size,
                        })
                    }
                    None => Err(arg_error_message),
                }
            }
            None => Err(type_arg_error_message),
        }
    }
}
