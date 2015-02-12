var converter = new Showdown.converter();

// How this works:
    // 1) Retrieve posts from /r/kboy101222 in JSON format
    // 2) See what kind of post it is (Selfpost, YouTube, etc.)
    // 3) Run Selfposts through showdown (Markdown.ls for JS)
    // 4) Format the rest as needed

$.getJSON("http://www.reddit.com/r/kboy101222/.json?jsonp=?", function (data) {
    $.each(data.data.children, function (i, item) {
        //console.log(item.data);
        // 
        if (item.data.is_self === true){
            $('<a>', {
                text: '> Blog Post: "' + item.data.title + '"',
                href: item.data.url,
                class: 'blogPost'
            }).appendTo('#blogSpot');
            var blogText = converter.makeHtml(item.data.selftext);
            $('<br />').appendTo('#blogSpot');
            $('<p>', {
                       html: blogText,
                       //href: item.data.url,
                       class: 'blogCont'
                    }).appendTo('#blogSpot');
        }
        else {
            switch(item.data.domain){
                    
                // Saved Posts on Reddit
                case 'reddit.com':
                    $('<a>', {
                       text: '> Saved by me: "' + item.data.title + '"',
                       href: item.data.url,
                       class: 'blogPost'
                    }).appendTo('#blogSpot');
                    $('<br />').appendTo('#blogSpot');
                break;
                    
                // YouTube Video Links
                case 'youtu.be' || 'youtube.com' :
                   $('<a>', {
                       text: '> Video Link: "' + item.data.title + '"',
                       href: item.data.url,
                       class: 'blogPost'
                    }).appendTo('#blogSpot');
                    $('<br />').appendTo('#blogSpot');
                    $('<p>', {
                        html: converter.makeHtml(item.data.secure_media.oembed.description),
                        class: 'blogCont'
                    }).appendTo('#blogSpot');
                break;
                    
                // Everything Else
                default :
                    $('<a>', {
                        text: '> Link: "' + item.data.title + '"',
                        href: item.data.url,
                        class: 'blogPost'
                    }).appendTo('#blogSpot');
                    $('<br />').appendTo('#blogSpot');
                
            }
        }
        //$('<br />').appendTo('#blogSpot');
    });
});
