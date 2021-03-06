var App = (function(t) {

    var todosJSON = '[{"check": "true","text":"Mit Sass umsetzen"}, {"check": "false", "text":"Test"}]';
    
    var todosArray = t.getLocalStorage('daTodos') || JSON.parse(todosJSON);
    var arrowdown = document.querySelector(".todos__arrow");
    var todo_list = document.querySelector(".todos__list");
    var todo_shown = document.querySelector('#show');
    var itemsLeftSection = document.querySelector('.todos__items span');
    var todosInput = document.querySelector('.todos__input');

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





        todosInput.addEventListener('keydown', function(event) {
            if (event.key === "Enter" && todosInput.value !== "") {
                var dataArray = [];
                var dataArray = t.getLocalStorage('daTodos');
                dataArray.push({check:"false",text:todosInput.value});
                t.setLocalStorage('daTodos', dataArray);
                todosInput.value = "";
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
                t.itemsLeft(itemsLeftSection, t.todosShown(t.getLocalStorage('daTodos'), 'check', todos));
                t.renderList(todo_list, t.todosShown(t.getLocalStorage('daTodos'), 'check', todos));
                t.styleHeight(todo_list);
                console.log('sdfagsda');
            }
        });



        todo_list.addEventListener('click', function(event) {
            if (event.target.matches('li .todos__close')) {
                removeElement(event);
            } else if (event.target.matches('li input')) {
                TodoOrDone(event);
            } else if (event.target.matches('li .todos__up')) {
                moveElement(event, "up");
            } else if (event.target.matches('li .todos__down')) {
                moveElement(event, "down");
            }
          });



          function TodoOrDone(event) {
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
            }
            t.renderList(todo_list, t.todosShown(t.getLocalStorage('daTodos'), 'check', todos));
            t.styleHeight(todo_list);
            t.itemsLeft(itemsLeftSection, t.todosShown(t.getLocalStorage('daTodos'), 'check', todos));
        }



        function removeElement(event) {
            var dataArray = t.getLocalStorage('daTodos');
            dataArray.splice(event.target.parentNode.id, 1);
            t.setLocalStorage('daTodos', dataArray);
            
            if (document.querySelector('#all').checked) {
                t.renderList(todo_list, t.getLocalStorage('daTodos'));
                t.styleHeight(todo_list);
                t.itemsLeft(itemsLeftSection, t.getLocalStorage('daTodos'));
                return;
            } else if (document.querySelector('#open').checked) {
                var todos = "false";
            } else if (document.querySelector('#done').checked) {
                var todos = "true";
            }
            t.itemsLeft(itemsLeftSection, t.todosShown(t.getLocalStorage('daTodos'), 'check', todos));
            t.renderList(todo_list, t.todosShown(t.getLocalStorage('daTodos'), 'check', todos));
            t.styleHeight(todo_list);            
        }



        function moveElement(event, direction) {
            var index = parseInt(event.target.parentNode.id);
            var dataArray = t.getLocalStorage('daTodos');
            var removedElements = dataArray.splice(index, 1);
            if (direction == "up") {
                var newIndex = Math.max(0, index - 1);
            } else if (direction == "down") {
                var newIndex = Math.max(0, index + 1);
            }
            dataArray.splice(newIndex, 0, removedElements[0]);
            t.setLocalStorage('daTodos', dataArray);
            if (document.querySelector('#all').checked) {
                t.renderList(todo_list, t.getLocalStorage('daTodos'));
                return;
            } else if (document.querySelector('#open').checked) {
                var todos = "false";
            } else if (document.querySelector('#done').checked) {
                var todos = "true";
            }
            t.renderList(todo_list, t.todosShown(t.getLocalStorage('daTodos'), 'check', todos));
        }








        // on first load

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

        t.itemsLeft(itemsLeftSection, t.todosShown(t.getLocalStorage('daTodos'), 'check', todos));
        t.renderList(todo_list, t.todosShown(t.getLocalStorage('daTodos'), 'check', todos));
        t.styleHeightArrow(todo_list);
        t.toggleClass(arrowdown);

    };


    return {
        init: init
    };
})(Tools);

App.init();