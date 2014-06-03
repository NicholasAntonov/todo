/*global define */
/*jslint sloppy: true, unparam: true*/
define(function () {
    return {
        'outer-bar': function () {
            return {
                style: {
                    width: '100%'
                }
            };
        },
        'inner-bar': function () {
            return {
                style: {
                    width: (this.percent) + '%'
                }
            };
        },
        'display': function () {
            return {
                text: (this.percent) + '%' 
            };
        }
    };
});