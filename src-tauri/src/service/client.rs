use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Client {
    pub name: String,
    pub id: u32,
    // Add other client-specific fields as needed
}

impl Client {
    // Constructor to create a new client
    pub fn new(name: String, id: u32) -> Self {
        Client { name, id }
    }

    // Method to list clients (for demonstration purposes, returning a Vec<Client>)
    pub fn list() -> Vec<Client> {
        // In a real application, you would fetch the list from a data source
        // For demonstration, we create a couple of clients manually
        let client1 = Client::new("Client A".to_string(), 1);
        let client2 = Client::new("Client B".to_string(), 2);

        vec![client1, client2]
    }
}

fn main() {
    // Example usage
    let clients = Client::list();

    // Print the list of clients
    for client in clients {
        println!("{:?}", client);
    }
}
