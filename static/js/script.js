function get_view(page, callback) {
    let xhr = new XMLHttpRequest()
    xhr.open("GET", `./static/views/${page}.html`, true)
    xhr.onloadend = () => callback(page, xhr.response)
    xhr.send()
}

let title = document.querySelector("title").innerText

function render(page, data) {
    if (data) {
        document.querySelector("div").style.display = "none"
        let sep = document.querySelector("title").getAttribute("sep")
        let li = document.querySelectorAll("nav>li")

        let result = {},
            dummy_document = document.createElement("html")
        dummy_document.innerHTML = data
        let d_title = dummy_document.querySelector("title")
        if (d_title !== null) {
            result.title = d_title.innerText;
            dummy_document.querySelector("title").remove()
        }
        else { result.title = "NoTitle" }
        result.content = dummy_document.innerHTML

        document.querySelector("title").innerText = title + " " + sep + " " + result.title
        li.forEach(item => { if (item.getAttribute("id") === page) { item.className = "active" } else { item.removeAttribute("class") } })
        document.querySelector("main").innerHTML = result.content
    } else {
        document.querySelector("div").style.display = "block"
    }
}

document.querySelectorAll("nav>li").forEach(
    item => item.addEventListener(
        "click",
        () => get_view(item.id, render)
    )
)

get_view("anasayfa", render)