const list=document.getElementById('list');
const check=document.getElementById('check-btn');

const countries=[
    'Canada',
    'japan',
    'Pakistan',
    'China',
    'United states',
    'United Kingdom',
    'Australia'

]
let dragindex;
let countriesArray=[];
checklist();
function checklist(){
    [...countries]
    .map(a=>({value:a, sort:Math.random()}))
    .sort((a,b)=>a.sort-b.sort)
    .map(a=>a.value)
    .forEach((country,index)=>{
        const items=document.createElement('li');
        items.setAttribute('data-index',index)
        items.innerHTML=`
        <span class="number">${index+1}</span>
        <div class="draggable" draggable="true">
        <p>${country}</p>
        </div>
        `;
        countriesArray.push(items);
        list.appendChild(items);
    })
}
addEventListener();

function dragstart(){
    dragindex=+this.closest('li').getAttribute('data-index');
}
function dragOver(e){
    e.preventDefault();
};
function dragDrop(){
    const endindex=this.getAttribute('data-index');
    swap(dragindex,endindex);
    this.classList.remove('over');
};
function swap(fromindex,toindex){
    const itemone= countriesArray[fromindex].querySelector('.draggable');
    const itemtwo= countriesArray[toindex].querySelector('.draggable');
    countriesArray[fromindex].appendChild(itemtwo);
    countriesArray[toindex].appendChild(itemone);
}
function dragEnter(){
    this.classList.add('over');

};
function dragLeave(){
    this.classList.remove('over');

};
function checkorder(){
  countriesArray.forEach((listitem,index)=>{
      const personname=listitem.querySelector('.draggable').innerText.trim();
      if(personname!==countries[index]){
          listitem.classList.add('wrong');
      }else{
          listitem.classList.remove('wrong');
          listitem.classList.add('right');
      }
  })
}
  function addEventListener(){
    const draggables=document.querySelectorAll('.draggable');
    const items=document.querySelectorAll('.list li');
    draggables.forEach(draggable =>{
        draggable.addEventListener('dragstart', dragstart);
    });
    items.forEach(item=>{
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    })
};

check.addEventListener('click', checkorder);
