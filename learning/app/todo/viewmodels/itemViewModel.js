/*global define */
define([
    'sandbox!todo'
], function (
    sandbox
) {
    'use strict';

    return function (item, items) {
        var MAX_PRIORITY = 6,
            canEdit = true;

        var observable = sandbox.mvvm.observable,
            //properties
            title = observable(item.title),
            completed = observable(item.completed),
            editMode = observable(false),
            priority = observable(item.priority),
            previousTitle;

        function beginEdit() {
            if (!canEdit) {
                return;
            }

            previousTitle = this.title();
            editMode(true);
        }

        function endEdit() {
            if (!canEdit) {
                return;
            }

            var newTitle = title().trim();
            if (newTitle) {
                title(newTitle);
                editMode(false);
            } else {
                items.remove(this);
            }
        }

        function cancelEdit() {
            if (!canEdit) {
                return;
            }

            title(previousTitle);
            editMode(false);
        }

        function toggleEdit() {
            canEdit = !canEdit;
        }

        function remove() {
            items.remove(this);
        }        

        function incrementPriority() {
            if (priority() === MAX_PRIORITY) {
                return;
            }

            priority(priority() + 1);
        }

        function decrementPriority() {
            if (-1 * priority() === MAX_PRIORITY) {
                return;
            }

            priority(priority() - 1);
        }
        
        function textColor() {
            if (priority() > Math.floor(MAX_PRIORITY / 2)) {
                return 'black';
            }

            if (Math.abs(priority()) > Math.floor(MAX_PRIORITY / 2)) {
                return 'white';
            }

            return '#4d4d4d';
        }

        function getColor() {
            var shade;

            if (priority() < 0) {
                shade = Math.floor(255.0 / MAX_PRIORITY) * (MAX_PRIORITY - Math.abs(priority()));
                return {
                    r: shade,
                    g: shade,
                    b: shade
                };
            }

            if (priority() === 0) {
                return {
                    r: 255,
                    g: 255,
                    b: 255 
                };
            }

            shade =  Math.floor(255.0 / (MAX_PRIORITY - 1)) * ((MAX_PRIORITY - Math.abs(priority())));   

            return {
                r: 255, 
                g: shade,
                b: 0
            };
        }

        return {
            title: title,
            completed: completed,
            editMode: editMode,
            beginEdit: beginEdit,
            endEdit: endEdit,
            remove: remove,
            cancelEdit: cancelEdit,
            priority: priority,
            incrementPriority: incrementPriority,
            decrementPriority: decrementPriority,
            toggleEdit: toggleEdit, 
            getColor: getColor,
            textColor: textColor,
        };
    };
});