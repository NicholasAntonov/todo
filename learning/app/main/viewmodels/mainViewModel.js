/*global define */
define([
    'sandbox!main'
], function (
    sandbox
) {
    'use strict';

    return function () {
        var // imports
            observable = sandbox.mvvm.observable,
            // properties
            todoItems = observable(),
            todoInput = observable(),
            shade = observable();

        function increaseShade() {
            console.log('increasing');
            shade = shade + 1;
        }

        shadeString = computed(function {
            var str = shade.toString(16),
                len = str.length,
                i,
                zeroes;
            
            for (i = 0; i < 6 - len; i++) {
                zeroes = zeroes + '0';
            }

            return '#' + zeroes + str;
        })

        return {
            todoItems: todoItems,
            todoInput: todoInput,
            increaseShade: increaseShade,
            shade: shade
        };
    };
});
