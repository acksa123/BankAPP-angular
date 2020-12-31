//name acno:1000 bal  username  password
class Bank{
static getData=()=>{

var accountDetails={
    // 1000:{acno:1000,name:"acksa",bal:10000,username:"test",password:"testuser"},
    // 1001:{acno:1001,name:"aleena",bal:20000,username:"test1",password:"test1"}
    userone:{acno:1000,balance:10000,username:"userone",password:"testuser"},
    usertwo:{acno:1001,balance:20000,username:"usertwo",password:"testuser1"},
    userthree:{acno:1002,balance:25000,username:"userthree",password:"testuser2"}

}
return accountDetails
}
static login=()=>{
   let uname=document.querySelector("#username").value//testuser//userone
   let pwd=document.querySelector("#password").value//test
   let dataset=Bank.getData()
   
  if(uname in dataset){
      if(dataset[uname].password==pwd){
          alert("login success")
          window.location.href="userhome.html"
      }
    else{
        alert("incorret password")
    }
  }
  else{
      alert("no user exist with provided username")
  }
}
static deposit=()=>{
    let uname=document.querySelector("#uname").value
    let pwd=document.querySelector("#pwd").value
    let amt=Number(document.querySelector("#amt").value)
    let dataset=Bank.getData()
    if(uname in dataset){
        if(dataset[uname].password==pwd){
            dataset[uname].balance+=amt
            alert("ur accc credited with amount"+amt+"aval balance="+dataset[uname].balance)
        }
        else{
            alert("incorrect password")
        }
        }
    else {
        alert("no user exist with provided username")
    }

    }
static withdraw=()=>{
    let uname=document.querySelector("#uname").value
    let pwd=document.querySelector("#pwd").value
    let amt=Number(document.querySelector("#amt").value)
    let dataset=Bank.getData()
    if(uname in dataset){
        if(dataset[uname].password==pwd){
            if(dataset[uname].balance>=amt){
                dataset[uname].balance-=amt
                alert("your account debited with amount"+amt+"aval balance="+dataset[uname].balance)
            }
            else{
                alert("insufficient balance")
            }
        }
        else{
                alert("incorrect password")
            }
        }
    else{
        alert("no user exist with provided username")
    }
    }
}





var obj=new Bank()
obj.getData()

// var username="test"
// var password="test"

//check for acno 1000 or not if exists print person name
// if(1000 in accountDetails){
// console.log(accountDetails[1000]["name"]);
// }
// else{
//     console.log("account number doesnot");
// }