//function getElementById
function getID(id, error, style, color){
    var err = $(id).text(error).css(style, color);
    return err;
}

// function check username
function checkUsername(user){
    if(user == null || user == ''){
        getID('#messageUser',"User name can't be blank",'color','red');
        return false;
    }
    if(user.length < 6){
        getID('#messageUser',"Username length must be atleast 6 characters long.",'color','red');
        return false; 
    }else{
         getID('#messageUser','','','');
    }
}

//function check Email
function checkEmail(email){
    var validateEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if(email == null || email == ''){
        getID('#messageEmail',"Email can't be blank",'color','red');
        return false; 
    }
    if(validateEmail.test(email)){
        getID('#messageEmail','','','');
    }else{
        getID('#messageEmail',"Your email should follow the format name@domain.com",'color','red');
        return false; 
    }
}

//function check password
function checkPassword(pass){
    if(pass == null || pass == ''){
        getID('#messagePass',"Password can't be blank",'color','red');
        return false;
    }
    if(pass.length < 6){
        getID('#messagePass',"Username length must be atleast 6 characters long.",'color','red');
        return false; 
    }else{
        getID('#messagePass','','','');
    }
//    else{
//        if(/[a-z]/.test(pass) && /[A-Z]/.test(pass) && /\W/.test(pass) && /[1-9]/.test(pass)){
//        getID('#messagePass','','',''); 
//        }else{
//            getID('#messagePass',"Your password should contains Uppaercase, one of !@#$%^&*()_+ and number",'color','red');  
//            return false;     
//        }
//    }
}

//function check confirm password:
function checkCfPassword(confirmPass, pass){
    if(confirmPass == null || confirmPass  == ''){
        getID('#messageConfirmPass',"Confirm password can't be blank",'color','red');
        return false;
    }
    if(confirmPass != pass){
        getID('#messageConfirmPass',"Confirm password do not match",'color','red');
        return false;
    }else{
        getID('#messageConfirmPass','','',''); 
    }
}

//check radio
$('#male').click(function(){
    $('#female').attr("checked", false);
})

$('#female').click(function(){
    $('#male').attr("checked", false);
})

//function Generate password
function generatePass(){
    var strList = 'zxcvbnmasdfghjklqwertyuiop!@#$%^&*1234567890';
    var tmt = '';
    var i;
    
    for(i = 0; i<6; i++){
        tmt += strList.charAt(Math.floor(Math.random()* strList.length))
    }
    return tmt;
}

//
if ($("#password").keydown(function(event){
     $("#confirmPassword").removeAttr("disabled");
     //$("#rePassword").css("background", "black");
}));

//function shake
function shake(id){
    $(id).effect("shake", {times:4}, 1000 );
}

//submitdata
function submitData(e){
    //remove browser control'loai bo kiem soat trinh duyet'
    e.preventDefault();

    setTimeout(function (){
        $('#button').unbind('click').click();
    }, 2000); 
    
    $('#button').submit();
    
}

//function Main.....
$(document).ready(function(){
    
    $('#button').click(function(){

        var user = $('#username').val().trim();
        var email = $('#email').val().trim();
        var pass = $('#password').val().trim();
        var confirmPass = $('#confirmPassword').val().trim();
        
        setTimeout(function(){
            $('#button').prop('disabled',false);
            $('#loadingtext').hide();

        }, 2000);
        
        $(this).prop('disabled',true);
        $('#loadingtext').show();
        
        if(checkUsername(user) == false){
            shake('#username')         
            return false;
        }
        
         if(checkEmail(email) == false){
            shake('#email') 
            return false;
        }
        
         if(checkPassword(pass) == false){
            shake('#password') 
            return false;
        }
        
        if(generatePass(pass) == false){
            return false;
        }
        
        
        checkCfPassword(confirmPass,pass);

        //$("#button").click(submitData());    
        //$(".register").submit();
        
        setTimeout(function(){
            location.reload();
        },2000)
     
        // $("#button").submit();

         });

    });

    
    $('#generate').click(function(){
        var text = generatePass();
        $("#password").val(text);
        getID('#confirmPassword','','','');      
        $( "#confirmPassword" ).prop( "disabled", true );
        getID('#messageConfirmPass','','display','none');      
    });
