
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function Save()
{
	var btn = document.getElementById("btn-save");
	btn.onclick=function()
	{
		var id=document.getElementById("id").value;
        var name=document.getElementById("name").value;
        var email=document.getElementById("email").value;
        if(_.isEmpty(id))
        {
        	document.getElementById("name-error").innerHTML="  Nhập Mã Sinh Viên";
        }
        else
        {
        	document.getElementById("name-error").innerHTML="";
        }
        if(_.isEmpty(name))
        {
        	document.getElementById("name-error").innerHTML="  Nhập Tên";
        }
        else
        {
        	document.getElementById("name-error").innerHTML="";
        }
        if(_.isEmpty(email))
        {
        	document.getElementById("email-error").innerHTML="  Nhập Email";
        }
        else if(!validateEmail(email))
        {
        	document.getElementById("email-error").innerHTML="  Email Sai Định Dạng";
        	email="";
        }
        else
        {
        	document.getElementById("email-error").innerHTML="";
        }
       
        if(id && name && email)
        {
        	let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) :  [] ;
        	students.push({
        		id:id,
        		name:name,
        		email:email

        	});
        	localStorage.setItem('students',JSON.stringify(students));
        	renderListStudent();       	
	    }
	}  
}

function renderListStudent()
{
	let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) :  [] ;
	if(students.length==0)
	{
		document.getElementById("list-student").style.display='none';
		return false;
	}
	document.getElementById("list-student").style.display='block';
	let tableContent=`
        	<tr>
        	    <td>STT</td>
	    		<td>Mã Sinh Viên</td>
	    		<td>Tên Sinh Viên</td>
	    		<td>Email</td>
	    	</tr>`;
	students.forEach((student,index)=>{
	 	let studentId= index;
	 	index++;
        tableContent += `
             <tr>
	    		<td>${index}</td>
	    		<td>${student.id}</td>
	    		<td>${student.name}</td>
	    		<td>${student.email}</td>
	    		<td>
	    		<a href="#" onclick='updateStudent(${studentId})'>Edit</a> | 
	    		<a href="#" onclick='deleteStudent(${studentId})'>Delete</a>
	    		</td>
	    	</tr>`;

    });
    document.getElementById("grid-students").innerHTML=tableContent;
}
function deleteStudent(id)
{
	let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) :  [] ;
	students.splice(id,1);
	localStorage.setItem('students',JSON.stringify(students));
	renderListStudent();
}
function updateStudent(id)
{
   let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) :  [] ;
   students.forEach((student)=>{
	 	if(student.id==id+1)
	 	{
	 		var nameElement= document.querySelector('.form-student>#name');
	 		nameElement.value=student.name;
	 		var emailElement= document.querySelector('.form-student>#email');
	 		emailElement.value=student.email;
	 		var btn = document.getElementById("btn-save");
	 		btn.onclick=function()
	 		{
	 			student.name=nameElement.value;
	 			student.email=emailElement.value;
	 			localStorage.setItem('students',JSON.stringify(students));
	 			renderListStudent();
	 		}
	 	}
    });
    
}
Save();