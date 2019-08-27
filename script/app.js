const lsbtn=document.querySelector("#login-sign-btn");
const signupform=document.querySelector('#signup-form');
const signout=document.querySelector('#signout');
const guides=document.querySelector('#guides');
const addonarbtn=document.querySelector('#add-donar-btn');
const detailform=document.querySelector('#detail-form');

//contnt details
db.collection('people').onSnapshot( snapshot => {
    setupGuides(snapshot.docs)
})

//display details
const setupGuides = (data)=> {
    let html='';
    data.forEach(doc => {
        const donor=doc.data();
        const tr=`
        <tr>
        <td>${donor.Name}</td>
        <td>${donor.Email}</td>
        <td>${donor.Phoneno}</td>
        <td>${donor.Group}</td>
    </tr>
        `;
        html+= tr;
    });
    guides.innerHTML = html; 
}

//stateChange
auth.onAuthStateChanged(user => {
    if(user){
        console.log("login");
        lsbtn.style.display = 'none';
        signout.style.display = 'block';
        addonarbtn.style.display= 'block';
    }
    else{
        console.log("logout");
        signout.style.display = 'none';
        addonarbtn.style.display= 'none';
        lsbtn.style.display = 'block';
    }
    
})

//add-details
 detailform.addEventListener('submit',(e) =>{
     e.preventDefault();
     let name=detailform['detail-username'].value;
     let phno=detailform['detail-phno'].value;
     let bgroup=detailform['bgroup'].value;
     let email=detailform['detail-email'].value;
     if(name=='' || phno=='' || bgroup=='') {
         
        document.querySelector("#add-warning").style.display='block';
         setTimeout(() => {
             document.querySelector("#add-warning").style.display='none';
         }, 2000);
     }
     else{
        db.collection('people').add({
            Name: name,
            Phoneno: phno ,
            Group: bgroup,
            Email: email
        }).then(() => {
            detailform.reset();
            $('#adModal').modal('toggle');
           
    
        })
     }
   
 })

//signup
signupform.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    const email=document.querySelector("#signup-email").value;
    const password=document.querySelector("#signup-password").value;
    if(email=='' || password==''){
        document.querySelector("#sign-warning").style.display='block';
         setTimeout(() => {
             document.querySelector("#sign-warning").style.display='none';
         }, 2000);
    }
    else{
    auth.createUserWithEmailAndPassword(email,password).then(cred => {
        console.log(cred);
        const btn=document.querySelector("#signupbtn");
        btn.setAttribute('data-dismiss','modal');
        signupform.reset();
        $('#signupModal').modal('toggle');

    })
}
})

//signout
signout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
})

//login
const loginform=document.querySelector('#login-form');
loginform.addEventListener('submit', (e)=>{
    e.preventDefault();

    const email=document.querySelector("#login-email").value;
    const password=document.querySelector("#login-password").value;
    if(email=='' || password==''){
        document.querySelector("#log-warning").style.display='block';
         setTimeout(() => {
             document.querySelector("#log-warning").style.display='none';
         }, 2000);
    }
    else{
        auth.signInWithEmailAndPassword(email,password).then(cred =>{
        console.log(cred.user);
        loginform.reset();
        $('#loginModal').modal('toggle');
    })
    }
})