/*
    TODO
    - add analytics
    - allow to use CDN libs
*/

/*var gulp = require('gulp'),
    htmlbuild = require('gulp-htmlbuild');

gulp.src(['./index.html'])
    .pipe(htmlbuild({
        // build js with preprocessor
        js: htmlbuild.preprocess.js(function (block) {

        // read paths from the [block] stream and build them
        // ...

        // then write the build result path to it
        block.write('buildresult.js');
        block.end();

    })
}))
.pipe(gulp.dest('./build'));

add GA endpoint
/*<script type="text/javascript">
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'XXXXXXXXXXXXXX']);
    (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();
</script>*/