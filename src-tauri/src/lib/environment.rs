use serde::{Deserialize, Serialize};

use crate::lib::client::Client;

#[derive(Debug, Default, Serialize, Deserialize)]
pub struct Environment {
    pub client: Vec<Client>
}

impl Environment {
    pub fn new(json_array: &str) -> Result<Self, serde_json::Error> {
        let client: Vec<Client> = serde_json::from_str(json_array)?;
        Ok(Environment { client })
    }

    pub fn list() -> String {
        format!("Test")
    }
}