function fetch_view(page) {
    fetch(`./static/views/${page}.html`)
        .then(response => response.text())
        .then(html => views[page].content = html)
}

export let views = {
    anasayfa: {
        title: "Anasayfa",
        content: fetch_view("anasayfa")
    },
    sayfa1: {
        title: "Sayfa 1",
        content: fetch_view("sayfa1")
    },
    sayfa2: {
        title: "Sayfa 2",
        content: fetch_view("sayfa2")
    }
}