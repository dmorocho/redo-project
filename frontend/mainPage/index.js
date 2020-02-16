document.addEventListener("DOMContentLoaded", () => {
  let compResponse = document.querySelector("#compResponse");
  let mainSelect = document.querySelector("#mainSelect");
  let UserRequest = document.querySelector("#UserRequest");
  let ManageClassDiv = document.querySelector("#ManageClassDiv");
  let getClasses = document.querySelector("#getClasses");
  let AddClassFrm = document.querySelector("#AddClassFrm");
  let deleteClass = document.querySelector("#deleteClass");
  let deleteClassSec = document.querySelector("#deleteClassSec");
  let chooseStudentClass = document.querySelector("#chooseStudentClass");
  let chooseSClass = document.querySelector("#chooseSClass");
  let ManageStudentDiv = document.querySelector("#ManageStudentDiv");
  ManageClassDiv.style.display = "none";
  ManageStudentDiv.style.display = "none";
  compResponse.innerHTML = "";

  mainSelect.addEventListener("change", e => {
    // UserRequest.innerHTML = "";
    e.preventDefault();
    if (e.target.value === "class") {
      ManageClassDiv.style.display = "block";
      ManageStudentDiv.style.display = "none";
      loadClasses(deleteClassSec);
    } else if (e.target.value === "students") {
      ManageClassDiv.style.display = "none";
      ManageStudentDiv.style.display = "block";
      loadClasses(chooseStudentClass);
      loadClasses(chooseSClass);
    }
  });

  //LOAD CLASS IN SELECT
  const loadClasses = async select => {
    select.innerHTML = "";
    let defaultoptions = document.createElement("option");
    defaultoptions.innerText = "Select Class";
    defaultoptions.style.disabled;
    defaultoptions.style.selected;

    try {
      let res = await axios.get(`http://localhost:3000/class`);
      let classes = res.data.classess;
      classes.forEach(element => {
        let options = document.createElement("option");
        options.innerText = element.class_name;
        options.value = element.id;
        select.appendChild(options);
      });
    } catch (error) {
      console.log(error);
    }
  };
  //GETTING ALL CLASSES
  getClasses.addEventListener("click", async e => {
    compResponse.innerHTML = "";
    try {
      let res = await axios.get(`http://localhost:3000/class`);
      let classes = res.data.classess;
      let ul = document.createElement("ul");
      compResponse.innerHTML = "";
      let p = document.createElement("p");
      p.innerText = "Loading classes ...";
      compResponse.appendChild(p);
      setTimeout(() => {
        compResponse.innerHTML = "";
        classes.forEach(element => {
          let li = document.createElement("li");
          li.innerText = `Class: ${element.class_name} Teacher:${element.teacher_name}`;
          ul.appendChild(li);
        });
        compResponse.appendChild(ul);
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  });

  //ADDING CLASS
  AddClassFrm.addEventListener("submit", async e => {
    e.preventDefault();
    let class_name_add = document.querySelector("#classname");
    let teacher_name_add = document.querySelector("#teachername");
    try {
      let res = await axios.post(`http://localhost:3000/class`, {
        class_name: class_name_add.value,
        teacher_name: teacher_name_add.value
      });
      class_name_add.value = "";
      teacher_name_add.value = "";
      resDisplay = JSON.stringify(res.data);
      displayRes(resDisplay, "adding class...");
    } catch (error) {}
    loadClasses(deleteClassSec);
  });

  //DELETEING CLASS
  deleteClass.addEventListener("submit", async e => {
    e.preventDefault();
    let id = e.currentTarget.elements[0].value;
    try {
      let res = await axios.delete(`http://localhost:3000/class/${id}`);
      resDisplay = JSON.stringify(res.data);
      displayRes(resDisplay, "deleting class ...");
      loadClasses(deleteClassSec);
    } catch (error) {
      console.log(error);
    }
  });
  let addStudent = document.querySelector("#addStudent");

  addStudent.addEventListener("submit", async e => {
    e.preventDefault();
    debugger;
    let student_name = e.currentTarget.elements[0].value;
    let age = e.currentTarget.elements[1].value;
    let city = e.currentTarget.elements[2].value;
    let class_id = e.currentTarget.elements[3].value;
    let grade = e.currentTarget.elements[4].value;

    try {
      let res = await axios.post(`http://localhost:3000/students`, {
        student_name,
        age,
        city,
        class_id,
        grade
      });

      resDisplay = JSON.stringify(res.data);
      displayRes(resDisplay, "Adding Student ...");
    } catch (error) {
      console.log(error);
    }
  });

  let chooseStudent = document.querySelector("#chooseStudent");

  chooseStudent.addEventListener("submit", async e => {
    e.preventDefault();

    let id = e.currentTarget.elements[0].value;

    // if (e.currentTarget.elements[1].value === "on") {

    // }
    try {
      let res = await axios.get(`http://localhost:3000/class/${id}/students`);
      resDisplay = JSON.stringify(res.data);
      displayRes(resDisplay, "loading Student ...");
    } catch (error) {
      console.log(error);
    }
  });

  const displayRes = (resDisplay, event) => {
    compResponse.innerHTML = "";
    let p = document.createElement("p");
    p.innerText = event;
    compResponse.appendChild(p);
    setTimeout(() => {
      p.innerText = resDisplay;
      compResponse.appendChild(p);
    }, 1005);
  };
});
