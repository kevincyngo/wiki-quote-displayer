var api = "https://en.wikiquote.org/w/api.php?format=json&action=parse&page=Main_Page&prop=text";
function getQuote(callback) {
    $.ajax({
        url: api,
        dataType: "jsonp",
        success: function (jsondata) {
            var text = jsondata.parse.text["*"];
            var parser = new DOMParser();
            var doc = parser.parseFromString(text, "text/html");
            var container = $("#mf-qotd", doc);

            callback(container[0].innerText);
        },
        error: function (xhr, callback) {
            console.log("Error getting quotes");
        }
    });
}

function renderQuote() {
    getQuote(function (c) {
        var static_text = "Quote of the day";

        var pre_process_str = c.substr(static_text.length + 1);
        pre_process_str = pre_process_str.trim();

        var pre_process_index = pre_process_str.lastIndexOf("~");
        pre_process_str = pre_process_str.substr(0, pre_process_index);

        pre_process_index = pre_process_str.lastIndexOf("~");
        var author = pre_process_str.substr(pre_process_index);
        var quote = pre_process_str.substr(0, pre_process_index-1)
        $("#quotes").text(quote);
        $("#author").text(author);
    });
}

$(document).ready(function () {
    renderQuote();
});