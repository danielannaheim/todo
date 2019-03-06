var App = (function(t) {

    var todosJSON = '[{"check": "true","text":"Mit Sass umsetzen"}, {"check": "false", "text":"Test"}]';
    
    var todosArray = t.getLocalStorage('daTodos') || JSON.parse(todosJSON);
    var arrowdown = document.querySelector(".todos__arrow");
    var todo_list = document.querySelector(".todos__list");
    var todo_shown = document.querySelector('#show');
    var itemsLeftSection = document.querySelector('.todos__items span');

    t.setLocalStorage('daTodos', todosArray);

    var init = function() {

        arrowdown.addEventListener('click', function() {
            t.toggleClass(arrowdown);
            t.styleHeightArrow(todo_list);
        });
        

        todo_shown.addEventListener('change', t.delegate('input', function(event) {
            if (event.target.id === "all") {
                t.renderList(todo_list, t.getLocalStorage('daTodos'));
                t.styleHeight(todo_list);
                t.itemsLeft(itemsLeftSection, t.getLocalStorage('daTodos'));
                return;
            } else if (event.target.id === "open") {
                var todos = "false";
            } else if (event.target.id === "done") {
                var todos = "true";
            } else {
                console.log('what?');
            }
            t.renderList(todo_list, t.todosShown(t.getLocalStorage('daTodos'), 'check', todos));
            t.styleHeight(todo_list);
            t.itemsLeft(itemsLeftSection, t.todosShown(t.getLocalStorage('daTodos'), 'check', todos));
        }));


        todo_list.addEventListener('click', t.delegate('li input', function(event) {
            var posNumber = event.target.id.split('-');
            var posNumber = posNumber[1];
            if (event.target.checked === true) {
                var currentArray = t.getLocalStorage('daTodos');
                currentArray[posNumber].check = "true";
            } else {
                var currentArray = t.getLocalStorage('daTodos');
                currentArray[posNumber].check = "false";
            }
            t.setLocalStorage('daTodos', currentArray);

            if (document.querySelector('#all').checked) {
                t.renderList(todo_list, t.getLocalStorage('daTodos'));
                t.styleHeight(todo_list);
                t.itemsLeft(itemsLeftSection, t.getLocalStorage('daTodos'));
                return;
            } else if (document.querySelector('#open').checked) {
                var todos = "false";
            } else if (document.querySelector('#done').checked) {
                var todos = "true";
            } else {
                console.log('what?');
            }

            t.renderList(todo_list, t.todosShown(t.getLocalStorage('daTodos'), 'check', todos));
            t.styleHeight(todo_list);
            t.itemsLeft(itemsLeftSection, t.todosShown(t.getLocalStorage('daTodos'), 'check', todos));
        }));




        t.itemsLeft(itemsLeftSection, t.getLocalStorage('daTodos'));
        t.renderList(todo_list, todosArray);
        t.styleHeightArrow(todo_list);
        t.toggleClass(arrowdown);

    };


    return {
        init: init
    };
})(Tools);

App.init();