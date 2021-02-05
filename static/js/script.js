import { view } from "./views.js";

let title = document.querySelector("title").innerText;
let sep = document.querySelector("title").getAttribute("sep");
let li = document.querySelectorAll("nav>li");

function render(page) {
    let data = view(page);
    document.querySelector("title").innerText = title + " " + sep + " " + data.title;
    /*******************************************************************************/
    li.forEach(
        item => {
            if (item.getAttribute("id") == page) {
                item.className = "active"
            } else {
                item.removeAttribute("class")
            }
        }
    );
    /*******************************************************************************/
    document.querySelector("main").innerHTML = data.content;
}

li.forEach(
    item => item.addEventListener(
        "click",
        () => {
            render(item.id)
        }
    )
);

render("anasayfa");