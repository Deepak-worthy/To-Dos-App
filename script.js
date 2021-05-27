var form = document.getElementById('submit-form');
var itemList = document.getElementById('list');
let filter=document.getElementById('search');

form.addEventListener('submit', addItem);
itemList.addEventListener('click', deleteOrEdit);
filter.addEventListener('keyup',filterItems);

// Add item
function addItem(e){
    e.preventDefault();
    
    // Add text node with input value to li
    var li = document.createElement('li'); li.className = 'list-group-item';
    let input=document.getElementById('item');
    let desc=document.getElementById('description')
    let newItem = input.value;
    let newItemDesc = desc.value;
    input.value='';
    desc.value='';


    let span1=document.createElement('span');
    span1.appendChild(document.createTextNode(newItem));

    let span2=document.createElement('span');
    span2.className='Descrip';
    span2.appendChild(document.createTextNode(newItemDesc));

    li.appendChild(span1);
    
    //Append delete button to li
    var deleteBtn = document.createElement('button'); deleteBtn.className = 'btn-delete';
    deleteBtn.appendChild(document.createTextNode('Delete'));
    li.appendChild(deleteBtn);

    //Append Edit button to li
    var EditBtn = document.createElement('button'); EditBtn.className ='Edit';
    EditBtn.appendChild(document.createTextNode('Edit'));
    li.appendChild(EditBtn);
    
    let br=document.createElement('br');
    li.appendChild(br);
    li.appendChild(span2);
    // Append li to list
    itemList.appendChild(li);
}

// Delete or Edit item
function deleteOrEdit(e){
    const button = e.target;
    const li = button.parentNode;
    const ul = li.parentNode;
    
    if(button.textContent === 'Delete') {
        ul.removeChild(li);
    } 
    else if(button.textContent === 'Edit') {
        const span1 = li.firstElementChild;
        const span2=li.lastElementChild;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = span1.textContent;
        li.insertBefore(input, span1);
        li.removeChild(span1);
        li.removeChild(span2);
        button.textContent = 'save';
    } 
    else if(button.textContent === 'save') {
        const input = li.firstElementChild;
        const span = document.createElement('span');
        span.textContent = input.value;
        li.insertBefore(span, input);
        li.removeChild(input);
        button.textContent = 'Edit';
    }
}

// Filter Items
function filterItems(e) {
    var text = e.target.value.toLowerCase();
    
    var items = itemList.getElementsByTagName('li'); 
    let arr=Array.from(items);
    
    arr.forEach(function(item) {
        let itemName = item.firstElementChild.textContent;
        let itemDesc=item.lastElementChild.textContent;
        if(itemName.toLowerCase().indexOf(text) != -1 || itemDesc.toLowerCase().indexOf(text) != -1){
            item.style.display='block';
        } 
        else {
            item.style.display = 'none';
        }
    });
}