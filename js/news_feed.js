function createElementFromString(some_html, some_id) {
    var d = document.createElement('div');
    d.id = some_id;
    d.innerHTML = some_html;
    return d;
}

function strip(html) {
   var tmp = document.createElement("div");
   // Split out the text first
   tmp.innerHTML = html.replace(/<[^>]+>/g, '');;
   return tmp.textContent || tmp.innerText || "";
}

// Get the number of days between today and the date passed
// https://stackoverflow.com/questions/6154689/how-to-check-if-date-is-within-30-days
function daysBetweenToday(dt) {
    var today = new Date();
    return Math.abs(today.getTime() - dt.getTime()) / (1000*60*60*24);
} 

$(function(){
        // Image for us to show if there isn't an image in the blog post
        var DEFAULT_BLOG_IMG = "images/alzheimers_association.jpg";
        // Regex to pull image tags out of the content
        var IMG_REGEX = /<img([\w\W]+?)[\/]?>/gm;
        url = 'localhost.xml';
        $.ajax({
        type: "GET",
        url: url,
        dataType: 'xml',
        error: function(){
            alert('Unable to load feed, Incorrect path or invalid feed');
        },
        success: function(data){
            var $XML = $(data);
            var i = 0;
            $XML.find("item").each(function() {
                var $this = $(this),
                    item = {
                        title:       $this.find("title").text(),
                        link:        $this.find("link").text(),
                        pubDate:     new Date($this.find("pubDate").text()),
                        author:      $this.find("author").text(),
                        content:     $this.find("description").text()
                    };

                // Skip the article if it is older than 99 days
                if (daysBetweenToday(item.pubDate) > 99) {
                    return;
                }
                // Fix the URLs for images that use relative paths on the Alz site
                item.content = item.content.replace('src="/', 'src="http://www.alz.org/').replace('src="~/', 'src="http://www.alz.org/');

                // Pull out all of the image tags from the content
                var images_in_content = (item.content.match(IMG_REGEX)) || [];

                // Append the image to a div so it is parsed and we can pull out the image
                var elem = document.createElement('div');
                elem.innerHTML = images_in_content[0];

                var img = elem.getElementsByTagName('img');
                var first_image_src = img[0] && img[0]['src'];
                if (!first_image_src) {
                    first_image_src = DEFAULT_BLOG_IMG;
                } else if(!first_image_src.startsWith('http')) {
                    first_image_src = "https://www.alz.org" + first_image_src;
                } else if (first_image_src.includes('~/')) {
                    first_image_src = first_image_src.substr(first_image_src.indexOf('~/') + 2);
                    first_image_src = "https://www.alz.org/" + first_image_src;
                }

                // Pull out just the text from the content and cut it down to 512 characters
                var block_concat = strip(item.content);
                block_concat = block_concat.substring(0, 512);

                // Ignore the article if the description is less than 10 characters.
                if (block_concat.length < 10) {
                    return;
                }

                $("#feeds").append("<div class='panel panel-success'>"
                    + "<div class='panel-heading'>"
                    + "<h3 class='panel-title'><a href='" + item.link + "' target='_blank'>" + item.title + "</a></h3>"
                    + "</div>"
                    + "<div class='panel-body'>"
                    + "<div class='row'>"
                    + "<div class='col-md-2'><div class='thumbnail'><img class='portrait' src='" + first_image_src + "'></div></div>"
                    + "<div class='col-md-10'>" + block_concat + "&nbsp;&nbsp;<a href='" + item.link + "' target='_blank'>[...]</a>"
                    + "<br/>"
                    + "<br/>"
                    + "<i>Published: " + item.pubDate.toLocaleDateString() + "<i></div>"
                    + "</div>"
                    + "</div>"
                    + "</div>"
                );
                i++
            });
        }
    });
});
