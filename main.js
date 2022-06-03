const localBook = 'SESSION_BOOK';


document.getElementById('inputBookIsComplete').addEventListener('click', function () {
    setTextSubmit()
})

function setTextSubmit() {
 

        let submitBtn = document.getElementById('bookSubmit')
        let ket = ''
    
        if (document.getElementById('inputBookIsComplete').checked) {
        
            ket = "Selesai dibaca"
        }else{
            ket = "Belum selesai dibaca"
        }
    
        submitBtn.childNodes[1].innerText = ket

}


function setUpStorage(params) {
   
    if (localStorage.getItem(localBook) === null) {
        localStorage.setItem(localBook,'')
    }
}

document.getElementById("bookSubmit").addEventListener("click", function (event) {
    event.preventDefault();

    setUpStorage();

    let idVal = document.getElementById('inputBookId').value
    let judulVal = document.getElementById('inputBookTitle').value
    let penulisVal = document.getElementById('inputBookAuthor').value
    let tahunVal = document.getElementById('inputBookYear').value
    let komplitVal = document.getElementById('inputBookIsComplete').checked
  
    if (idVal !=='' ) {
    
        let getLocal = JSON.parse(localStorage.getItem(localBook))
        
        getLocal.map(function (obj) {
            if (obj.id == idVal) {
                
                obj.title = judulVal
                obj.author = penulisVal
                obj.year = tahunVal
                obj.isComplete = komplitVal
            }
        })

        console.log(getLocal)

        let myJSON = JSON.stringify(getLocal)
        localStorage.setItem(localBook, myJSON)

    }else{


        let newObject = 
        {
            id: +new Date(),
            title : judulVal,
            author: penulisVal,
            year: tahunVal,
            isComplete: komplitVal
        }
    
    if (localStorage.getItem(localBook) !== '') {
        
        let currentSession = JSON.parse(localStorage.getItem(localBook))

        currentSession.push(newObject)
        
        let addJSON = JSON.stringify(currentSession)

        localStorage.setItem(localBook, addJSON)

    }else{

        let newArr = []
        newArr.push(newObject)
        
        let newJSON = JSON.stringify(newArr);

        localStorage.setItem(localBook, newJSON)
    }

    }

    document.getElementById('inputBookTitle').value = ''
    document.getElementById('inputBookAuthor').value = ''
    document.getElementById('inputBookYear').value = ''
    document.getElementById('inputBookIsComplete').checked = false            

    loadBook()
})

function loadBook(searchVal='') {
        
    let mySession = JSON.parse(localStorage.getItem(localBook))


    let elComplete = '';
    let elUnComplete = '';

    if(mySession !== null){

        mySession.map(function (obj) {
        
            if (obj.title.toLowerCase().includes(searchVal.toLowerCase())) {
            
                judul = obj.title.replaceAll(" ", "%20")
                if (obj.isComplete) {
            
                    elComplete = elComplete + "<article class='book_item'><h3>"+obj.title+"</h3><p>Penulis: "+obj.author+"</p><p>Tahun: "+obj.year+"</p><div class='action'><button class='blue' onclick=editBook("+obj.id+")>Ubah Data</button><button class='green' onclick=moveBook("+obj.id+",'beUnComplete')  >Belum selesai di Baca</button><button class='red' onclick=deleteBook("+obj.id+",'"+judul+"')>Hapus buku</button></div></article>"
        
                }else{
        
                    elUnComplete = elUnComplete + "<article class='book_item'><h3>"+obj.title+"</h3><p>Penulis: "+obj.author+"</p><p>Tahun: "+obj.year+"</p><div class='action'><button class='blue' onclick=editBook("+obj.id+")>Ubah Data</button><button class='green' onclick=moveBook("+obj.id+",'beComplete') >Selesai di Baca</button><button class='red' onclick=deleteBook("+obj.id+",'"+judul+"')>Hapus buku</button></div></article>"
        
                }                
            }
        })
    
        document.getElementById("completeBookshelfList").innerHTML =  elComplete
        document.getElementById("incompleteBookshelfList").innerHTML =  elUnComplete

    }
}


function editBook (id) {
    let mySession = localStorage.getItem(localBook)
    let myJSON = JSON.parse(mySession)

    myJSON.map(function (obj) {

        if (obj.id == id) {
            document.getElementById('inputBookId').value = obj.id
            document.getElementById('inputBookTitle').value = obj.title            
            document.getElementById('inputBookAuthor').value = obj.author
            document.getElementById('inputBookYear').value = obj.year
            document.getElementById('inputBookIsComplete').checked = obj.isComplete

            setTextSubmit()
        }
    })
}


function deleteBook(id, title) {
    title = title.replaceAll("%20", " ")

    bootbox.confirm({
        message: "Hapus Data Buku Dengan Judul <b>"+title+"</b> ?",
        buttons: {
            confirm: {
                label: 'Iya',
                className: 'btn-success'
            },
            cancel: {
                label: 'Tidak',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            if (result) {
                moveBook(id, "delete")
            }
        }
    });


}

function moveBook(id, dest) {
    

    let mySession = JSON.parse(localStorage.getItem(localBook))


    mySession.map(function (obj, index) {
      
        if ( obj.id == id) {
         
            if (dest === 'beComplete') {

                obj.isComplete = true                

            }else if(dest === 'beUnComplete'){

                obj.isComplete = false                

            }else if(dest === 'delete'){

                mySession.splice(index,1)

            }            
        }
    })   
    

    let myJSON = JSON.stringify(mySession)
    localStorage.setItem(localBook, myJSON)
    loadBook()
}

document.getElementById('searchSubmit').addEventListener("click", function (event) {
    
    event.preventDefault();

    let searchVal = document.getElementById('searchBookTitle').value

    loadBook(searchVal)

})

loadBook()