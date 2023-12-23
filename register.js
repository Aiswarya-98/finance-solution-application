const loggedkey = localStorage.getItem("loggedkey")
mainHead.innerHTML = `Welcome ${loggedkey}`

// REGISTERATION OF A NEW USER

function register() {
  reg = {
    uname: username.value,
    email: email.value,
    password: password.value,
    income: 0,
    expense: 0,
    incomeArray: [],
    expenseArray: [],
  }

  if (reg.uname == "" || reg.email == "" || reg.password == "") {
    alert("Please enter all fields")
  } else {
    if (reg.email in localStorage) {
      alert("Email is taken. Please use another one.")
    } else {
      localStorage.setItem(reg.uname, JSON.stringify(reg))
      alert("User Registeration is successful.")
      window.location = "./login.html"
    }
  }
}

// USER LOGIN

function login() {
  let username = document.getElementById("username").value
  let pswd = document.getElementById("password1").value

  if (username == "" || pswd == "") {
    alert("Fields cannot be empty")
  } else {
    if (username in localStorage) {
      user = JSON.parse(localStorage.getItem(username))
      if (user.password === pswd) {
        localStorage.setItem("loggedobj", JSON.stringify(user))
        localStorage.setItem("loggedkey", username)

        alert("Login successful")
        window.location = "./dashboard.html"
      } else {
        alert("Wrong password")
        document.getElementById("password1").value = ""
      }
    } else {
      alert("No such User found")
    }
  }
}

// Add income array

function addincomeArray(type, amt, bal) {
  let incomeObj = {
    type: type,
    amt: amt,
    bal: bal,
  }

  let inObj = JSON.parse(localStorage.getItem(loggedkey))
  inObj.incomeArray.push(incomeObj)
  localStorage.setItem(loggedkey, JSON.stringify(inObj))
}

function logout() {
  localStorage.clear()
  window.location = "./home.html"
}

// Add expense array

function addexpenseArray(type, amt, bal) {
  let expenseObj = {
    type: type,
    amt: amt,
    bal: bal,
  }

  let exObj = JSON.parse(localStorage.getItem(loggedkey))
  exObj.expenseArray.push(expenseObj)
  localStorage.setItem(loggedkey, JSON.stringify(exObj))
}

function displayIncomeArray() {
  let inObj = JSON.parse(localStorage.getItem(loggedkey))
  let inArray = inObj.incomeArray

  let incomeDetails = document.getElementById("incomeDetails")
  incomeDetails.innerHTML = ""
  for (let i of inArray) {
    incomeDetails.innerHTML += `
    <tr>
    <td>${i.type}</td>
    <td>+${i.amt}</td>
    <td>${i.bal}</td>
    </tr>`
  }
}

function displayExpenseArray() {
  let exObj = JSON.parse(localStorage.getItem(loggedkey))
  let exArray = exObj.expenseArray

  let expenseDetails = document.getElementById("expenseDetails")
  expenseDetails.innerHTML = ""
  for (let i of exArray) {
    expenseDetails.innerHTML += `<tr>
    <td>${i.type}</td>
    <td>-${i.amt}</td>
    <td>${i.bal}</td>
    </tr>`
  }
}

function displayIncomeExpense() {
  let newObj = JSON.parse(localStorage.getItem(loggedkey))

  let aobj = JSON.parse(localStorage.getItem(newObj.uname))
  let inDisplay = document.getElementById("incomeDisplay")
  let exDisplay = document.getElementById("expenseDisplay")
  inDisplay.innerHTML = `TOTAL BALANCE: ${aobj.income}`
  exDisplay.innerHTML = ` TOTAL EXPENSE: ${aobj.expense}`
}

function addIncome() {
  let incometype = document.getElementById("incomeType").value
  let incomeamount = document.getElementById("incomeAmount").value

  if (incometype == "" || incomeamount == "") {
    alert("Please fill all fields!")
  } else {
    let loggedUser = JSON.parse(localStorage.getItem(loggedkey))
    loggedUser.income = loggedUser.income + parseFloat(incomeamount)
    localStorage.setItem(loggedUser.uname, JSON.stringify(loggedUser))
    alert("Amount added successfully")
    displayIncomeExpense()
    addincomeArray(incometype, incomeamount, loggedUser.income)
    displayIncomeArray()
    document.getElementById("incomeType").value = ""
    document.getElementById("incomeAmount").value = ""
  }
}

function addExpense() {
  let expType = document.getElementById("expenseType").value
  let expAmount = document.getElementById("expenseAmount").value

  if (expType == "" || expAmount == "") {
    alert("Please fill all fields")
  } else {
    let loggedUser = JSON.parse(localStorage.getItem(loggedkey))
    if (expAmount > loggedUser.income) {
      alert("Insufficient Amount")
    } else {
      loggedUser.income = loggedUser.income - parseFloat(expAmount)
      loggedUser.expense = loggedUser.expense + parseFloat(expAmount)

      localStorage.setItem(loggedUser.uname, JSON.stringify(loggedUser))
      alert("Amount deducted Successfully")

      // document.getElementById("expenseDisplay").reset();
      displayIncomeExpense()

      addexpenseArray(expType, expAmount, loggedUser.income)

      displayExpenseArray()
      document.getElementById("expenseType").value = ""
      document.getElementById("expenseAmount").value = ""
    }
  }
}

function clearData() {
  let del = confirm("Are you sure you want to clear all data?")
  if (del == true) {
    let newObj = JSON.parse(localStorage.getItem(loggedkey))
    newObj.income = 0
    newObj.expense = 0
    newObj.incomeArray = []
    newObj.expenseArray = []
    localStorage.setItem(newObj.uname, JSON.stringify(newObj))
    displayIncomeExpense()
    document.getElementById("incomeDetails").innerHTML = ""
    document.getElementById("expenseDetails").innerHTML = ""

    alert("Data cleared successfully")
    location.reload()
  }
}
