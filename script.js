//Fetch data from the json file and store it in an array
let dataArray = [];
//fetch data function
async function fetchData(){
    const response = await fetch("./demo-json-data.json");
    const data = await response.json();
    dataArray = data;
}

//we wait for the page to load
window.addEventListener('load', ()=>{
    fetchData().then(()=>{
        populateTable(dataArray);

    })
})

function populateTable(studentArray){
    const tbody = document.getElementById("tBody");
    tbody.innerHTML = ``;
    studentArray.forEach(student => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
                    <td>${student.id}</td>
                    <td class="nameTd">
                        <img class="profilePic" src="${student.img_src}" alt="prof-pic">
                        <span>${student.first_name} ${student.last_name}<span>
                    </td>
                    <td>${student.gender}</td>
                    <td>${student.class}</td>
                    <td>${student.marks}99</td>
                    <td>${(student.passing === true)?"Passed":"Failed"}</td>
                    <td>${student.email}</td>
                    <td>${student.city}</td>
                    `
        tbody.appendChild(tr);
    });
}

document.getElementById("sort-az").addEventListener('click', () => sortByName("ascending"));
document.getElementById("sort-za").addEventListener('click', () => sortByName('descending'));
document.getElementById("sortMarks").addEventListener('click', () => sortByMarks);
document.getElementById("sortPassing").addEventListener('click', () => sortByPassing);
document.getElementById("sortClass").addEventListener('click', () => sortByClass);
document.getElementById("sortGender").addEventListener('click', () => sortByGender);

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

//1.) Search functionality
searchBtn.addEventListener("click", () => {

    const searchQuery = searchInput.value.toLowerCase();
    const filteredStudents = dataArray.filter(stud => 
        stud.first_name.toLowerCase().includes(searchQuery) ||
        stud.last_name.toLowerCase().includes(searchQuery) ||
        stud.email.toLowerCase().includes(searchQuery)
    );
    populateTable(filteredStudents);

})

//2.) & 3.) sort a-z or z-a
function sortByName(order){
    dataArray.sort((a,b) => {
        const fullNameA = `${a.first_name} ${a.last_name}`;
        const fullNameB = `${b.first_name} ${b.last_name}`;
        return (order === "ascending")? fullNameA.localeCompare(fullNameB) : fullNameB.localeCompare(fullNameA);

    });
    populateTable(dataArray);
}

// 4.) 
function sortByMarks(){
    dataArray.sort((a, b) => a.marks - b.marks);
    populateTable(dataArray);
}

//5.)
function sortByPassing(){
    const passedStudents = dataArray.filter( student => student.passing);
    populateTable(passedStudents);

}
//6.)
function sortByClass(){
    dataArray.sort((a, b) => a.class - b.class);
    populateTable(dataArray);
    
}

//7.)
function sortByGender(){
    const maleStudents = dataArray.filter(student => student.gender.toLowerCase() === "male");
    const femaleStudents = dataArray.filter(student => student.gender.toLowerCase() === "female");

    const combinedStudents = [...maleStudents, ...femaleStudents];
    populateTable(combinedStudents);

}