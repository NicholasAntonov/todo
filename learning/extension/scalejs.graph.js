/*global define */
/*jslint sloppy: true*/
define([
    'scalejs!core',
    'knockout',
    'd3',
    'text!extension/barTemplate.html',
    'scalejs.mvvm'
], function (
    core,
    ko,
    d3,
    barTemplate
) {

    var registerTemplates = core.mvvm.registerTemplates,
        observable = core.mvvm.observable,
        observableArray = core.mvvm.observableArray,
        unwrapObservable = ko.utils.unwrapObservable

    registerTemplates(barTemplate);


    function wrapValueAccessor(value, element) {
        var vm = {
            width: value
        };
        return function () {
            return {
                name: "bar_template",
                data: vm
            }
        }

    }

    ko.bindingHandlers.graph = {

        init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            unwrapObservable(valueAccessor());
            console.log('init');
            return { controlsDescendantBindings: true };
        },

        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var data = unwrapObservable(valueAccessor()).map(function (e) { return parseInt(e.title()); }),
                max = 500; //Math.max.apply( Math, data );
            console.log('update');
            console.log(data);

            ko.bindingHandlers.template.update(
                element,
                wrapValueAccessor(valueAccessor(), element),
                allBindingsAccessor,
                viewModel,
                bindingContext
            );

            d3.selectAll('.databar')
                .data(data)
               .transition()
                    .duration(2000)
                    .delay(function (d, i) { return i * 100; })
                    .style('width', function (d) { return d + 'px' })
                    /*('background', function (d) {
                        var ratio = d / 500,
                            r = 137 - Math.floor(ratio * 37),
                            g = 175 - Math.floor(ratio * 25),
                            b = 207 - Math.floor(ratio * 15);
                        return ('linear-gradient(170deg, lightsteelblue, rgb(' + r + ',' + g + ',' + b + ')');
                    });*/

            return { controlsDescendantBindings: true };
        }
    };

    
});