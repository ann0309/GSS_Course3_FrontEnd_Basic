

//驗證
var validator = $("#addBookForm").kendoValidator({
    rules: {
        date1: function (input) {
            if (input.is("[name=BoughtDate]") && kendo.parseDate(input.val()) > presentDate) {
                return false;  //通過
            }
            return true;
        },
        date2: function (input) {//判斷是不是數字
            if (input.is("[name=BoughtDate]") && isNaN(Date.parse($("#bought_datepicker").data("kendoDatePicker").value()))) {
                return false;
            } else {
                return true;
            }
        },
    },
    messages: {
        required: "必填",
        date1: "未來日期無效",
        date2: "請輸入正確日期",
    }

}).data("kendoValidator");

