function toggle_todos() {

    var arrowdown = document.querySelector(".todos__arrow");

    arrowdown.onclick = function() {

        arrowdown.classList.toggle('todos__arrow--active');
        var list = document.querySelector(".todos__list");
        if (!list.style.height) {
            list.style.height = list.scrollHeight + "px";
        } else {
            list.style.height = null;
        }

    }

}