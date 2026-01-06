use reqwest::Proxy;

pub async fn make_request(proxy_url: &str) -> bool {
    let proxy = Proxy::all(proxy_url).unwrap();
    let client = reqwest::Client::builder().proxy(proxy).build().unwrap();
    let response = client.get("https://api.ipify.org").send().await;
    if response.is_ok() {
        let _response_data = response.unwrap().text().await.unwrap();
        // println!("{}", response_data); // Should just return the IP.
        return true;
    } else {
        return false;
    }
}