use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Client {
    pub name: String,
    pub id: u32
}

impl Client {
    // Constructor to create a new client
    pub fn new(name: String, id: u32) -> Self {
        Client { name, id }
    }
}
