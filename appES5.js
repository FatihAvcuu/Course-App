function Course(title,instructor,image){
    this.title = title;
    this.instructor = instructor;
    this.image = image;
}

//UI constructor
function UI(){

}

UI.prototype.addCourseToList = function(course){
    const list = document.getElementById('course-list');

    var html = `
    <tr>
        <td><img class="rounded img-fluid list-img" src="img/${course.image}"</td>
        <td>${course.title}</td>
        <td>${course.instructor}</td>
        <td><a href"#" class="btn btn-danger btn-sm text-white delete">Delete</a></td>
    </tr>
    `;

    list.innerHTML += html;
}

UI.prototype.clearControls = function(){
    const title = document.getElementById('title').value="";
    const instructor = document.getElementById('instructor').value="";
    const image = document.getElementById('image').value="";
}

UI.prototype.deleteCourse = function(element){
    if(element.classList.contains('delete')){
        element.parentElement.parentElement.remove();
    }
}

UI.prototype.showAlert = function(message,className){
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


document.getElementById('new-course').addEventListener('submit',function(e){
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

        ui.showAlert('The course has been added','success');
    }

    e.preventDefault();
})

document.getElementById('course-list').addEventListener('click',function(e){
    const ui = new UI();
    ui.deleteCourse(e.target);
    ui.showAlert('The course has been deleted','danger');
})