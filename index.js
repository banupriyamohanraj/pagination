var request = new XMLHttpRequest()
var url_string = "https://gist.githubusercontent.com/rvsp/add40254aa126f045837fa5b51f47f1f/raw/4d724bfabf4cce7379a386e23bef6576ab99a2f9/pagination.json";

request.open('GET',url_string , true) 
request.send();

request.onload = function() {
var jsondata = JSON.parse(request.response)

var tableData=jsondata;

var div1 = document.createElement('div');
var table= document.createElement('table');
table.setAttribute('class','table-fluid table-striped')
table.id ='our-table';  
var thead = document.createElement('thead');
var trow = document.createElement('tr');
var th1= document.createElement('th');
th1.innerHTML = 'ID';
var th2= document.createElement('th');
th2.innerHTML = 'Name';
var th3= document.createElement('th');
th3.innerHTML = 'Email';

trow.append(th1,th2,th3);
thead.appendChild(trow);

var tbody = document.createElement('tbody');
tbody.id ='table-body';

table.append(thead,tbody);
div1.appendChild(table);
document.body.appendChild(div1);





var state = {
    'querySet': tableData,

    'page': 1,
    'rows': 10,
    'window': 10,
}



function pagination(querySet, page, rows) {

    var trimStart = (page - 1) * rows
    var trimEnd = trimStart + rows

    var trimmedData = querySet.slice(trimStart, trimEnd)

    var pages = Math.round(querySet.length / rows);

    return {
        'querySet': trimmedData,
        'pages': pages,
    }
}




var div2 = document.createElement('div');
div2.setAttribute('class','pagination pagination-lg')
div2.id ='pagination-wrapper';

document.body.appendChild(div2);

function pageButtons(pages)
 {
    var wrapper = document.getElementById('pagination-wrapper');

    wrapper.innerHTML = ``
	console.log('Pages:', pages)

    var maxLeft = (state.page - Math.floor(state.window / 2))
    var maxRight = (state.page + Math.floor(state.window / 2))

    

    if (maxLeft < 1) {
        maxLeft = 1
        maxRight = state.window
    }

    if (maxRight > pages) {
        maxLeft = pages - (state.window - 1)
        
        
        maxRight = pages
    }
    
    

    for (var page = maxLeft; page <= maxRight; page++) {
    	wrapper.innerHTML += `<button type='button' value=${page} class="page btn btn-sm btn-outline-dark">${page}</button>`
        
    }

    if (state.page != 1) {
        wrapper.innerHTML = `<button type='button' value=${1} class="page btn btn-sm btn-outline-dark">&#171; First</button>` + wrapper.innerHTML
        
    }

    if (state.page != pages) {
        wrapper.innerHTML += `<button  type='button' value=${pages} class="page btn btn-sm btn-outline-dark">Last &#187;</button>`
        
    }


    $('.page').on('click', function() {
        $('#table-body').empty()

        state.page = Number($(this).val())
        buildTable()
    })

}

function buildTable() 
{
    var table = $('#table-body')

    var data = pagination(state.querySet, state.page, state.rows)
    var myList = data.querySet

    for (var i = 1 in myList) {
        //Keep in mind we are using "Template Litterals to create rows"
        var row = `<tr>
                  <td>${myList[i].id}</td>
                  <td>${myList[i].name}</td>
                  <td>${myList[i].email}</td>
                  `
        
        table.append(row)
}
    
    pageButtons(data.pages)
}

buildTable()

}