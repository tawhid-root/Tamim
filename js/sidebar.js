let Menu_open = document.getElementById("Menu");
let Menu_close = document.getElementById("Menu_close");
let sidebar = document.getElementById("sidebar");
let main = document.getElementById("main");

Menu_open.addEventListener("click", function () {
  if (sidebar.classList.contains("close_sidebar")) {
    sidebar.classList.replace("close_sidebar", "open_sidebar");
  }
});

Menu_close.addEventListener("click", function () {
  if (sidebar.classList.contains("open_sidebar")) {
    sidebar.classList.replace("open_sidebar", "close_sidebar");
  }
});

if (sidebar.classList.contains("open_sidebar")) {
  main.addEventListener("click", function () {
    sidebar.classList.replace("open_sidebar", "close_sidebar");
  });
}
