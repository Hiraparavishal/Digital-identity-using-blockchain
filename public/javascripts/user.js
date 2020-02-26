
    function CreateTableFromJSON() {

       
        /*var myBooks = [
            {
                "Sr.no": "1",
                "Document": "Aadhar Card",
                "ID": "123456789987",
            },
            {
                "Sr.no": "1",
                "Document": "Aadhar Card",
                "ID": "123456789987",
            },
            {
                "Sr.no": "1",
                "Document": "Aadhar Card",
                "ID": "123456789987",
            }
        ]

        // EXTRACT VALUE FOR HTML HEADER. 
        // ('Book ID', 'Book Name', 'Category' and 'Price')
        var col = [];
        for (var i = 0; i < myBooks.length; i++) {
            for (var key in myBooks[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");
        table.classList.add("table");
        table.classList.add("collapse");
        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        var tr = table.insertRow(-1);                   // TABLE ROW.
        tr.classList.add("row");
        tr.classList.add("header"); 
        
        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.classList.add("thead");
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < myBooks.length; i++) {

            tr = table.insertRow(-1);
            tr.classList.add("row");
            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.classList.add("cell");
                tabCell.innerHTML = myBooks[i][col[j]];
            }
        }

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("display-table");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);*/
    }
