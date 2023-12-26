let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const delLastBtn = document.getElementById("del-last-btn")
const delAllBtn = document.getElementById("del-all-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

delLastBtn.addEventListener("dblclick", function(){
    if (myLeads.length === 0) {
        alert("You have no leads!")
    }
    else {
        const response = confirm("Are you sure?")
        if (response) {
            myLeads.pop()
            localStorage.setItem("myLeads", JSON.stringify(myLeads) )
            render(myLeads)
        }
    }
})

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})

inputEl.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        myLeads.push(inputEl.value)
        inputEl.value = ""
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    }
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

delAllBtn.addEventListener("dblclick", function() {
    if (myLeads.length === 0) {
       alert("You have no leads!")
    }
    else {
        const response = confirm("Are you sure you want to delete all of your Leads?")
        if (response) {
            localStorage.clear()
            myLeads = []
            render(myLeads)
        }
    }
    
})

inputBtn.addEventListener("click", function() {
    if (inputEl.value == "") {
        alert("Please enter a URL!")
    }
    else{
        myLeads.push(inputEl.value)
        inputEl.value = ""
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    }
})