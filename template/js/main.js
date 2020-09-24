const body = document.getElementsByTagName('body')[0];
const cbx = document.getElementById('cbx-theme');


cbx.addEventListener('change', (event) => {
  if (event.target.checked) {
    body.classList.add('dark');
    body.classList.remove('light')
  } else {
    body.classList.add('light');
    body.classList.remove('dark')
  }
})
const  activeSidebar =()=>{
    var icon = document.getElementById('navbar-icon');
    body.classList.toggle('sidebar-expand');
    if(icon.classList[1]==='fa-bars'){
       icon.classList.add('fa-caret-down');
       icon.classList.remove('fa-bars');
    }
    else{
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-caret-down');
    }
}
// click menu sub
window.onclick = function(e){
   openAllDropdown(e);
}
const closeAllDropdown=()=>{
    var dropdown = document.getElementsByClassName('dropdown-expand');
    for (let i = 0; i < dropdown.length; i++) {
        dropdown[i].classList.remove('dropdown-expand');
    }
}
const openAllDropdown=(e)=>{
    if(!e.target.matches('.dropdown-toggle')){
        closeAllDropdown();
    }
    else{
        var toggle = e.target.dataset.toggle;
        var content = document.getElementById(toggle);
        if(content.classList.contains('dropdown-expand')){
            closeAllDropdown();
        }
        else{
            closeAllDropdown();
            content.classList.add('dropdown-expand')
        }
    }
}