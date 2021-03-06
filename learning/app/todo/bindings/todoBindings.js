﻿/*global define */
/*jslint sloppy: true,unparam: true*/
define(function () {
    var ENTER_KEY = 13,
        ESCAPE_KEY = 27;
    return {
        'todo-visible': function () {
            return {
                visible: this.items().length > 0 || this.deleted().length > 0
            };
        },
        'todo-input': function () {
            var addItem = this.addItem;
            return {
                value: this.newItem,
                valueUpdate: 'afterkeydown',
                event: {
                    keyup: function (data, e) {
                        if (e.keyCode === ENTER_KEY) {
                            addItem();
                        }
                    }
                }
            };
        },
        'todo-up-prio': function () {
            return {
                click: this.incrementPriority,
                event: {
                    mouseover: this.toggleEdit,
                    mouseout: this.toggleEdit
                }
            };
        },
        'todo-down-prio': function () {
            return {
                click: this.decrementPriority,
                event: {
                    mouseover: this.toggleEdit,
                    mouseout: this.toggleEdit
                }
            };
        },
        'todo-item': function () {
            var color = this.getColor,
                text = this.textColor;

            return {
                css: {
                    completed: this.completed,
                    editing: this.editMode
                },
                event: {
                    dblclick: this.beginEdit
                },
                style: {
                    backgroundColor: 'rgba(' +
                        color().r + ', ' +
                        color().g + ', ' +
                        color().b + ', .5 )',
                    color:  text()
                }
            };
        },
        'todo-edit': function (ctx) {
            var item = this;

            return {
                value: this.title,
                valueUpdate: 'afterkeydown',
                event: {
                    keyup: function (data, e) {
                        if (e.keyCode === ENTER_KEY) {
                            item.endEdit(ctx);
                        } else if (e.keyCode === ESCAPE_KEY) {
                            item.cancelEdit();
                        }
                    },

                    blur: function () {
                        item.endEdit();
                    }
                },
                hasFocus: this.editMode
            };
        },
        'todo-count-text': function () {
            return {
                text: (this.items().length - this.completedItems().length === 1 ?
                        'item' : 'items') + ' left'
            };
        },
        'todo-clear-completed': function () {
            return {
                visible: this.completedItems().length > 0,
                text: 'Clear completed (' + this.completedItems().length + ')',
                click: this.removeCompletedItems
            };
        },
        'todo-view': function (ctx) {
            return {
                text: this.name,
                click: this.raiseEvent,
                css: { selected: ctx.$parent.currentView() === this.name }
            };
        },
        'todo-items-left': function () {
            return {
                text: this.items().length - this.completedItems().length
            };
        },
        'todo-undo-visible': function () {
            return {
                click: this.undo,
                css: { 'undo-active': this.deleted().length > 0 }
            };
        },
        'todo-remove-element': function (ctx) {
            return {
                click: function () {
                    ctx.$parent.remove(ctx.$index());
                }
            };
        }
    };
});
