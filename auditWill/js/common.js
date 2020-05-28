$(document).ready(function() {

  $(".popup_c").magnificPopup();
	 /*$(".popup_c").magnificPopup({
    type: 'inline',
    removalDelay: 500, //delay removal by X to allow out-animation
    callbacks: {
        beforeOpen: function () {
            this.st.mainClass = this.st.el.attr('data-effect');
        }
    },
    midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
  }); */

     //Аякс отправка форм
    var form_id='.form';    

    $(form_id).submit(function(evt){//обработчик события submit для формы                           
        var http = new XMLHttpRequest(), f = this; 
        var named;                  
        evt.preventDefault();
        var check;
        if($(f).find($('input:checkbox')).prop('checked')) {check = "check"; console.log(check);}
        else {check = "uncheck"; console.log(check);}
        

        http.open("POST", "intmail.php", true);//загрузка mail.php
        
        http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        http.send("tokenF=" + f.tokenF.value +"&name=" + f.name.value +"&phone=" + f.phone.value + "&check=" + check);
        http.onreadystatechange = function() {//функция, которую запрос вызовет, когда получит ответ с сервера
            if (http.readyState == 4 && http.status == 200) {             
              named=http.responseText;// из отправленной формы            
              f.phone.removeAttribute('value'); // очистить поле сообщения (две строки)
              f.phone.value='';
              $(f).magnificPopup('close');                
              $.magnificPopup.open({
                    items: {
                        src: '#modal1_thanks' 
                    },
                    type: 'inline'
                });//открытие окна с благодарностью 
                      
            }
        }
          http.onerror = function() {
            alert('Извините, данные не были переданы');     
          }
      });//конец 
  	
});