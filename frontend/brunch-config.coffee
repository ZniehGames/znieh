module.exports = config:
    files:
        javascripts:
            joinTo:
                'vendor.js': '/^bower_components/'
                'app.js': '/^app/js/'
                'game.js': '/^app/game/'
        stylesheets:
            joinTo:
                'app.css'
    plugins:
        ES6to5:
            format:
                semicolons: false
            ignore: [
                /^(bower_components|vendor)/
                'app/js/**/*'
            ]
