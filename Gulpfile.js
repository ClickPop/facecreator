const {series, parallel, src, dest, watch, task} = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const uglifyES = require("uglify-es");
const composer = require("gulp-uglify/composer");
const uglify = composer(uglifyES, console);
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const concat = require("gulp-concat");
const stripStyleComments = require("gulp-strip-css-comments");
const stripComments = require("gulp-strip-comments");
const cssmin = require("gulp-clean-css");
const del = require("del");
const fancyLog = require("fancy-log");
const replace = require("gulp-string-replace");
const environments = require("gulp-environments");
const rename = require("gulp-rename");
const syncer = require('gulp-npm-script-sync');
const p = require("./package.json");

const envBuild = environments.make("build");
const jsFolder = "js";
const cssFolder = "css";
const sassFolder = "scss";
const vendorFolder = "vendor";
const srcFolder = "src";
const distFolder = "dist";
const incFolder = "includes";

//File Arrays
var paths = {
    scripts: {
        vendor: [
            "./" + jsFolder + "/" + vendorFolder + "/jquery/jquery.js", /* Disable for WP */
            "./" + jsFolder + "/" + vendorFolder + "/html2canvas/html2canvas.js",
            "./" + jsFolder + "/" + vendorFolder + "/bootstrap/bootstrap.bundle.js",
            "./" + jsFolder + "/" + vendorFolder + "/rangeslider/rangeslider.js",
        ],
        src: [
            "./" + jsFolder + "/" + srcFolder + "/prototypes.js",
            "./" + jsFolder + "/" + srcFolder + "/main.js"
        ],
        watch: [
            "./" + jsFolder + "/" + srcFolder + "/**.js"
        ]
    },
    styles: {
        src: [
            "./" + sassFolder + "/main.scss"
        ],
        watch: [
            "./" + sassFolder + "/main.scss",
            "./" + jsFolder + "/" + incFolder + "/**.scss"
        ]
    },
    replace: [
        "humans.txt"
    ],
    clean: {
        scripts: [
            "./" + jsFolder + "/" + vendorFolder,
            "./" + jsFolder + "/" + distFolder
        ],
        styles: [
            "./" + sassFolder + "/" + vendorFolder,
            "./" + cssFolder
        ]
    }
};

function date_today() {
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1; //January is 0!
    var year = today.getFullYear();

    if (day < 10) {
        day = "0" + day;
    }

    if (month < 10) {
        month = "0" + month;
    }

    today = year + "/" + month + "/" + day;
    return today;
}

function vendor_jquery_scripts() {
    "use strict";
    return src("./node_modules/jquery/dist/**/*.*")
        .pipe(dest("./" + jsFolder + "/" + vendorFolder + "/jquery"));

}

function vendor_html2canvas_scripts() {
    "use strict";
    return src("./node_modules/html2canvas/dist/html2canvas.js")
        .pipe(dest("./" + jsFolder + "/" + vendorFolder + "/html2canvas"));
}

function vendor_bootstrap_scripts() {
    "use strict";
    return src("./node_modules/bootstrap/dist/js/**/*.*")
        .pipe(dest("./" + jsFolder + "/" + vendorFolder + "/bootstrap"));
}

function vendor_rangeslider_scripts() {
    "use strict";
    return src("./node_modules/rangeslider.js/dist/rangeslider.js")
        .pipe(dest("./" + jsFolder + "/" + vendorFolder + "/rangeslider"));
}

function vendor_bootstrap_styles() {
    "use strict";
    return src("./node_modules/bootstrap/scss/**/*.*")
        .pipe(dest("./" + sassFolder + "/" + vendorFolder + "/bootstrap"));
}

function vendor_rangeslider_styles() {
    "use strict";
    return src("./node_modules/rangeslider.js/dist/rangeslider.css")
        .pipe(rename("rangeslider.scss"))
        .pipe(dest("./" + sassFolder + "/" + vendorFolder + "/rangeslider"));
}

function build_styles() {
    "use strict";
    return src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", function (error) {
            fancyLog.error(error);
        }))
        .pipe(autoprefixer())
        .pipe(concat("main.css"))
        .pipe(stripStyleComments({preserve: false}))
        .pipe(cssmin())
        .pipe(sourcemaps.write("./"))
        .pipe(dest("./" + cssFolder));
}

function build_scripts() {
    "use strict";
    return src(paths.scripts.vendor.concat(paths.scripts.src))
        .pipe(sourcemaps.init())
        .pipe(concat("main.js"))
        .pipe(envBuild(stripComments()))
        .pipe(envBuild(uglify()))
        .pipe(sourcemaps.write("./"))
        .pipe(dest("./" + jsFolder + "/" + distFolder));
}

function clean_styles() {
    "use strict";
    return del(paths.clean.styles);
}

function clean_scripts() {
    "use strict";
    return del(paths.clean.scripts);
}

function server_replace() {
    "use strict";
    return src(paths.replace, {base: "./"})
        .pipe(envBuild(replace("{{VERSION}}", p.version)))
        .pipe(envBuild(replace("{{COMMIT_DATE}}", date_today())))
        .pipe(envBuild(dest("./")));
}

function watch_files() {
  "use strict";
  watch(paths.scripts.watch, series(clean_scripts, move_scripts, build_scripts));
  watch(paths.styles.watch, series(clean_styles, move_styles, build_styles));
}

const clean = parallel(clean_styles, clean_scripts);
const move_styles = parallel(
    vendor_bootstrap_styles,
    vendor_rangeslider_styles);
const move_scripts = parallel(
    vendor_bootstrap_scripts,
    vendor_rangeslider_scripts,
    vendor_jquery_scripts,
    vendor_html2canvas_scripts);
const move = parallel(move_scripts, move_styles);
const build = series(clean, move, build_styles, build_scripts, server_replace);
const build_watch = series(build, watch_files);

exports.default = build_watch;
exports.build = build;
exports.watch = watch_files;
