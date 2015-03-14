module.exports = config:
    files:
        javascripts:
              joinTo:
                'javascripts/app.js': /^app(\/|\\)js/
                # 'javascripts/game.js': /^app(\/|\\)game/
                'javascripts/vendor.js': /^vendor|bower_components/
              order:
                before: [
                    "bower_components/react/react-with-addons.js",
                    "bower_components/react-router/build/global/ReactRouter.js"
                ]
        stylesheets:
            joinTo:
                'styles/app.css'

    # modules:
    #     wrapper: false
    #     definition: false

    plugins:
        ES6to5:
            # format:
            #     semicolons: false
            # modules: "system"
            moduleIds: true
            ignore: [
                /^(bower_components|vendor)/
            ]
