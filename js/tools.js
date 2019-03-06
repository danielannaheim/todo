var Tools = (function() {



    var delegate = function(target, callback) {
        return function(event) {
            if (event.target && event.target.matches(target)) {
                callback(event);
            }
        };
    };
    
    
    
    var removeElement = function(element) {
        element.parentNode.removeChild(element);
    };



    var toggleClass = function(element) {
        element.classList.toggle('--active');
    };



    var styleHeightArrow = function(element) {
        if (!element.style.height) {
            element.style.height = element.scrollHeight + "px";
        } else {
            element.style.height = null;
        }
    };



    var styleHeight = function(element) {
        if (element.lastChild != null) {
            var newHeight = element.lastChild.getBoundingClientRect().bottom;
            var listFromTop = element.getBoundingClientRect().top;
            element.style.height = newHeight - listFromTop + "px";
        } else {
            element.style.height = 0 + "px";
        }

    };



    var renderList = function(list, array) {
        list.innerHTML = "";
        array.forEach(function(element, index) {
          if (element.check === "true") {
            var check = "checked";
          } else {
            var check = "";
          }
          var li = document.createElement('li');
          li.id = index;
          li.innerHTML = "<input type='checkbox' id='todos__checkbox-" + index + "' " + check + ">";
          li.innerHTML += "<label for='todos__checkbox-" + index + "'></label>";
          li.innerHTML += "<span>" + element.text + "</span>";
          li.innerHTML += `<button class='todos__close'></button>`;
          list.appendChild(li);
        });
      };



      var todosShown = function(array, attribute, value) {
              return array.filter(function(element) {
                return element[attribute] === value;
              });
      };
      


      var setLocalStorage = function(itemName, array) {
          localStorage.setItem(itemName, JSON.stringify(array));
      };



      var getLocalStorage = function(itemName) {
          var JSONobject = localStorage.getItem(itemName);
          return JSON.parse(JSONobject);
      };


      var itemsLeft = function(section, array) {
          section.innerHTML = array.length + " item(s)";
      };



    
    return { 
        delegate: delegate,
        removeElement: removeElement,
        toggleClass: toggleClass,
        styleHeightArrow: styleHeightArrow,
        styleHeight: styleHeight,
        renderList: renderList,
        todosShown: todosShown,
        setLocalStorage: setLocalStorage,
        getLocalStorage: getLocalStorage,
        itemsLeft: itemsLeft
    };
    
    })();