# dynamicForm jQuery Plugin

## Demo with modal form

http://codepen.io/luanmoliveira/pen/YqoEeJ

## Example Usage

To create the form in a div:

### HTML

```html
<div id="dynamic"></div>
```

### jQuery

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

To create the form from a link and open in a modal:

### HTML

```html
<a id="dynamic" href="#">Open form</a>
```

### jQuery

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
```
