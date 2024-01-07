use serde::{Deserialize, Serialize};
use aws_sdk_dynamodb as dynamodb;

#[derive(Debug, Serialize, Deserialize)]
pub struct DynamoDB {
    pub name: String,
    pub credentials: Credentials
}

impl DynamoDB {
    pub fn new(name: String, credentials: Credentials) -> Self {
        DynamoDB { name, credentials }
    }
}
