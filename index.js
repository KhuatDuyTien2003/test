let html = [];
axios.get(`https://my-json-server.typicode.com/codegym-vn/mock-api-users/users`)
.then(res =>{
    html = res.data.map(item => {
        return `
        <tr>
        <td>${item.name}</td>
        <td><button  >Edit</button></td>
        <td><button>Delete</button></td> 
        </tr>
    `
   
    });
     console.log(html.join(''));
})

  
function render(){
  document.getElementById("table").innerHTML = `<table>
    <tr>
        <th>Artice</th>
        <th>Action</th>
    </tr>
    // ${html.join('')}
</table>`;
}
function post(){
    
    axios.post(`https://my-json-server.typicode.com/codegym-vn/mock-api-users/users`,{
        id: "1",
        Name: "toi"
    })


}
//render();