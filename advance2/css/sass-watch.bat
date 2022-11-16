@echo off

title SASS to CSS!
echo Watching Sass files
start "" sass --watch styles.scss:styles.css --style compressed
