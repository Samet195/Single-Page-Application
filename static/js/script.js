import { doc, log, info, warn, error } from "./utilities.js";
import { views as view } from "./views.js";

let title = doc.querySelector("title").innerText;
let sep = doc.querySelector("title").getAttribute("sep");
let li = doc.querySelectorAll("nav>li");

function render(page) {
    doc.querySelector("title").innerText = title + " " + sep + " " + view[page].title;
    /*********************************************************************************/
    li.forEach(
        item => {
            if (item.getAttribute("id") == page) {
                item.className = "active"
            } else {
                item.removeAttribute("class")
            }
        }
    );
    /*********************************************************************************/
    doc.querySelector("main").innerHTML = view[page].content;
}

li.forEach(
    item => item.addEventListener(
        "click",
        () => {
            render(item.getAttribute("id"))
        }
    )
);

render("anasayfa");