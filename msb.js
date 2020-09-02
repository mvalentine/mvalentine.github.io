$(document).ready(function() {
    initializeLinks();
    initializeSideNav();
    initializePDFtracking();
});

function initializeLinks() {
    $('.more-courses').click(function(e) {
	$('.past-course').show();
	$(this).remove();
    });
}

function initializeSideNav() {
    if ($('.sidenav #sidenav-content').length == 0) {
        return;
    }

    // figure out minimum header value (e.g., h3 is the largest)
    var uniqueHeaderIndices = [];
    $('.sidenav-anchor').each(function() {
        var header = $(this).children(':header').first();
        // http://stackoverflow.com/questions/5127017/automatic-numbering-of-headings-h1-h6-using-jquery
        var hIndex = parseInt(header.prop('nodeName').substring(1));
        if ($.inArray(hIndex, uniqueHeaderIndices) == -1) {
        	uniqueHeaderIndices.push(hIndex);
        }
        uniqueHeaderIndices.sort();
    });

    // now put all the <h> elements under each sidenav-anchor into the sidenav
    $('.sidenav-anchor').each(function() {
        var header = $(this).children(':header').first();
        var hrefTarget = $(this).prop('id');
        var levelsDeep = $.inArray(parseInt(header.prop('nodeName').substring(1)), uniqueHeaderIndices);

        var elem = "";
        for (var i=0; i<levelsDeep; i++) {
            elem += "<ul class='nav'><li>";
        }
        elem += '<a href="#' + hrefTarget + '">' + header.text() + '</a>';
        for (var i=0; i<levelsDeep; i++) {
            elem += "</li></ul>";
        }

        $('#sidenav-content').append('<li>' + elem + '</li>');
    });
}

function initializePDFtracking() {
    $("a").each(function() {
        var href = $(this).attr("href");
        href = href.substring(href.lastIndexOf('/')+1);
        if (href.indexOf(".pdf")!==-1) {
            $(this).click(function(event) { // when someone clicks these links
                ga('send', {
                    hitType: 'pageview',
                    page: href,
                    transport: 'beacon' // asynchronous transport that won't die when the new page loads
                });
            });
        }
    });
}
