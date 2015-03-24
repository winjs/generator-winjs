var generators = require("yeoman-generator");
module.exports = generators.Base.extend({
    promptProjectType: function () {
        var that = this;
        var done = this.async();

        this.prompt({
            type: "checkbox",
            name: "options",
            message: "Angular-WinJS shim and/or cordova?",
            choices: [{
                name: "Include Angular-WinJS shim",
                value: "angular"
            }, {
                name: "Cordova project",
                value: "cordova"
            }],
        }, function (answers) {
            that._angular = answers.options.indexOf("angular") >= 0;
            that._cordova = answers.options.indexOf("cordova") >= 0;
            done();
        });
    },

    promptProjectInfo: function () {
        var that = this;
        var done = this.async();

        this.prompt({
            type: "input",
            name: "value",
            message: "Project name?",
            default: "WinJS project"
        }, function (answer) {
            that._name = answer.value;

            if (!that._cordova) {
                done();
            } else {
                that.prompt({
                    type: "input",
                    name: "value",
                    message: "Cordova: Description?",
                    default: "WinJS project"
                }, function (answer) {
                    that._desc = answer.value;

                    that.prompt({
                        type: "input",
                        name: "value",
                        message: "Cordova: Author Name?",
                        default: "developer"
                    }, function (answer) {
                        that._authorName = answer.value;

                        that.prompt({
                            type: "input",
                            name: "value",
                            message: "Cordova: Author Email?",
                            default: "developer@example.com"
                        }, function (answer) {
                            that._authorEmail = answer.value;

                            that.prompt({
                                type: "input",
                                name: "value",
                                message: "Cordova: Author Url?",
                                default: "http://try.buildwinjs.com"
                            }, function (answer) {
                                that._authorUrl = answer.value;
                                done();
                            });
                        });
                    });
                });
            }
        });
    },
    
    copyTemplate: function () {
        var that = this;

        var templateName = "blank";
        if (this._angular) {
            templateName = "angular";
        }
        if (this._cordova) {
            templateName = (templateName === "blank") ? "cordova" : "angular-cordova";
        }
        console.log("Creating template: " + templateName);

        this.directory(templateName, this.destinationRoot(), function (content, source, dest) {
            if (source.indexOf("default.html") >= 0) {
                content = content.replace("__PROJECTNAME__", that._name);
            } else if (source.indexOf("config.xml") >= 0) {
                content = content.replace("__PROJECTNAME__", that._name);
                content = content.replace("__DESCRIPTION__", that._desc);
                content = content.replace("__AUTHORNAME__", that._authorName);
                content = content.replace("__AUTHOREMAIL__", that._authorEmail);
                content = content.replace("__AUTHORURL__", that._authorUrl);
            }

            return content;
        });

    }
});