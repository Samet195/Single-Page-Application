function fetch_view(page) {
    let result;
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        result = xhr.responseText;
    };

    xhr.open("GET", `./static/views/${page}.html`, false);
    xhr.send();

    return result;
}

export function view(page) {
    let result = {};
    let data = fetch_view(page);

    let dummy_document = document.createElement("html");
    dummy_document.innerHTML = data;
    result.title = dummy_document.querySelector("title").innerText;
    dummy_document.querySelector("title").remove();
    result.content = dummy_document.innerHTML;

    return result;
}