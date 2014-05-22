/*global define, localStorage */
define([
    'sandbox!todo',
    'app/todo/viewmodels/itemViewModel'
], function (
    sandbox,
    itemViewModel
) {
    'use strict';

    return function () {
        var observable = sandbox.mvvm.observable,
            observableArray = sandbox.mvvm.observableArray,
            has = sandbox.object.has,
            computed = sandbox.mvvm.computed,
            raise = sandbox.state.raise,
            //properties
            items = observableArray(),
            deleted = observableArray(),
            deletedIndices = new Array(),
            newItem = observable(),
            currentView = observable(),
            checkAll,
            completedItems,
            viewableOptions,
            viewableItems;
        
        viewableItems = computed(function () {
            var view = currentView();

            if (view === 'Active') {
                return items().where('!$.completed()').toArray();
            }
            if (view === 'Completed') {
                return items().where('$.completed()').toArray();
            }
            return items();
        });

        function toItem(itemVM) {
            return {
                title: itemVM.title(),
                completed:itemVM.completed()
            };
        }

        function toItemViewModel(item) {
            return itemViewModel(item, items);
        }

        function addItem() {
            var item = newItem();
            if (has(item, "trim") && item.trim()) {
                items.push( toItemViewModel( { title: item, completed: false } ) );
            }
            newItem("");
        }

        checkAll = computed({
            read: function () {
                return items().all("$.completed()");
            },
            write: function (value) {
                items().forEach(function (item) { item.completed(value); });
            }
        });

        completedItems = computed(function () {
            return items().where("$.completed()").toArray();
        });

        function removeCompletedItems() {
            completedItems().forEach(function (item) {
                item.remove();
            });
        }

        viewableOptions = ['All', 'Active', 'Completed'].map(function (name) {
            return {
                name: name,
                raiseEvent: function () {
                    raise('todo.' + name);
                }
            };
        });

        function undo() {
            if (deleted().length > 0) {
                var tempArray = items().slice();
                var index = deletedIndices.pop();
                var removedItems = tempArray.splice(index, items().length - index);
                tempArray.push(deleted.pop());
                removedItems.map(function (e) { tempArray.push(e) });
                items(tempArray);
            }
        }

        function remove(index) {
            console.log(index + "is being removed");
            deleted.push(items()[index]);
            items.splice(index, 1);
            deletedIndices.push(index);
        }

        if (has(localStorage['todos-scalejs'])) {
            items(JSON.parse(localStorage['todos-scalejs']).map(toItemViewModel));
        }

        computed(function () {
            localStorage['todos-scalejs'] = JSON.stringify(items().map(toItem));
        });

        return {
            items: items,
            newItem: newItem,
            addItem: addItem,
            checkAll: checkAll,
            completedItems: completedItems,
            removeCompletedItems: removeCompletedItems,
            viewableOptions: viewableOptions,
            currentView: currentView,
            viewableItems: viewableItems,
            deleted: deleted,
            undo: undo,
            remove: remove
        };
    };
});
