class Course {
    constructor(title,instructor,image){
        this.courseId = Math.floor(Math.random()*(Math.random()*10000000));
        this.title = title;
        this.instructor = instructor;
        this.image = image;
    }
}

class UI{
    addCourseToList(course){
        const list = document.getElementById('course-list');
    
        var html = `
        <tr>
            <td><img class="rounded img-fluid list-img" src="img/${course.image}"</td>
            <td>${course.title}</td>
            <td>${course.instructor}</td>
            <td><a href"#" data-id="${course.courseId}" class="btn btn-danger btn-sm text-white delete">Delete</a></td>
        </tr>
        `;
    
        list.innerHTML += html;
    }
    clearControls(){
        const title = document.getElementById('title').value="";
        const instructor = document.getElementById('instructor').value="";
        const image = document.getElementById('image').value="";
    }
    deleteCourse(element){
        if(element.classList.contains('delete')){
            const ui = new UI();
            ui.showAlert('The course has been deleted','danger');
            element.parentElement.parentElement.remove();
        }
    }
    showAlert(message,className){
        var alert = `
        <div class="alert alert-${className}">
        ${message}
        </div>
        `;
        
        const row = document.querySelector('.row');
        row.insertAdjacentHTML('beforebegin',alert);
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 1800);
    }
}

class Storage{
    static getCourses(){
        let courses;

        if(localStorage.getItem('courses')==null){
            courses=[];
        }
        else{
            courses= JSON.parse(localStorage.getItem('courses'));
        }

        return courses;
    }

    static displayCourse(){
        const courses = Storage.getCourses();

        courses.forEach(course => {
            const ui = new UI();
            ui.addCourseToList(course);
        });
    }

    static addCourse(course){
        const courses = Storage.getCourses();
        courses.push(course);
        localStorage.setItem('courses',JSON.stringify(courses));
    }

    static deleteCourse(element){
        if(element.classList.contains('delete')){
            var id = element.getAttribute('data-id');
        }

        const courses = Storage.getCourses();
        courses.forEach((course,index) => {
            if(course.courseId == id){
                courses.splice(index,1);
            }
        });

        localStorage.setItem('courses',JSON.stringify(courses));
    }
}

document.addEventListener('DOMContentLoaded',Storage.displayCourse());

document.getElementById('new-course').addEventListener('submit',(e) => {
    const title = document.getElementById('title').value;
    const instructor = document.getElementById('instructor').value;
    var image;
    if(document.getElementById('image').value == ""){
        image = '404.png';
    }
    else{
        image = `${document.getElementById('image').value}.jpg`;
    }


    //create UI
    const ui = new UI();

    if(title==''|| instructor==''){
        ui.showAlert('Please complete the form','warning');
    }
    else{
         //create course
        const course = new Course(title,instructor,image);
        //add course to list
        ui.addCourseToList(course);
        //clear controls
        ui.clearControls();
        //save to LS
        Storage.addCourse(course);

        ui.showAlert('The course has been added','success');
    }

    e.preventDefault();
})

document.getElementById('course-list').addEventListener('click',(e) => {
    const ui = new UI();
    ui.deleteCourse(e.target);
    Storage.deleteCourse(e.target);
})