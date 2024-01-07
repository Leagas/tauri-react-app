use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Client {
    pub name: String,
    pub credentials: Credentials
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Credentials {
    region: String,
    access_key_id: String,
    secret_access_key: String
}

impl Client {
    pub fn new(name: String, credentials: Credentials) -> Self {
        Client { name, credentials }
    }
}
