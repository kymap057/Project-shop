const body = document.getElementsByTagName('body')[0];
const cbxMode = document.querySelector('.checkbox-theme input[type="checkbox"]');
const darkMode = document.getElementById('dark-mode');
const lightMode = document.getElementById('light-mode');
const txtMode = document.getElementById('txt-mode');
const itemMode = document.getElementById('mode-dark-light');


function loader(){
   document.getElementById('loading').style.display = 'none';
}
setTimeout(loader, 500);

const switchTheme=(e)=> {
    if (e.target.checked) {
        modeDark();
    } else {
        modeLight();
    }
}
const modeLight = () => {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    lightMode.style.display = 'none';
    darkMode.style.display = 'block';
    txtMode.innerHTML = 'Dark Mode';
}
const modeDark = () => {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    darkMode.style.display = 'none';
    lightMode.style.display = 'block';
    txtMode.innerHTML = 'Light Mode';
}
const checkMode =()=>{
    let currentTheme = localStorage.getItem('theme');
    if(currentTheme){
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (cbxMode) {
            if (currentTheme === 'dark') {
                cbxMode.checked = true;
                modeDark();
            }
            else {
                cbxMode.checked = false;
                modeLight();
            }
        }
    }
    else{
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        if (cbxMode) {
            if (currentTheme === 'dark') {
                cbxMode.checked = true;
                modeDark();
            }
            else {
                cbxMode.checked = false;
                modeLight();
            }
        }
    }
} 
//click mode dark-light
window.onload = checkMode();
if (cbxMode) {
    cbxMode.addEventListener('change', switchTheme, false);
};
// click menu sub
window.onclick = function (e) {
    openAllDropdown(e);
}

const activeSidebar = () => {
    var icon = document.getElementById('navbar-icon');
    body.classList.toggle('sidebar-expand');
    if (icon.classList[1] === 'fa-bars') {
        icon.classList.add('fa-caret-down');
        icon.classList.remove('fa-bars');
    }
    else {
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-caret-down');
    }
}
const closeAllDropdown = () => {
    var dropdown = document.getElementsByClassName('dropdown-expand');
    for (let i = 0; i < dropdown.length; i++) {
        dropdown[i].classList.remove('dropdown-expand');
    }
}
const openAllDropdown = (e) => {
    if (!e.target.matches('.dropdown-toggle')) {
        closeAllDropdown();
    }
    else {
        var toggle = e.target.dataset.toggle;
        var content = document.getElementById(toggle);
        if (content.classList.contains('dropdown-expand')) {
            closeAllDropdown();
        }
        else {
            closeAllDropdown();
            content.classList.add('dropdown-expand')
        }
    }
}