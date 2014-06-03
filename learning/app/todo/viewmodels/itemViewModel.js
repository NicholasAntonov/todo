/*global define */
define([
    'sandbox!todo'
], function (
    sandbox
) {
    'use strict';

    return function (item, items) {
        var MAX_PRIORITY = 6,
            canEdit = true,
            observable = sandbox.mvvm.observable,
            //properties
            title = observable(item.title),
            completed = observable(item.completed),
            editMode = observable(false),
            priority = observable(item.priority),
            self = this,
            previousTitle;

        function remove() {
            items.remove(self);
        }

        function beginEdit() {
            if (!canEdit) {
                return;
            }

            previousTitle = self.title();
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
                remove();
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
            var shade,
                diff = MAX_PRIORITY - Math.abs(priority());

            if (priority() < 0) {
                shade = Math.floor(255.0 / MAX_PRIORITY) * diff;
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

            shade =  Math.floor(255.0 / (MAX_PRIORITY - 1)) * diff;

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
            cancelEdit: cancelEdit,
            priority: priority,
            incrementPriority: incrementPriority,
            decrementPriority: decrementPriority,
            toggleEdit: toggleEdit,
            getColor: getColor,
            textColor: textColor,
            remove: remove
        };
    };
});