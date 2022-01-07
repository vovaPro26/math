const pages = {
    startPage: "startPage",
    testPage: "testPage",
    resultPage: "resultPage"
}

const showPage = function(pageId) {
    document.getElementById(pageId).classList.remove("hiden");
}

const hidePage = function(pageId) {
    document.getElementById(pageId).classList.add("hiden");
}

const changePage = function(png) {
    let pagesArr = Object.values(pages)
    for(let pageId of pagesArr){
        pageId === png ? 
        showPage(pageId) : 
        hidePage(pageId);
    }
}