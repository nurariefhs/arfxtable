## Classes

<dl>
<dt><a href="#Arfxtable">Arfxtable</a></dt>
<dd><p>Arfxtable is a vanilla js version of JQuery Datatable that support rowspan on tbody</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#arfxtable">arfxtable(param)</a> ⇒ <code>void</code></dt>
<dd><p>Initialize Arfxtable</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#columns">columns</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="Arfxtable"></a>

## Arfxtable
Arfxtable is a vanilla js version of JQuery Datatable that support rowspan on tbody

**Kind**: global class  
**Author**: {Nur Arief HS}  

* [Arfxtable](#Arfxtable)
    * [.target](#Arfxtable+target) : <code>string</code>
    * [.url](#Arfxtable+url) : <code>string</code>
    * [.res](#Arfxtable+res) : <code>object</code>
    * [.currentPage](#Arfxtable+currentPage) : <code>number</code> \| <code>string</code>
    * [.searchTimer](#Arfxtable+searchTimer) : <code>function</code>
    * [.totalElement](#Arfxtable+totalElement) : <code>number</code>
    * [.search](#Arfxtable+search) : <code>boolean</code>
    * [.pagination](#Arfxtable+pagination) : <code>boolean</code>
    * [.highlight](#Arfxtable+highlight) : <code>boolean</code>
    * [.highlightOptions](#Arfxtable+highlightOptions) : <code>Object</code>
    * [.searchDelay](#Arfxtable+searchDelay) : <code>number</code>
    * [.draw](#Arfxtable+draw) : <code>number</code>
    * [.start](#Arfxtable+start) : <code>number</code>
    * [.pageLength](#Arfxtable+pageLength) : <code>number</code>
    * [.searchValue](#Arfxtable+searchValue) : <code>string</code>
    * [.columns](#Arfxtable+columns) : <code>Array.&lt;Object&gt;</code>
    * [.loaderAsset](#Arfxtable+loaderAsset) ⇒ <code>string</code>
    * [.trData](#Arfxtable+trData) : <code>number</code> \| <code>boolean</code>
    * [.start](#Arfxtable+start)
    * [.start](#Arfxtable+start)
    * [.data()](#Arfxtable+data) ⇒ <code>object</code>
    * [.generateData()](#Arfxtable+generateData) ⇒ <code>URLSearchParams</code>
    * [.build()](#Arfxtable+build) ⇒ <code>void</code>
    * [.reload()](#Arfxtable+reload) ⇒ <code>void</code>
    * [.loader(active)](#Arfxtable+loader) : <code>function</code>
    * [.buildLoader()](#Arfxtable+buildLoader) ⇒ <code>void</code>
    * [.loaderDiv()](#Arfxtable+loaderDiv) ⇒ <code>void</code>
    * [.loaderDefault()](#Arfxtable+loaderDefault) ⇒ <code>string</code>
    * [.buildPagination()](#Arfxtable+buildPagination) ⇒ <code>void</code>
    * [.actionPagination()](#Arfxtable+actionPagination) ⇒ <code>void</code>
    * [.buildTopContainer()](#Arfxtable+buildTopContainer) ⇒ <code>void</code>
    * [.buildSearch()](#Arfxtable+buildSearch) ⇒ <code>void</code>
    * [.actionSearch()](#Arfxtable+actionSearch) ⇒ <code>void</code>
    * [.buildHighlight()](#Arfxtable+buildHighlight) ⇒ <code>void</code>
    * [.destroy()](#Arfxtable+destroy) ⇒ <code>void</code>
    * [.delay(fn, ms)](#Arfxtable+delay) ⇒ <code>void</code>
    * [.addElement(element, position)](#Arfxtable+addElement) ⇒ <code>void</code>

<a name="Arfxtable+target"></a>

### arfxtable.target : <code>string</code>
Target tabel to build arfxtable

**Kind**: instance property of [<code>Arfxtable</code>](#Arfxtable)  
<a name="Arfxtable+url"></a>

### arfxtable.url : <code>string</code>
URL that serve data JSON

**Kind**: instance property of [<code>Arfxtable</code>](#Arfxtable)  
<a name="Arfxtable+res"></a>

### arfxtable.res : <code>object</code>
Hold response data

**Kind**: instance property of [<code>Arfxtable</code>](#Arfxtable)  
<a name="Arfxtable+currentPage"></a>

### arfxtable.currentPage : <code>number</code> \| <code>string</code>
Current page of the table

**Kind**: instance property of [<code>Arfxtable</code>](#Arfxtable)  
<a name="Arfxtable+searchTimer"></a>

### arfxtable.searchTimer : <code>function</code>
Hold setTimeout in delay method

**Kind**: instance property of [<code>Arfxtable</code>](#Arfxtable)  
<a name="Arfxtable+totalElement"></a>

### arfxtable.totalElement : <code>number</code>
Count total custom element added to the table

**Kind**: instance property of [<code>Arfxtable</code>](#Arfxtable)  
<a name="Arfxtable+search"></a>

### arfxtable.search : <code>boolean</code>
Show or hide the search box.

**Kind**: instance property of [<code>Arfxtable</code>](#Arfxtable)  
<a name="Arfxtable+pagination"></a>

### arfxtable.pagination : <code>boolean</code>
Show or hide pagination

**Kind**: instance property of [<code>Arfxtable</code>](#Arfxtable)  
<a name="Arfxtable+highlight"></a>

### arfxtable.highlight : <code>boolean</code>
Enable or disable highlighted search

**Kind**: instance property of [<code>Arfxtable</code>](#Arfxtable)  
<a name="Arfxtable+highlightOptions"></a>

### arfxtable.highlightOptions : <code>Object</code>
Available options for highlight feature

**Kind**: instance property of [<code>Arfxtable</code>](#Arfxtable)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| color | <code>string</code> | The color of highlighted search text. |
| background | <code>string</code> | The background color of highlighted search. |

<a name="Arfxtable+searchDelay"></a>

### arfxtable.searchDelay : <code>number</code>
Time delay for search after keyup idle in milisecond.

**Kind**: instance property of [<code>Arfxtable</code>](#Arfxtable)  
<a name="Arfxtable+draw"></a>

### arfxtable.draw : <code>number</code>
Count how many times table redraw

**Kind**: instance property of [<code>Arfxtable</code>](#Arfxtable)  
<a name="Arfxtable+start"></a>

### arfxtable.start : <code>number</code>
Start number of data

**Kind**: instance property of [<code>Arfxtable</code>](#Arfxtable)  
<a name="Arfxtable+pageLength"></a>

### arfxtable.pageLength : <code>number</code>
Number data to show in one page of table

**Kind**: instance property of [<code>Arfxtable</code>](#Arfxtable)  
<a name="Arfxtable+searchValue"></a>

### arfxtable.searchValue : <code>string</code>
Word to search

**Kind**: instance property of [<code>Arfxtable</code>](#Arfxtable)  
<a name="Arfxtable+columns"></a>

### arfxtable.columns : <code>Array.&lt;Object&gt;</code>
Column customization

**Kind**: instance property of [<code>Arfxtable</code>](#Arfxtable)  
<a name="Arfxtable+loaderAsset"></a>

### arfxtable.loaderAsset ⇒ <code>string</code>
Default asset loader

**Kind**: instance property of [<code>Arfxtable</code>](#Arfxtable)  
<a name="Arfxtable+trData"></a>

### arfxtable.trData : <code>number</code> \| <code>boolean</code>
If not false get data attribute from given order number <td> then pass to parent <tr>

**Kind**: instance property of [<code>Arfxtable</code>](#Arfxtable)  
<a name="Arfxtable+start"></a>

### arfxtable.start
Get start value.

**Kind**: instance property of [<code>Arfxtable</code>](#Arfxtable)  
<a name="Arfxtable+start"></a>

### arfxtable.start
Set start value.

**Kind**: instance property of [<code>Arfxtable</code>](#Arfxtable)  
<a name="Arfxtable+data"></a>

### arfxtable.data() ⇒ <code>object</code>
Send data to the server

**Kind**: instance method of [<code>Arfxtable</code>](#Arfxtable)  
<a name="Arfxtable+generateData"></a>

### arfxtable.generateData() ⇒ <code>URLSearchParams</code>
Generate data before sending to server.

**Kind**: instance method of [<code>Arfxtable</code>](#Arfxtable)  
<a name="Arfxtable+build"></a>

### arfxtable.build() ⇒ <code>void</code>
Build table function.

**Kind**: instance method of [<code>Arfxtable</code>](#Arfxtable)  
<a name="Arfxtable+reload"></a>

### arfxtable.reload() ⇒ <code>void</code>
Rebuild the table.

**Kind**: instance method of [<code>Arfxtable</code>](#Arfxtable)  
<a name="Arfxtable+loader"></a>

### arfxtable.loader(active) : <code>function</code>
Show loader or hide.

**Kind**: instance method of [<code>Arfxtable</code>](#Arfxtable)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| active | <code>boolean</code> | <code>false</code> | Set to true to show the loader. |

<a name="Arfxtable+buildLoader"></a>

### arfxtable.buildLoader() ⇒ <code>void</code>
Build loader element

**Kind**: instance method of [<code>Arfxtable</code>](#Arfxtable)  
<a name="Arfxtable+loaderDiv"></a>

### arfxtable.loaderDiv() ⇒ <code>void</code>
Create loader wrapper element

**Kind**: instance method of [<code>Arfxtable</code>](#Arfxtable)  
<a name="Arfxtable+loaderDefault"></a>

### arfxtable.loaderDefault() ⇒ <code>string</code>
Generate default loader element.

**Kind**: instance method of [<code>Arfxtable</code>](#Arfxtable)  
<a name="Arfxtable+buildPagination"></a>

### arfxtable.buildPagination() ⇒ <code>void</code>
Build pagination element.

**Kind**: instance method of [<code>Arfxtable</code>](#Arfxtable)  
<a name="Arfxtable+actionPagination"></a>

### arfxtable.actionPagination() ⇒ <code>void</code>
Actions for pagination.

**Kind**: instance method of [<code>Arfxtable</code>](#Arfxtable)  
<a name="Arfxtable+buildTopContainer"></a>

### arfxtable.buildTopContainer() ⇒ <code>void</code>
Build container on top of the table.

**Kind**: instance method of [<code>Arfxtable</code>](#Arfxtable)  
<a name="Arfxtable+buildSearch"></a>

### arfxtable.buildSearch() ⇒ <code>void</code>
Build search box element.

**Kind**: instance method of [<code>Arfxtable</code>](#Arfxtable)  
<a name="Arfxtable+actionSearch"></a>

### arfxtable.actionSearch() ⇒ <code>void</code>
Actions for search.

**Kind**: instance method of [<code>Arfxtable</code>](#Arfxtable)  
<a name="Arfxtable+buildHighlight"></a>

### arfxtable.buildHighlight() ⇒ <code>void</code>
Build highlight search

**Kind**: instance method of [<code>Arfxtable</code>](#Arfxtable)  
<a name="Arfxtable+destroy"></a>

### arfxtable.destroy() ⇒ <code>void</code>
Destroy the table

**Kind**: instance method of [<code>Arfxtable</code>](#Arfxtable)  
<a name="Arfxtable+delay"></a>

### arfxtable.delay(fn, ms) ⇒ <code>void</code>
Function to delay an action (typing searh word).

**Kind**: instance method of [<code>Arfxtable</code>](#Arfxtable)  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>callback</code> | Function callback to run after idle time reached. |
| ms | <code>number</code> | Number time delay in milisecond. |

<a name="Arfxtable+addElement"></a>

### arfxtable.addElement(element, position) ⇒ <code>void</code>
Adding element to table.

**Kind**: instance method of [<code>Arfxtable</code>](#Arfxtable)  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>string</code> | String of element tag. |
| position | <code>string</code> | Place element at top or bottom. |

<a name="arfxtable"></a>

## arfxtable(param) ⇒ <code>void</code>
Initialize Arfxtable

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| param | <code>Object</code> | Options of Arfxtable. |

<a name="columns"></a>

## columns : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| target | <code>number</code> | Index number of column target left to right. |
| className | <code>string</code> | Class name, multiple class divide by space. |

