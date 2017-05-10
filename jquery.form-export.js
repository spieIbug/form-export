(function () {
    /**
     * @author : Maamar Yacine MEDDAH
     */
    'use strict';
    var values = {};
    var keys = [];
    $.fn.extend({
        exportForm: function (options) {
            var fields = $(this).serializeArray() || [];
            var container = this;
            $.each($(this).serializeArray(), function (i, field) {
                values[field.name] = field.value;
                keys.push(field.name);
            });
            switch (options.format) {
                case 'csv' : {
                    exportToCsv(options, keys, "structure_" + $(this).attr('id'), container);
                    break;
                }
                case 'json' : {
                    exportToJson(options, keys, "structure_" + $(this).attr('id'), container);
                    break;
                }
                default : {
                    exportToCsv(options, keys, "structure_" + $(this).attr('id'), container);
                }
            }
        }
    });
    function exportToJson(options, data, filename, container) {
        var json = JSON.stringify(data);
        var blob = new Blob([json], {type: "application/json"});
        var url = URL.createObjectURL(blob);
        var jsonStructureLink = "";
        if (options.link === false || options.link === "") {
            jsonStructureLink = "";

        } else if (options.link === undefined || options.link === null) {
            jsonStructureLink = "<a href='" + url + "' class='btn btn-default' download='" + filename + ".json'>Export Form Structure as Json</a>";
        } else {
            jsonStructureLink = "<a href='" + url + "' class='" + options.link.style + "' download='" + filename + ".json'>" + options.link.content + "</a>";
        }
        var htmlContainer = options.container || container;
        $(jsonStructureLink).insertAfter(htmlContainer);
    }

    /**
     * Exports an Array to a CSV file
     * @param options
     * @param array
     * @param filename
     */
    function exportToCsv(options, array, filename) {
        var separator = options.separator || ',';
        var csvStructure = array.join(separator + " ");
        var csvFile = new Blob([csvStructure], {type: 'text/csv'});
        var a = document.createElement('a');
        a.download = filename + ".csv";
        a.href = window.URL.createObjectURL(csvFile);
        a.click();
    }
})();
