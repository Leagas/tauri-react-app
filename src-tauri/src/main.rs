// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::env;
use tauri::State;
use tokio::fs;
use tokio::runtime::Runtime;

mod lib;

use lib::environment::Environment;

// AppState struct only contains Environment
#[derive(Default)]
struct AppState {
    environment: Environment,
}

impl AppState {
    async fn new() -> Self {
        // Read from the JSON file and initialize the environment
        let current_dir = env::current_dir().expect("Failed to get current directory");
        let formatted_dir = current_dir.to_string_lossy().to_string().replace("\\", "/");
        let file_path = format!("{}/src/data/client.json", formatted_dir);
        let file = fs::read_to_string(file_path).await;
        match file {
            Ok(contents) => {
                let environment = Environment::new(&contents).unwrap();
                AppState { environment }
            }
            Err(err) => {
                eprintln!("Error reading file: {}", err);
                Default::default()
            },
        }
    }

    fn get_environment(&self) -> &Environment {
        &self.environment
    }
}

#[tauri::command]
async fn list(state: State<'_, AppState>) -> Result<String, String> {
    let environment = state.get_environment();
    let json_string =
        serde_json::to_string(&environment.client).expect("Failed to serialize to JSON");
    // Access the environment or perform other operations as needed
    // println!("{}", json_string);
    Ok(format!("Hello, {}!", json_string))
}

fn main() {
    let app_state = Runtime::new().unwrap().block_on(AppState::new());
    tauri::Builder::default()
        .manage(app_state)
        .invoke_handler(tauri::generate_handler![list])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
