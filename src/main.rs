use std::fs::read_to_string;
use std::sync::Arc;
use tokio::sync::Semaphore;
mod request;
use std::fs::OpenOptions;
use std::io::Write;

#[tokio::main]
async fn main() {
    let proxies = read_to_string("./proxies.txt").expect("Unable to read file");
    
    let semaphore = Arc::new(Semaphore::new(1000));
    let mut handles = vec![];

    for line in proxies.lines() {
        let proxy = line.to_string();
        let permit_res = Arc::clone(&semaphore);

        // 2. Spawn a background task for each proxy
        let handle = tokio::spawn(async move {
            // Wait for a permit to become available
            let _permit = permit_res.acquire_owned().await.unwrap();
            
            let success = request::make_request(&proxy).await;
            
            if success {
                println!("Proxy Success: {}", proxy);
                let mut output_file = OpenOptions::new().write(true).append(true).create(true).open("./working_proxies.txt").unwrap();
                let _ = writeln!(output_file, "{}", proxy);
            } else {
                println!("Proxy Fail: {}", proxy);
            }
            // Permit is automatically released here when _permit drops
        });

        handles.push(handle);
    }
    for handle in handles {
        let _ = handle.await;
    }
    println!("All done!");
}