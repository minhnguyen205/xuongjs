import {addQuiz} from '../services/api.js'

const app ={
    handleAdd: function(){
        // 1 Bắt sự kiện submit
        const form = document.getElementById('addForm')
            .addEventListener("submit",async(e)=>{
            e.preventDefault();

            // 2. lấy input
            const inputTitle = document.getElementById('title');
            const inputIsActive = document.getElementById('isActive');
            const inputTime = document.getElementById('time')
            const inputDescription = document.getElementById('description');

            //3 . validate
            if(!inputTitle.value.trim()){
                alert("Cần nhập thông tin tên quiz");
                inputTitle.focus();
                return;
            }

            if(!inputTime.value.trim()){
                alert("Cần nhập thông tin thời gian");
                inputTime.focus();
                return; 
            }

            //4. lấy dữ liệu
            const data = {
                title : inputTitle.value,
                isActive : inputIsActive.checked,
                time: inputTime.value,
                description :inputDescription.value || ""
            }

            //5. thêm mới db
            const res = await addQuiz(data);
            window.location = `addQuestion.html?id=${res.id}`
            alert("Thêm thành công");
            console.log(res);
            
            
        })
    },
    start: function(){
        this.handleAdd();
    }
}

app.start();