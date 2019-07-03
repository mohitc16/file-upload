function makeDroppable(element,callback)
{
    var input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('multiple', true);
    input.style.display = 'none';
    input.setAttribute('name','filetoupload')

    input.addEventListener('change', triggerCallback);
    element.appendChild(input);

    element.addEventListener('dragover', function(e) {
    e.preventDefault();
    e.stopPropagation();
    element.classList.add('dragover');
    });

    element.addEventListener('dragleave', function(e) {
        e.preventDefault();
        e.stopPropagation();
        element.classList.remove('dragover');
    });

    element.addEventListener('drop', function(e) {
    e.preventDefault();
    e.stopPropagation();
    element.classList.remove('dragover');
    element.style.backgroundColor = "green";
    triggerCallback(e);
    });

    element.addEventListener('click', function() {
        input.value = null;
        input.click();
    });

    function triggerCallback(e) {
        var files;
        if(e.dataTransfer) {
          input.files = e.dataTransfer.files;
          for(let i=0;i<input.files.length;i++)
          {
              file_list.textContent += "\r\n\n" + input.files[i].name;
          }
        } else if(e.target) {
          files = e.target.files;
        }
        callback.call(null, files);
    }
}

var element = document.querySelector('.droppable');
function callback(files) {
  // Here, we simply log the Array of files to the console.
    console.log(files);
}
makeDroppable(element, callback);

var file_list = document.querySelector('.file_list');