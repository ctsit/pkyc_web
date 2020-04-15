$(document).ready(function() {
   window.scrollAwayNav = function () {
   	var navHeight = document.querySelector('nav').clientHeight;
   	window.scrollBy(0, -1 * navHeight);
   };

    var aTags = document.querySelectorAll('a');
    aTags = Array.prototype.map.call(aTags, function(node) {return node;});
    aTags.forEach(function (node) {
        var href = node.getAttribute('href');
        if (href && href.includes('#')) {
            href = href[0] === '#' ? href.split('#') : href;
            href = href.slice(1);
            node.onclick = function (event) {
                var target = document.querySelector('a[name=' + href + ']');
                if (target!=null)
                {
                  targetOffset = target.getBoundingClientRect().top;
                  event.preventDefault();
                  window.scrollBy(0, targetOffset);
                  window.scrollAwayNav();
                }
            };
        }
    });

    function importTemplate(key, template_url) {
        $("#" + key + "_container").load(template_url, '', function(response,status,xhr) {
            if($(this).find('#version_number').length > 0) {
                console.log('Replacing the version number: ' + version_number);
                $(this).find('#version_number').html(version_number);
            }
//this section reads the copyright variable date and inserts into the footer
//to change the actual date you edit the ./js/copyright.js file
            if($(this).find('#copyright_date').length > 0) {
                console.log('Replacing the version number: ' + copyright_date);
                $(this).find('#copyright_date').html(copyright_date);
            }
        });
    }

    // importTemplate('navbar', navbar_template);
    importTemplate('footer', footer_template);
});
