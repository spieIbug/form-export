(function () {
    /**
     * @author : Maamar Yacine MEDDAH
     */
    'use strict';
    var fields = [];
    var values = [];
    var keys = [];
    $.fn.extend({
        exportForm: function (options) {
            fields = $(this).serializeArray() || [];
            var container = this;
            $.each($(this).serializeArray(), function (i, field) {
                values.push = (field.value);
                keys.push(field.name);
            });
            switch (options.format) {
                case 'csv' : {
                    var dataToExport = getDataToExport(options);
                    exportToCsv(options, dataToExport, "structure_" + $(this).attr('id'), container);
                    break;
                }
                case 'json' : {
                    var dataToExport = getDataToExport(options);
                    exportToJson(options, dataToExport, "structure_" + $(this).attr('id'), container);
                    break;
                }
                default : {
                    var dataToExport = getDataToExport(options);
                    exportToCsv(options, dataToExport, "structure_" + $(this).attr('id'), container);
                }
            }
        }
    });
    function exportToJson(options, data, filename, container) {
        var json = JSON.stringify(data);
        var blob = new Blob([json], {type: "application/json"});
        var url = URL.createObjectURL(blob);
        var alink = "";
        if (options.link === false || options.link === "") {
            alink = "";
        } else if (options.link === undefined || options.link === null) {
            alink = "<a href='" + url + "' class='btn btn-default' download='" + filename + ".json'>Export Form as Json</a>";
        } else {
            alink = "<a href='" + url + "' class='" + options.link.style + "' download='" + filename + ".json'>" + options.link.content + "</a>";
        }
        var htmlContainer = options.container || container;
        $(alink).insertAfter(htmlContainer);
    }

    /**
     * Exports an Array to a CSV file
     * @param options
     * @param array
     * @param filename
     */
    function exportToCsv(options, array, filename, container) {
        var separator = options.separator || ',';
        var csvStructure = array.join(separator + " ");
        var csvFile = new Blob([csvStructure], {type: 'text/csv'});
        var url = URL.createObjectURL(csvFile);
        var alink = "";
        if (options.link === false || options.link === "") {
            alink = "";
        } else if (options.link === undefined || options.link === null) {
            alink = "<a href='" + url + "' class='btn btn-default' download='" + filename + ".csv'>Export Form as csv</a>";
        } else {
            alink = "<a href='" + url + "' class='" + options.link.style + "' download='" + filename + ".csv'>" + options.link.content + "</a>";
        }
        var htmlContainer = options.container || container;
        $(alink).insertAfter(htmlContainer);
    }

    function getDataToExport(options) {
        var dataToExport = {};
        switch (options.exports) {
            case "data" : {
                dataToExport = values;
                break;
            }
            case "structure" : {
                dataToExport = keys;
                break;
            }
            case "both" : {
                dataToExport = fields
                break;
            }
            default : {
                dataToExport = fields;
            }
        }
        return dataToExport;
    }
})();
