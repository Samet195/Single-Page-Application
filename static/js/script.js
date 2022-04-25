// Importing cookies api.
import Cookies from "./js.cookie.min.js"

// Assigning project name to a constant.
const title = document.querySelector("title").innerText

// Fetches requested view files from server.
function get_view(page, remember = true) {
    let xhr = new XMLHttpRequest()
    xhr.open("GET", `./static/views/${page}.html`)
    xhr.onreadystatechange = () => { // Handles HTTP status codes.
        switch (xhr.status) {
            case 0:
                render(page, false)
                break
            case 200:
                render(page, xhr.response)
                assign_links()

                window.scrollTo(0, Cookies.get(`scroll_${Cookies.get("last_page") || "home"}`))

                if (remember) {
                    Cookies.set("last_page", page)
                }
                break
            case 404:
                get_view(xhr.status, false)
                setTimeout(get_view, 5000, [Cookies.get("last_page")])
                break
        }
    }
    xhr.send()
}

// Renders parsed view data.
function render(page, data) {
    let div_alert = document.querySelector("div.alert-danger")

    if (data) { // <- This for checking network connection.
        div_alert.style.display = "none"
        /*****************************************************/
        let result = parse(data)
        /*****************************************************/
        let sep = document.querySelector("title").getAttribute("sep")
        document.querySelector("title").innerText = `${title} ${sep} ${result.title}`
        /*****************************************************/
        document.querySelectorAll("[link]").forEach(item => {
            if (item.getAttribute("link") === page) {
                item.className = "active"
            } else {
                item.removeAttribute("class")
            }
        })
        /*****************************************************/
        document.querySelector("main").innerHTML = result.content
    } else {
        div_alert.style.display = "block"
    }
}

// Parses fetched view data.
function parse(data) {
    let result = {}
    let dummy_document = document.createElement("html")

    dummy_document.innerHTML = data
    let d_title = dummy_document.querySelector("title")

    if (d_title !== null) {
        result.title = d_title.innerText;
        d_title.remove()
    } else {
        result.title = "<No Title>"
    }

    result.content = dummy_document.innerHTML

    return result
}

// Assigns "onclick" event handlers to elements which has "link" attribute.
function assign_links() {
    document.querySelectorAll("[link]").forEach(
        item => {
            let rem = item.getAttribute("remember") ? false : true
            item.onclick = () => {
                get_view(item.getAttribute("link"), rem)
            }
        }
    )
}

// Saves last scroll location on scroll.
window.onload = () => {
    window.onscroll = () => {
        Cookies.set(`scroll_${Cookies.get("last_page") || "home"}`, window.scrollY)
    }
}

// Initially to open the last page or home page.
get_view(Cookies.get("last_page") || "home")
