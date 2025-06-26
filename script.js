const bar=document.getElementById('menuicon');
const closed=document.getElementById('close');
const nav=document.getElementById('h-List');
if(bar){
    bar.addEventListener('click',()=>{
    nav.classList.add('flag');
    });
}
if(close){
    closed.addEventListener('click',()=>{
    nav.classList.remove('flag');
    });
}


