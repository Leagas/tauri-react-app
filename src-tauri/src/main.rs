// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// mod service;
// use service::client::Client;

// use serde_json;
use std::env;
use tokio::fs;

#[tauri::command]
async fn client() -> Result<String, String> {
    // Open the file (change "example.txt" to the path of your file)
    let current_dir = env::current_dir().expect("Failed to get current directory");
    let formatted_dir = current_dir.to_string_lossy().to_string().replace("\\", "/");
    let file_path = format!("{}/src/data/client.json", formatted_dir);

    // Read the contents of the file into a String asynchronously
    match fs::read_to_string(file_path).await {
        Ok(contents) => Ok(contents),
        Err(err) => Err(format!("Error reading file: {}", err)),
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![client])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
