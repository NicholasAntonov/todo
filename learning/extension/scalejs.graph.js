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
        },

        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var data = unwrapObservable(valueAccessor()).map(function (e) { return parseInt(e.title()); });
            console.log('update');
            console.log(data);
            /*d3.select(element.children)
                .data(data)
                .transition()
                .duration(2000)
                .style('width', function (d) { return d + 'px' });*/

            ko.bindingHandlers.template.update(
                element,
                wrapValueAccessor(valueAccessor(), element),
                allBindingsAccessor,
                viewModel,
                bindingContext
            );
        }
    };

    
});