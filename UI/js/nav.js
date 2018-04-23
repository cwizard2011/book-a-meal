const resNav = () => {
    const res = document.getElementById("topNav");
    if (res.className === "nav-bar") {
        res.className += " responsive";
    } else {
        res.className = "nav-bar";
    }
}
