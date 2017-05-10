(function(){
    /**
     * @author : Maamar Yacine MEDDAH
     */
    'use strict';
    var values = {};
    var keys = [];
    $.fn.extend({
        exportForm: function (options) {
            var fields = $(this).serializeArray() || [];
            $.each($(this).serializeArray(), function (i, field) {
                values[field.name] = field.value;
                keys.push(field.name);
            });
            switch (options.format) {
                case 'csv' : {
                    exportToCsv(options, keys, "structure_" + $(this).attr('id'));
                    break;
                }
                case 'json' : {
                    exportToJson(keys, "structure_" + $(this).attr('id'));
                    break;
                }
                default : {
                    exportToCsv(options, keys, "structure_" + $(this).attr('id'));
                }
            }
        }
    });
    /**
     * Exports Javascript Object/Data to a JSON file
     * @param data
     * @param filename
     */
    function exportToJson(data, filename) {
        var json = JSON.stringify(data);
        var blob = new Blob([json], {type: "application/json"});
        var url = URL.createObjectURL(blob);
        var a = document.getElementById('export');
        a.download = filename + ".json";
        a.href = url;
        a.click();
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
