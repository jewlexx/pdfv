// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub enum OpenType {
    Pick,
    Default,
}

#[tauri::command]
async fn open_pdf(open_type: OpenType) -> Vec<u8> {
    dbg!(&open_type);
    match open_type {
        OpenType::Pick => {
            println!("Please pick a file to open");
            todo!()
        }
        OpenType::Default => include_bytes!("../assets/start.pdf").to_vec(),
    }
}

fn main() {
    println!(
        "{}",
        serde_json::to_string_pretty(&OpenType::Default).unwrap()
    );

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![open_pdf])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
