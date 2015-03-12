module.exports = config:
    files:
        javascripts:
              joinTo:
                'app.js': /^app(\/|\\)js/
                'game.js': /^app(\/|\\)game/
                'vendor.js': /^bower_components/

        stylesheets:
            joinTo:
                'app.css'

        templates:
            joinTo:
                'tmp.html'

    plugins:
        ES6to5:
            format:
                semicolons: false
            ignore: [
                /^(bower_components|vendor)/
                'app/js/**/*'
            ]
