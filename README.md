# forms export as csv or json

Is a jquery plugin that allows you to incude a button export as the format you want for your form data, strcture or both.

# How to use ?
## to export a JSON
- format : format parameter can take 'json' or 'csv' as values
- link : optionnal. Is an object that allows you to customize your link content and style
- exports : optionnal can take 'data', 'structure' or 'both' value
- container : optionnal. can be used to place link to the end of the specified container

```
<script src="/form-export/jquery.form-export.js"></script>
```
```
$('yourFormSelector').exportForm({
    format: 'json',
    link : {
        content : "json",
        style : "btn btn-primary"
    },
    exports : 'data',
    container : 'yourLinkContainer'``
})

```
## to export a CSV
- format : format parameter can take 'json' or 'csv' as values
- separator : default ','; example '|'
- link : optionnal. Is an object that allows you to customize your link content and style
- exports : optionnal can take 'data', 'structure' or 'both' value
- container : optionnal. can be used to place link to the end of the specified container
```
$('yourFormSelector').exportForm({
    format: 'csv',
    link : {
        content : "csv",
        style : "btn btn-primary"
    },
    exports : "structure",
    container : "body"
```