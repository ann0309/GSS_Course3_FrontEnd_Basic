var bookDataFromLocalStorage = [];
var presentDate = new Date();//get 系統日期
$(function () {
    loadBookData();
    var data = [
        { text: "資料庫", value: "" },
        { text: "網際網路", value: "" },
        { text: "應用系統整合", value: "" },
        { text: "家庭保健", value: "" },
        { text: "語言", value: "" }
    ]
    $("#book_category").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        index: 0,
        change: onChangeCategory
    });
    $("#bought_datepicker").kendoDatePicker({
        value: presentDate,
        max: presentDate,
        format: "yyyy-MM-dd"

    });


    $("#book_grid").kendoGrid({
        dataSource: {
            data: bookDataFromLocalStorage,
            schema: {
                model: {
                    fields: {
                        BookId: { type: "int" },
                        BookName: { type: "string" },
                        BookCategory: { type: "string" },
                        BookAuthor: { type: "string" },
                        BookBoughtDate: { type: "string" }
                    }
                }
            },
            pageSize: 10,
        },
        toolbar: kendo.template("<div class='book-grid-toolbar'><input class='book-grid-search' placeholder='我想要找......' type='text'></input></div>"),
        height: 550,
        sortable: true,
        scrollable: false,
        pageable: {
            input: true,
            numeric: false
        },
        columns: [
            { field: "BookId", title: "書籍編號", width: "10%" },
            { field: "BookName", title: "書籍名稱", width: "50%" },
            { field: "BookCategory", title: "書籍種類", width: "10%" },
            { field: "BookAuthor", title: "作者", width: "15%" },
            { field: "BookBoughtDate", title: "購買日期", width: "15%" },
            { command: { text: "刪除", click: deleteBook }, title: " ", width: "120px" },

        ]

    });
    //搜尋
    $(".book-grid-search").on("keyup", function () {//動態拿到搜尋框的資料  為甚麼要放到document ready 李?
        var searchString = $(".book-grid-search").val();
        var grid = $("#book_grid").data("kendoGrid");
        var filterDataSource = new kendo.data.DataSource({         //new: 建立空的datasource
            data: bookDataFromLocalStorage,
            schema: {
                model: {
                    fields: {
                        BookId: { type: "int" },
                        BookName: { type: "string" },
                        BookCategory: { type: "string" },
                        BookAuthor: { type: "string" },
                        BookBoughtDate: { type: "string" }
                    }
                }
            },
            filter: {
                logic: "or",
                filters: [
                    { field: "BookId", operator: "contains", value: searchString }, //利用searchString當作要搜尋的條件
                    { field: "BookName", operator: "contains", value: searchString },
                    { field: "BookCategory", operator: "contains", value: searchString },
                    { field: "BookAuthor", operator: "contains", value: searchString },
                    { field: "BookBoughtDate", operator: "contains", value: searchString }
                ]
            },
            pageSize: 20,
        });
        grid.setDataSource(filterDataSource);//使用 setDataSource要把整個 Kendo Datasource 換掉,不能只動一筆資料
    })


})
//一開始載入資料
function loadBookData() {
    bookDataFromLocalStorage = JSON.parse(localStorage.getItem("bookData"));
    if (bookDataFromLocalStorage == null) {
        bookDataFromLocalStorage = bookData;
        localStorage.setItem("bookData", JSON.stringify(bookDataFromLocalStorage));//(key name,key value)
    }
}
//更新localstorage
function saveToLocalStorage(data) {
    bookDataFromLocalStorage = data;
    localStorage.setItem("bookData", JSON.stringify(data));
}
//dropdownlist換選項變換圖片
function onChangeCategory() {
    var dropdownlist = $("#book_category").data("kendoDropDownList");
    var selected_category = dropdownlist.select();  //被選到的類別index
    switch (selected_category) {
        case 0:
            $(".book-image").attr('src', 'image/database.jpg');
            break;
        case 1:
            $(".book-image").attr('src', 'image/internet.jpg');
            break;
        case 2:
            $(".book-image").attr('src', 'image/system.jpg');
            break;
        case 3:
            $(".book-image").attr('src', 'image/home.jpg');
            break;
        case 4:
            $(".book-image").attr('src', 'image/language.jpg');
            break;

    }
    //建一個存放照片的變數，如果選到相對應的選項就給他他那個選項的照片(用接的)
}
