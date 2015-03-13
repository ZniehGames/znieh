module.exports = config:
    files:
        javascripts:
              joinTo:
                'javascripts/app.js': /^app(\/|\\)js/
                'javascripts/game.js': /^app(\/|\\)game/
                'javascripts/vendor.js': /^bower_components/

        stylesheets:
            joinTo:
                'styles/app.css'

        templates:
            joinTo:
                'javascripts/app.js':  /^app(\/|\\)partials/

    modules:
        wrapper: false
        definitionr: false

    plugins:
        ES6to5:
            format:
                semicolons: false
            ignore: [
                /^(bower_components|vendor)/
                'app/js/**/*'
            ]
