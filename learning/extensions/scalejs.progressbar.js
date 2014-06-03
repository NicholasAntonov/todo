/*global define*/
/*jslint unparam: true*/
define('scalejs.progressbar', [
    'scalejs!core',
    'knockout',
	'text!extensions/progress.html',
	'bindings!progress',
	'styles!progress'
], function (
    core,
    ko,
    progressTemplate,
    binding,
    style
) {
    'use strict';

    var registerTemplates = core.mvvm.registerTemplates;

    registerTemplates(progressTemplate);

    function wrapValueAccessor(value, element) {
        return function () {
            return {
                name: 'progress_bar_template',
                data: value 
            };
        };
    }

    //INIT START -------------------------------------
    function init(
		element,
		valueAccessor,
		allBindingsAccessor,
		viewModel,
		bindingContext
	) {

        //stuff to do when created

        return { controlsDescendantBindings: true };
    }
    //INIT DONE--------------------------------------


    //UPDATE START----------------------------------
    function update(
		element,
		valueAccessor,
		allBindingsAccessor,
		viewModel,
		bindingContext
	) {

        var binding = valueAccessor();

        ko.bindingHandlers.template.update(
			element,
			wrapValueAccessor(valueAccessor(), element),
			allBindingsAccessor,
			viewModel,
			bindingContext
		);

        //stuff to do when updated

        return { controlsDescendantBindings: true };
    }
    //UPDATE DONE-----------------------------------

    ko.bindingHandlers.progressbar = {
        init: init,
        update: update
    };

    ko.virtualElements.allowedBindings.progressbar = true;

});

