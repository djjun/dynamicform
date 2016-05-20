# dynamicForm jQuery Plugin

## Dependencies

dynamicForm depends on jQuery and can use Bootstrap

```html
<link href="dist/css/bootstrap.css" rel="stylesheet">
<script type="text/javascript" src="dist/js/jquery.min.js"></script>
```

## Installation

Include dynaform.js script after jquery library and the dynaform.css

```html
<link href="/path/to/dynaform.css" rel="stylesheet">
<script src="/path/to/dynaform.js"></script>
```

## Demo with modal form

http://codepen.io/luanmoliveira/pen/YqoEeJ

## Example Usage

The form can be built in a div or a modal

1) To create the form in a div:
#### HTML

```html
<div id="dynamic"></div>
```

#### jQuery
Use the plugin as follows:
```js
options = { 
  'token'  : '62bb61431348e22850828a5829c4373faafe29c1', 
  'secret' : '51a266c2844ccd5cac83d88de88d82d05358aa51',
  'title'  : 'Form',
  'saveurl': 'http://localhost:8081',
  'fields' : { 
      'estado':['PR','SC','SP','RS'], 
      'nível':['Iniciante','Intermediário','Avançado','Ninja'] 
  } 
} 

$('#dynamic').dynaform(options);  
```


2) To create the form from a link and open in a modal:
#### HTML

```html
<a id="dynamic" href="#">Open form</a>
```

#### jQuery
Use the plugin as follows:
```js
options = { 
    'token'  : '62bb61431348e22850828a5829c4373faafe29c1', 
    'secret' : '51a266c2844ccd5cac83d88de88d82d05358aa51',
    'modal'  :  true, 
    'title'  : 'Modal Form',
    'saveurl': 'http://localhost:8081',
    'fields' : { 
        'estado':['PR','SC','SP','RS'], 
        'nível':['Iniciante','Intermediário','Avançado','Ninja'] 
    } 
}

$('#dynamic').dynaform(options);  
```
