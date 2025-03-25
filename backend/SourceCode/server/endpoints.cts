const g_cExpress = require("express")
const g_cPath = require("path")

function g_oSetUp() {
    const l_coApp = g_cExpress()
    l_coApp.use(g_cExpress.static(g_cPath.join(__dirname, "frontend")))
    l_coApp.get("/", (_, a_oResponse) => a_oResponse.redirect("/HomePage.htm"))
    l_coApp.get("*", function(_, a_oResponse) {
        a_oResponse.sendFile(g_cPath.join(__dirname, "frontend", "HomePage.htm"),
            a_oError => a_oError && a_oResponse.status(404).sendFile(g_cPath.join(__dirname, "frontend", "404.htm")))
    })
    return l_coApp
}
module.exports = g_oSetUp