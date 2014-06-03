/*global define */
/*jslint sloppy: true*/
define(function () {
    return {
        //data classes:

        'main-title': function () {
            var shade = 0;
            console.log('#' + (shade).toString(16));
            return {
                style: {
                    color: '#' + (shade++).toString(16)
                }
            }
        },
        'main-thread': function () {
            var shade = this.shade();

            return {
                event: {
                    mouseover: function () {
                        while (true) {
                            console.log("hello");
                            console.log(shade);
                            this.increaseShade;
                        }
                    }
                }
            };
        }
    }
});