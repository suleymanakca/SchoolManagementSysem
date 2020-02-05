$(document).ready(function () {
    // prepare the data
    var data = {};
    var firstNames =
    [
        "Andrew", "Nancy", "Shelley", "Regina", "Yoshi", "Antoni", "Mayumi", "Ian", "Peter", "Lars", "Petra", "Martin", "Sven", "Elio", "Beate", "Cheryl", "Michael", "Guylene"
    ];
    var lastNames =
    [
        "Fuller", "Davolio", "Burke", "Murphy", "Nagase", "Saavedra", "Ohno", "Devling", "Wilson", "Peterson", "Winkler", "Bein", "Petersen", "Rossi", "Vileid", "Saylor", "Bjorn", "Nodier"
    ];
    var productNames =
    [
        "Black Tea", "Green Tea", "Caffe Espresso", "Doubleshot Espresso", "Caffe Latte", "White Chocolate Mocha", "Cramel Latte", "Caffe Americano", "Cappuccino", "Espresso Truffle", "Espresso con Panna", "Peppermint Mocha Twist"
    ];
    var priceValues =
    [
        "2.25", "1.5", "3.0", "3.3", "4.5", "3.6", "3.8", "2.5", "5.0", "1.75", "3.25", "4.0"
    ];
    var generaterow = function (i) {
        var row = {};
        var productindex = Math.floor(Math.random() * productNames.length);
        var price = parseFloat(priceValues[productindex]);
        var quantity = 1 + Math.round(Math.random() * 10);
        row["firstname"] = firstNames[Math.floor(Math.random() * firstNames.length)];
        row["lastname"] = lastNames[Math.floor(Math.random() * lastNames.length)];
        row["productname"] = productNames[productindex];
        row["price"] = price;
        row["quantity"] = quantity;
        row["total"] = price * quantity;
        return row;
    }
    for (var i = 0; i < 5; i++) {
        var row = generaterow(i);
        data[i] = row;
    }
    var source =
    {
        localdata: data,
        datatype: "local",
        datafields:
        [
            { name: 'firstname', type: 'string' },
            { name: 'lastname', type: 'string' },
            { name: 'productname', type: 'string' },
            { name: 'quantity', type: 'number' },
            { name: 'price', type: 'number' },
            { name: 'total', type: 'number' }
        ],
        addrow: function (rowid, rowdata, position, commit) {
            // synchronize with the server - send insert command
            // call commit with parameter true if the synchronization with the server is successful 
            //and with parameter false if the synchronization failed.
            // you can pass additional argument to the commit callback which represents the new ID if it is generated from a DB.
            commit(true);
        },
        deleterow: function (rowid, commit) {
            // synchronize with the server - send delete command
            // call commit with parameter true if the synchronization with the server is successful 
            //and with parameter false if the synchronization failed.
            commit(true);
        },
        updaterow: function (rowid, newdata, commit) {
            // synchronize with the server - send update command
            // call commit with parameter true if the synchronization with the server is successful 
            // and with parameter false if the synchronization failed.
            commit(true);
        }
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    // initialize jqxGrid
    $("#grid").jqxGrid(
    {
        width: getWidth('Grid'),
        height: 350,
        source: dataAdapter,
        showtoolbar: true,
        rendertoolbar: function (toolbar) {
            var me = this;
            var container = $("<div style='margin: 5px;'></div>");
            toolbar.append(container);
            container.append('<input id="addrowbutton" type="button" value="Add New Row" />');
            container.append('<input style="margin-left: 5px;" id="addmultiplerowsbutton" type="button" value="Add Multiple New Rows" />');
            container.append('<input style="margin-left: 5px;" id="deleterowbutton" type="button" value="Delete Selected Row" />');
            container.append('<input style="margin-left: 5px;" id="updaterowbutton" type="button" value="Update Selected Row" />');
            $("#addrowbutton").jqxButton();
            $("#addmultiplerowsbutton").jqxButton();
            $("#deleterowbutton").jqxButton();
            $("#updaterowbutton").jqxButton();
            // update row.
            $("#updaterowbutton").on('click', function () {
                var datarow = generaterow();
                var selectedrowindex = $("#grid").jqxGrid('getselectedrowindex');
                var rowscount = $("#grid").jqxGrid('getdatainformation').rowscount;
                if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
                    var id = $("#grid").jqxGrid('getrowid', selectedrowindex);
                    var commit = $("#grid").jqxGrid('updaterow', id, datarow);
                    $("#grid").jqxGrid('ensurerowvisible', selectedrowindex);
                }
            });
            // create new row.
            $("#addrowbutton").on('click', function () {
                var datarow = generaterow();
                var commit = $("#grid").jqxGrid('addrow', null, datarow);
            });
            // create new rows.
            $("#addmultiplerowsbutton").on('click', function () {
                $("#grid").jqxGrid('beginupdate');
                for (var i = 0; i < 10; i++) {
                    var datarow = generaterow();
                    var commit = $("#grid").jqxGrid('addrow', null, datarow);
                }
                $("#grid").jqxGrid('endupdate');
            });
            // delete row.
            $("#deleterowbutton").on('click', function () {
                var selectedrowindex = $("#grid").jqxGrid('getselectedrowindex');
                var rowscount = $("#grid").jqxGrid('getdatainformation').rowscount;
                if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
                    var id = $("#grid").jqxGrid('getrowid', selectedrowindex);
                    var commit = $("#grid").jqxGrid('deleterow', id);
                }
            });
        },
        columns: [
          { text: 'First Name', datafield: 'firstname', width: 200 },
          { text: 'Last Name', datafield: 'lastname', width: 200 },
          { text: 'Product', datafield: 'productname', width: 180 },
          { text: 'Quantity', datafield: 'quantity', width: 80, cellsalign: 'right' },
          { text: 'Unit Price', datafield: 'price', width: 90, cellsalign: 'right', cellsformat: 'c2' },
          { text: 'Total', datafield: 'total',  cellsalign: 'right', cellsformat: 'c2' }
        ]
    });    
});