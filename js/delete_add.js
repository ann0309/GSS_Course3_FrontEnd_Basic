
$("#addWindow").kendoWindow({
    title: "新增書籍",
    width: "500px",
    height: "550px",
    modal: true,
    resizable: true,
    scrollable: true,
    visible: false,
    deactivate: function () {
        $(".k-textbox").val("");
        $("#book_category").val("")
        $("#book_publisher").val("");
    }
});

function deleteBook(e) {
    e.preventDefault(); //這裡的默認事件為何?
    var element = e.target;
    var target_row = $(element).closest("tr");

    if (confirm("是否要刪除?")) {
        let grid = $("#book_grid").data("kendoGrid");
        dataItem = grid.dataItem(target_row);
        grid.dataSource.remove(dataItem);
        localdata = JSON.parse(localStorage.getItem("bookData"));
        for (var i = 0; i < localdata.length; i++) {
            if (localdata[i].BookId === dataItem.BookId) {
                localdata.splice(i, 1);
                localdata = JSON.stringify(localdata);
                break;
            }
        }
        saveToLocalStorage(localdata);
        alert("success");
    }
    else {
        alert("取消");
    }
}
//新增
function addBook() {

    var setBookId = bookDataFromLocalStorage.length + 1;
    var getBookName = $("#book_name").val();
    var getBookCategoryName = $("#book_category").data("kendoDropDownList").text();
    var getBookAuthor = $("#book_author").val();
    var getBookPubliser = $("#book_publisher").val();
    var getBookDate = $("#bought_datepicker").val();//string

    bookDataFromLocalStorage = JSON.parse(localStorage.getItem("bookData"));//把local東西拿出來,加一筆進去,再放回去                      
    var newItem =
    {
        "BookId": setBookId,
        "BookCategory": getBookCategoryName,
        "BookName": getBookName,
        "BookAuthor": getBookAuthor,
        "BookBoughtDate": getBookDate,
        "BookPublisher": getBookPubliser

    };
    bookDataFromLocalStorage.unshift(newItem);
    saveToLocalStorage(bookDataFromLocalStorage);
    var grid = $("#book_grid").data("kendoGrid");
    grid.dataSource.insert(0, newItem);
}

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



$("#loadAddButton").click(function (e) {
    e.preventDefault();
    $("#addWindow").data("kendoWindow").center().open()
});
$("#WindowAddButton").click(function (e) {
    e.preventDefault();
    if (validator.validate()) {
        addBook();
        alert("新增成功");
        $("#addWindow").data("kendoWindow").close();
    }
});
