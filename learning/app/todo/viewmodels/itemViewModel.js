﻿/*global define */
define([
    'sandbox!todo'
], function (
    sandbox
) {
    'use strict';

    return function (item, items) {
        var observable = sandbox.mvvm.observable,
            //properties
            title = observable(item.title),
            completed = observable(item.completed),
            editMode = observable(false),
            previousTitle;

        function beginEdit() {
            previousTitle = this.title();
            editMode(true);
        }

        function endEdit() {
            var newTitle = title().trim();
            if (newTitle) {
                title(newTitle);
                editMode(false);
            } else {
                items.remove(this);
            }
        }

        function cancelEdit() {
            title(previousTitle);
            editMode(false);
        }

        function remove() {
            items.remove(this);
        }


        return {
            title: title,
            completed: completed,
            editMode: editMode,
            beginEdit: beginEdit,
            endEdit: endEdit,
            remove: remove,
            cancelEdit: cancelEdit
        };
    };
});